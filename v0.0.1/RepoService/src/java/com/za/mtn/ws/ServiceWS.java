/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.za.mtn.ws;

import com.za.mtn.utility.ConnetionResource;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

/**
 *
 * @author aston
 */
@Path("servicews")
public class ServiceWS {
    
    
ConnetionResource cr = new ConnetionResource();
 
@GET
@Path("/name/{i}")
//@Produces(MediaType.TEXT_XML)
    public String userName(@PathParam("i") String i) {

        

        String sql = "select * from service where id =" + i;
        cr.initConnection();
        //cr.getJSONFromSQL(sql);
        return cr.getJSONFromSQL(sql).toString();

    }

   
       

    

}
