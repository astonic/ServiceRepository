/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.astonicservice.api;

import com.astonicservice.entity.History;
import com.astonicservice.entity.Operation;
import com.rest.astonicservice.jpa.EntityManagerUtil;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

/**
 *
 * @author aston
 */

@Path("/general")
public class GeneralFacadeREST extends AbstractFacade<History> {
    @PersistenceContext(unitName = "test")
    private EntityManager em = EntityManagerUtil.getEntityManager();

    public GeneralFacadeREST() {
        super(History.class);
    }

    @GET
    @Path("/name/{name}")
    @Produces({"application/xml", "application/json"})
    public List<History> findRelationship(@PathParam("name") String name) {
       return super.findbyField("Operation","name",name);
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }
    
}
