/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.astonicservice.api;

import com.astonicservice.entity.Logic;
import com.astonicservice.entity.NameValuePair;
import com.rest.astonicservice.jpa.EntityManagerUtil;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

/**
 *
 * @author aston
 */
@Path("/namedValuePair")
public class NamedValuePairFacadeREST  extends AbstractFacade<NameValuePair>{
@PersistenceContext(unitName = "test")
    private EntityManager em = EntityManagerUtil.getEntityManager();

    public NamedValuePairFacadeREST() {
        super(NameValuePair.class);
    }
    
    @Override
    protected EntityManager getEntityManager() {
       return em;
    }
    
    
   @GET
    @Path("servicesPerProjectFunction")
    @Produces({"application/xml", "application/json"})
    public List<NameValuePair> servicesPerProjectFunction() {
        String sql = "SELECT s.name,count(*) as total FROM Service s, Operation so where s.id = so.serviceId"
                        +" group by s.id"
                        +" order by 2 desc limit 10;";
        return super.anyQuery(sql);
    }
    
    
    @GET
    @Path("topInterfaceByFunctionCount")
    @Produces({"application/xml", "application/json"})
    public List<NameValuePair> topInterfaceByFunctionCount() {
        String sql = "SELECT s.name,count(*) as total FROM Service s, Operation so where s.id = so.serviceId"
                        +" group by s.id"
                        +" order by 2 desc limit 10;";
        return super.anyQuery(sql);
    }
     
    @GET
    @Path("top10ReusedFunction")
    @Produces({"application/xml", "application/json"})
    public List<NameValuePair> top10ReusedFunction() {
        String sql = "Select o.name as name,count(*) as total from Operation o, Relationship r where o.id = r.operationId" +
                        " and relationship_type = 'Consumed by' " +
                        " group by o.id " +
                        " order by 2 desc limit 10;";
        return super.anyQuery(sql);
    }
    
    
    
            
    @GET
    @Path("top10ProvidersFunction")
    @Produces({"application/xml", "application/json"})
    public List<NameValuePair> top10ProvidersFunction() {
        String sql = "Select r.componentName as name,count(*) as total from Operation o, Relationship r where o.id = r.operationId"
                        + " and relationship_type = 'Provided by' "
                        + " group by r.componentName"
                        + " order by 2 desc limit 10;";
        return super.anyQuery(sql);
    }
    
    
    
    
}
