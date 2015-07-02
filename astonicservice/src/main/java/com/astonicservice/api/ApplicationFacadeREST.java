/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.astonicservice.api;

import com.astonicservice.entity.Application;
import com.astonicservice.entity.Operation;
import com.rest.astonicservice.jpa.EntityManagerUtil;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Persistence;
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

@Path("/application")
public class ApplicationFacadeREST extends AbstractFacade<Application> {
    private EntityManager em;

    public ApplicationFacadeREST() {
        super(Application.class);
        this.em = EntityManagerUtil.getEntityManager();
    }

    @POST
    @Override
    @Consumes({"application/xml", "application/json"})
    public void create(Application entity) {
        System.out.println(entity);
        System.out.println(em.isOpen());
        
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({"application/xml", "application/json"})
    public void edit(@PathParam("id") Integer id, Application entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        super.remove(super.find(id));
    }

    @GET
    @Path("{id}")
    @Produces({"application/xml", "application/json"})
    public Application find(@PathParam("id") Integer id) {
        return super.find(id);
    }

    @GET
    @Override
    @Produces({"application/xml", "application/json"})
    public List<Application> findAll() {
        return super.findAll();
    }

    
    @GET
    @Path("/name/{name}")
    @Produces({"application/xml", "application/json"})
    public List<Application> findRelationship(@PathParam("name") String name) {
       return super.findbyField("Application","name",name);
    }
    @GET
    @Path("{from}/{to}")
    @Produces({"application/xml", "application/json"})
    public List<Application> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return super.findRange(new int[]{from, to});
    }

    @GET
    @Path("count")
    @Produces("text/plain")
    public String countREST() {
        return String.valueOf(super.count());
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }
    
}
