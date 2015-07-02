/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.astonicservice.api;

import com.rest.astonicservice.jpa.EntityManagerUtil;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

/**
 *
 * @author aston
 */
public abstract class AbstractFacade<T> {
    private Class<T> entityClass;
       @PersistenceContext(unitName = "test")
      private EntityManager em = EntityManagerUtil.getEntityManager();
       
    public AbstractFacade(Class<T> entityClass) {
        this.entityClass = entityClass;
        
    }  

    protected abstract EntityManager getEntityManager();
   
    public void create(T entity) {
        getEntityManager().getTransaction().begin();
        getEntityManager().persist(entity);
        getEntityManager().getTransaction().commit();
        
       
    }
      
   public Integer save(T entity){
       
         Session session = (Session)em.getDelegate();
         Integer id = null; 
         Transaction tx = null;
         try {
            tx = session.beginTransaction();
            id = (Integer) session.save(entity);
            tx.commit();
         }
         catch (Exception e) {
            if (tx!=null) tx.rollback();
            e.printStackTrace(); 
         }finally {
            session.close();
         }
       return id; 
       
   }
    
    

    public void edit(T entity) {
        getEntityManager().getTransaction().begin();
        getEntityManager().merge(entity);
        getEntityManager().getTransaction().commit();
    }

    public void remove(T entity) {
        getEntityManager().getTransaction().begin();
        getEntityManager().remove(getEntityManager().merge(entity));
        getEntityManager().getTransaction().commit();
    }

    public T find(Object id) {
        return getEntityManager().find(entityClass, id);
    }

    
    
    public List<T> findbyField(Object tableName,Object fieldName,Object fieldValue ){
        Query query = getEntityManager().createQuery( "Select e " + "from "+ tableName +" e " + " where " + fieldName +" like '%"+ fieldValue +"%'" );
        return query.getResultList();
    }
    
    public List<T> anyQuery(String sql ){
        Query query = getEntityManager().createQuery( sql );
        return query.getResultList();
    }
    
    
    public List<T> findAll() {
        javax.persistence.criteria.CriteriaQuery cq = getEntityManager().getCriteriaBuilder().createQuery();
        cq.select(cq.from(entityClass));
        return getEntityManager().createQuery(cq).getResultList();
    }

    public List<T> findRange(int[] range) {
        javax.persistence.criteria.CriteriaQuery cq = getEntityManager().getCriteriaBuilder().createQuery();
        cq.select(cq.from(entityClass));
        javax.persistence.Query q = getEntityManager().createQuery(cq);
        q.setMaxResults(range[1] - range[0] + 1);
        q.setFirstResult(range[0]);
        return q.getResultList();
    }

    public int count() {
        javax.persistence.criteria.CriteriaQuery cq = getEntityManager().getCriteriaBuilder().createQuery();
        javax.persistence.criteria.Root<T> rt = cq.from(entityClass);
        cq.select(getEntityManager().getCriteriaBuilder().count(rt));
        javax.persistence.Query q = getEntityManager().createQuery(cq);
        return ((Long) q.getSingleResult()).intValue();
    }
    
}
