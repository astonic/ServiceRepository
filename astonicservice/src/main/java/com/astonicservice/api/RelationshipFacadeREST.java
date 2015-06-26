/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.astonicservice.api;

import com.astonicservice.entity.Relationship;
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

@Path("/relationship")
public class RelationshipFacadeREST extends AbstractFacade<Relationship> {
    @PersistenceContext(unitName = "test")
    private EntityManager em = EntityManagerUtil.getEntityManager();

    public RelationshipFacadeREST() {
        super(Relationship.class);
    }

    @POST
    @Override
    @Consumes({"application/xml", "application/json"})
    public void create(Relationship entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({"application/xml", "application/json"})
    public void edit(@PathParam("id") Integer id, Relationship entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        Relationship r = super.find(id);
        r.getOperationId().getRelationshipCollection().remove(r);
        
        super.remove(r);
    }

    @GET
    @Path("{id}")
    @Produces({"application/xml", "application/json"})
    public Relationship find(@PathParam("id") Integer id) {
        return super.find(id);
    }

    @GET
    @Override
    @Produces({"application/xml", "application/json"})
    public List<Relationship> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({"application/xml", "application/json"})
    public List<Relationship> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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
