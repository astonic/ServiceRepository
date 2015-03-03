/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.za.mtn.ws;

import com.za.mtn.utility.ConnetionResource;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import com.predic8.wsdl.*;


import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.apache.commons.codec.binary.Base64;

/**
 *
 * @author aston
 */
@Path("data")
public class GenericWS {

    ConnetionResource cr;

    public GenericWS() {
        cr = new ConnetionResource();
        cr.initConnection();
    }

    /*    
     @GET
     @Path("/query/all")
     @PathParam("name")
     public String userName(String name) {

     String sql = "select * from " + name;
     cr.initConnection();
     //cr.getJSONFromSQL(sql);
     return cr.getJSONFromSQL(sql).toString();

     }
     */
    @POST
    @Path("/queryFilter")
    @Produces(MediaType.APPLICATION_JSON)
    public String queryFilterData(String data) {
        String sql = JSONtoSQL("SELECT", data);
        System.out.println(sql);

        return cr.getJSONFromSQL(sql).toString();
    }

    @POST
    @Path("/anyQuery")
    @Produces(MediaType.APPLICATION_JSON)
    public String anyQuery(String data) {
        JSONObject j;
        String sql = null;
        try {
            j = new JSONObject(data);
            sql = (String) j.get("q");
            System.out.println(sql);

        } catch (JSONException ex) {
            Logger.getLogger(GenericWS.class.getName()).log(Level.SEVERE, null, ex);
        }

        return cr.getJSONFromSQL(sql).toString();
    }

    @POST
    @Path("wsdlparser")
    public Response wsdlParser(String data) throws MalformedURLException, IOException {

        String webPage = data;
        String name = "wladmin";
        String password = "Coca65Cola";

        String authString = name + ":" + password;
        System.out.println("auth string: " + authString);
        byte[] authEncBytes = Base64.encodeBase64(authString.getBytes());
        String authStringEnc = new String(authEncBytes);
        System.out.println("Base64 encoded auth string: " + authStringEnc);

        URL url = new URL(webPage);
        URLConnection urlConnection = url.openConnection();
        //urlConnection.setRequestProperty("Authorization", "Basic " + authStringEnc);
        InputStream is = urlConnection.getInputStream();

        WSDLParser parser = new WSDLParser();
        WSDL wsdl = new WSDL();
        System.out.println(data);

        Definitions defs = parser.parse(is);

        System.out.println("Name: \t\t\t" + defs.getName());
        wsdl.setName(defs.getName());

        for (PortType pt : defs.getPortTypes()) {

            for (Operation op : pt.getOperations()) {

                System.out.println("    Operation Name: " + op.getName());
                OperationN operation = new OperationN();
                operation.setName(op.getName());
                wsdl.addOperation(operation);

            }
            System.out.println("");
        }

        return Response.status(200).entity(wsdl).build();

    }

    @POST
    @Path("insert")
    public Response updateData(String data) {
        return modifyData("INSERT", data);
    }

    @POST
    @Path("/update")
    public Response insertDBData(String data) {

        return modifyData("UPDATE", data);
    }

    @POST
    @Path("/delete")
    public Response deleteDBData(String data) {

        return modifyData("DELETE", data);
    }

    @POST
    @Path("/saveOperations")
    public Response saveOperations(String data) {
        System.out.println("Passed Data : " + data);
        try {
            JSONObject j = new JSONObject(data);
            String serviceId = j.getString("service_id");
            JSONArray ja = j.getJSONArray("operations");

            for (int i = 0; i < ja.length(); i++) {
                JSONObject arr = (JSONObject) ja.get(i);
                //arr.put("service_id", serviceId);
                JSONObject jobj = new JSONObject().put("operation", arr);
                System.out.println("New created Object : " + jobj);
                String sql = JSONtoSQL("INSERT", jobj.toString());
                System.out.println(sql);
                int modifiedOPerationRec = cr.modifyData(sql);
                String sql2 = "INSERT INTO SERVICE_OPERATION (service_id,operation_id) VALUES (" + serviceId + "," + modifiedOPerationRec + ")";
                int modifiedRec = cr.modifyData(sql2);
            }

        } catch (Exception ex) {
            Logger.getLogger(ServiceWS.class.getName()).log(Level.SEVERE, null, ex);

        }

        return Response.status(200).entity("").build();
    }

    public String JSONtoSQL(String SQLCommand, String jsonStr) {

        JSONObject j = null;
        ArrayList cols = new ArrayList();
        ArrayList values = new ArrayList();
        String firstElement = "";
        String id = null;
        try {
            j = new JSONObject(jsonStr);
            Iterator it = j.keys();
            while (it.hasNext()) {
                firstElement = (String) it.next();
                System.out.println("JSON Keys: " + firstElement);
                String elements = j.getJSONObject(firstElement).toString();
                JSONArray arr = new JSONArray("[".concat(elements.concat("]")));

                System.out.println("JSON objects: " + arr);
                for (int i = 0; i < arr.length(); i++) {
                    JSONObject obj = arr.getJSONObject(i);

                    Iterator keys = obj.keys();
                    while (keys.hasNext()) {
                        String key = (String) keys.next();
                        String value;
                        if (obj.get(key) instanceof Integer) {
                            value = String.valueOf(obj.get(key));
                        } else {
                            value = (String) obj.get(key);
                        }

                        //check if the id element exist if it does we need to update
                        //if we do an update we dont want the id in the update values 
                        if (key.equals("id")) {
                            id = value;
                        }
                        cols.add(key);
                        values.add(value);

                        System.out.println("Key: " + key + " value: " + value);
                    }
                }
            }

        } catch (Exception ex) {
            Logger.getLogger(ServiceWS.class.getName()).log(Level.SEVERE, null, ex);

        }
        return makeSQLString(SQLCommand, id, firstElement, cols, values);
    }

    /**
     *
     * @param SQLCommand
     * @param id
     * @param tableName
     * @param colNames
     * @param values
     * @return
     */
    private String getParam(String key, String data){
        JSONObject  j;
        String value = null; 
        try {
            if (data != null){
            j = new JSONObject(data);
            value = Integer.toString(j.getInt(key)) ;
            }
            
        } catch (JSONException ex) {
            Logger.getLogger(GenericWS.class.getName()).log(Level.SEVERE, null, ex);
        }
        return value;
    }
    
    @POST
    @Path("/serviceDelete")
    public Response serviceDelete(String data){
        
          String id = getParam("id", data);
          removeService(id);
        
        return Response.status(200).entity("").build();
    }
    
    @POST
    @Path("/operationDelete")
    public Response operationDelete(String data){
        String id = getParam("id", data);
        removeOperation(id);
        return Response.status(200).entity("").build();
        
    }
    
    
    
    public void removeOperation(String id){
        
        ArrayList arr = new ArrayList();
        
        arr.add("DELETE from message_structure  where operation_id=" + id );
        arr.add("DELETE from logic  where operation_id=" + id );
        arr.add("DELETE from relationship  where operation_id=" + id );
        arr.add("DELETE from service_operation  where operation_id=" + id );
        arr.add("DELETE from operation  where id=" + id );
        
        cr.modifyDataTransactionMode(arr);
        
    }
    
    public void removeService(String serviceId){
        
       Statement stmt = null;
       JSONArray ja = null;
       Connection conn = cr.getConnection();
        try {
             
            stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("select * from service_operation where service_id=" + serviceId);
           
            while (rs.next()) {
                String operationId = rs.getString("operation_id");
                removeOperation(operationId);
                
            }
            
            ArrayList arr = new ArrayList();
        
        arr.add("DELETE from history  where service_id=" + serviceId );
        arr.add("DELETE from service where id=" + serviceId );
        
        cr.modifyDataTransactionMode(arr);
        
            
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
    
    
    
    
    
    public String makeSQLString(String SQLCommand, String id, String tableName, ArrayList colNames, ArrayList values) {

        //INSERT INTO table_name (column1,column2,column3,...)
        //VALUES (value1,value2,value3,...);
        String columnStr = "";
        String valueStr = "";

        for (int i = 0; i < colNames.size(); i++) {
            String col = (String) colNames.get(i);
            columnStr = columnStr.concat(col);

            String val = (String) values.get(i);
            valueStr = valueStr.concat("\"" + val + "\"");

            if (i < (colNames.size() - 1)) {
                valueStr = valueStr.concat(",");
                columnStr = columnStr.concat(",");
            }

        }
        /**
         * ************************************************
         */
        String setStr = "";
        for (int j = 0; j < colNames.size(); j++) {
            String col = (String) colNames.get(j);
            System.out.println("Adding to update: " + col);
            setStr = setStr.concat(col);
            setStr = setStr.concat("=");
            setStr = setStr.concat("\"" + values.get(j).toString() + "\"");
            //more?
            if (j < (colNames.size() - 1)) {
                setStr = setStr.concat(",");
            }

        }

        if (SQLCommand.equals("INSERT")) {

            return "INSERT INTO " + tableName + " (" + columnStr + ") VALUES (" + valueStr + ");";

        } else if (SQLCommand.equals("UPDATE")) {

            return "UPDATE " + tableName + " SET " + setStr + " WHERE id=\"" + id + "\";";

        } else if (SQLCommand.equals("DELETE")) {

            return "DELETE FROM " + tableName + " WHERE " + setStr;

        } else if (SQLCommand.equals("SELECT")) {

            return "SELECT * FROM " + tableName + " WHERE " + setStr;

        } else {
            return "select 1 fro dual";
        }

    }

    public Response modifyData(String command, String data) {
        int modifiedRec;
        try {
            String sql = JSONtoSQL(command, data);
            System.out.println(sql);
            modifiedRec = cr.modifyData(sql);

        } catch (Exception ex) {
            Logger.getLogger(ServiceWS.class.getName()).log(Level.SEVERE, null, ex);
            return Response.status(400).build();
        }

        return Response.status(200).entity(modifiedRec).build();
    }

}
