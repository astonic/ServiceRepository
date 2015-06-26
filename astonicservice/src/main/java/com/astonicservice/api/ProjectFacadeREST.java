/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.astonicservice.api;

import com.astonicservice.entity.Operation;
import com.astonicservice.entity.Project;
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

@Path("/project")
public class ProjectFacadeREST extends AbstractFacade<Project> {
    @PersistenceContext(unitName = "test")
   private EntityManager em = EntityManagerUtil.getEntityManager();

    public ProjectFacadeREST() {
        super(Project.class);
    }

    @POST
    @Override
    @Consumes({"application/xml", "application/json"})
    public void create(Project entity) {
        
        super.create(entity);
        
    }

    @PUT
    @Path("{id}")
    @Consumes({"application/xml", "application/json"})
    public void edit(@PathParam("id") Integer id, Project entity) {
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
    public Project find(@PathParam("id") Integer id) {
        return super.find(id);
    }

    @GET
    @Override
    @Produces({"application/xml", "application/json"})
    public List<Project> findAll() {
        return super.findAll();
    }

    
    @GET
    @Path("/name/{name}")
    @Produces({"application/xml", "application/json"})
    public List<Project> findRelationship(@PathParam("name") String name) {
       return super.findbyField("Project","name",name);
    }
    
    
    @GET
    @Path("{from}/{to}")
    @Produces({"application/xml", "application/json"})
    public List<Project> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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
