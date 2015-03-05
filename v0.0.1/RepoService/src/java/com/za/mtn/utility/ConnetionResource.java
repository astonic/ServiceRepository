/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.za.mtn.utility;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.Singleton;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 *
 * @author aston
 */
@Singleton
public class ConnetionResource {

    private static InitialContext ctx;
    private static DataSource ds;
    private static Connection conn;

      // JDBC driver name and database URL
   static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";  
   static final String DB_URL = "jdbc:mysql://localhost/repo";

   //  Database credentials
   static final String USER = "root";
   static final String PASS = "root";
    
    public static void initConnection() {
        try {
            ctx = new InitialContext();
            //ds = (DataSource) ctx.lookup("jdbc/repo");

        } catch (NamingException ex) {
            Logger.getLogger(ConnetionResource.class.getName()).log(Level.SEVERE, null, ex);
        }

        try {
           // conn = ds.getConnection();
            conn = DriverManager.getConnection(DB_URL,USER,PASS);
            conn.setAutoCommit(true);
        } catch (SQLException ex) {
            Logger.getLogger(ConnetionResource.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    
    
    public static JSONArray getJSONFromSQL(String sql) {

        Statement stmt = null;
        JSONArray ja = null;
        try {
            getConnection(); 
            stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(sql);
           
            ja = convertToJSON(rs);
            
        } catch (SQLException ex) {
            Logger.getLogger(ConnetionResource.class.getName()).log(Level.SEVERE, null, ex);
        } catch (Exception ex) {
            Logger.getLogger(ConnetionResource.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            if (stmt != null) {
                try {
                    stmt.close();
                    //conn.close();
                } catch (SQLException ex) {
                    Logger.getLogger(ConnetionResource.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
        }

        return ja;

    }
    
    
    public static Connection getConnection(){
        
        try {
            if (conn == null || conn.isClosed()){
              //  conn = ds.getConnection();
                conn = DriverManager.getConnection(DB_URL,USER,PASS);
            }
            
        } catch (SQLException ex) {
            Logger.getLogger(ConnetionResource.class.getName()).log(Level.SEVERE, null, ex);
        }
        return conn;
    }
    
       public static int modifyData(String sql) {

        PreparedStatement stmt = null;
        int modified = 0 ;
        int id = 0;
        try {
             getConnection();             
             stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            modified = stmt.executeUpdate();
           
            
            
                ResultSet generatedKeys = stmt.getGeneratedKeys();
            if (generatedKeys.next()) {
                id = (int) generatedKeys.getLong(1);
            }
            else {
                Logger.getLogger(ConnetionResource.class.getName()).log(Level.INFO,"Creating row, no ID obtained." );
                
            }

            
        
        } catch (SQLException ex) {
            Logger.getLogger(ConnetionResource.class.getName()).log(Level.SEVERE, null, ex);
        } catch (Exception ex) {
            Logger.getLogger(ConnetionResource.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            if (stmt != null) {
                try {
                    stmt.close();
                    conn.close();
                } catch (SQLException ex) {
                    Logger.getLogger(ConnetionResource.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
        } 

        return id;

    }
    
    public static JSONArray convertToJSON(ResultSet resultSet)
            throws Exception {
        JSONArray jsonArray = new JSONArray();
       
        int columnCount = resultSet.getMetaData().getColumnCount() +1;
        System.out.println("columns count: " + columnCount);
        while (resultSet.next()) {
            
            
            JSONObject obj = new JSONObject();
            for (int i = 1; i < columnCount; i++) { 
                
                obj.put(resultSet.getMetaData().getColumnLabel(i)
                        .toLowerCase(), resultSet.getObject(i));
                
            }
            jsonArray.put(obj);
             
        }
        return jsonArray;
    }
    
    
     public static void modifyDataTransactionMode(ArrayList sqCommandlList){
          PreparedStatement stmt = null;
          getConnection();
        try{
        for (int i = 0; i < sqCommandlList.size(); i++) {
            String sql = (String) sqCommandlList.get(i);
            stmt = null;
            System.out.println("Deleting:::"+ sql);
            conn.setAutoCommit(false);
            stmt = conn.prepareStatement(sql);
            stmt.executeUpdate();
        }
        conn.commit();
        conn.setAutoCommit(true);
        
        } catch (SQLException ex) {
            Logger.getLogger(ConnetionResource.class.getName()).log(Level.SEVERE, null, ex);
        } catch (Exception ex) {
            Logger.getLogger(ConnetionResource.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            if (stmt != null) {
                try {
                    stmt.close();
                    //conn.close();
                } catch (SQLException ex) {
                    Logger.getLogger(ConnetionResource.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
        }
        
    }

}
