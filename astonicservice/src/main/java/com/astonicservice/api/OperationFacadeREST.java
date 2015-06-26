/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.astonicservice.api;

import com.astonicservice.entity.History;
import com.astonicservice.entity.Logic;
import com.astonicservice.entity.Operation;
import com.astonicservice.entity.Relationship;
import com.astonicservice.entity.Service;
import com.rest.astonicservice.jpa.EntityManagerUtil;
import java.util.Collection;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
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

@Path("/operation")
public class OperationFacadeREST extends AbstractFacade<Operation> {
    @PersistenceContext(unitName = "test")
  private EntityManager em = EntityManagerUtil.getEntityManager();

    public OperationFacadeREST() {
        super(Operation.class);
    }

    @POST
    @Override
    @Consumes({"application/xml", "application/json"})
    public void create(Operation entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({"application/xml", "application/json"})
    public void edit(@PathParam("id") Integer id, Operation entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        
        Operation o = super.find(id);
        super.find(id).getServiceId().getOperationCollection().remove(o);
        //super.remove(o.getServiceId());
        //o.setServiceId(null);
        //super.edit(o);
        super.remove(o);
    }

    @GET
    @Path("{id}")
    @Produces({"application/xml", "application/json"})
    public Operation find(@PathParam("id") Integer id) {
        return super.find(id);
    }
    
    
    
    @GET
    @Path("{id}/relationship")
    @Produces({"application/xml", "application/json"})
    public Collection<Relationship> findRelationship(@PathParam("id") Integer id) {
        return super.find(id).getRelationshipCollection();
    }
    
    @GET
    @Path("{id}/logic")
    @Produces({"application/xml", "application/json"})
    public Collection<Logic> findLogic(@PathParam("id") Integer id) {
        return super.find(id).getLogicCollection();
    }
    
    
    
    @GET
    @Path("/name/{name}")
    @Produces({"application/xml", "application/json"})
    public List<Operation> findRelationship(@PathParam("name") String name) {
       return super.findbyField("Operation","name",name);
    }
    
   
    
   

    @GET
    @Override
    @Produces({"application/xml", "application/json"})
    public List<Operation> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({"application/xml", "application/json"})
    public List<Operation> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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
