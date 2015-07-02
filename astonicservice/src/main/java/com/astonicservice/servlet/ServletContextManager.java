/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.astonicservice.servlet;

import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import org.apache.derby.drda.NetworkServerControl;

/**
 *
 * @author aston
 */
public class ServletContextManager implements ServletContextListener {

   ServletContext context;
   NetworkServerControl server;
	public void contextInitialized(ServletContextEvent contextEvent) {
		System.out.println("Context Created");
		context = contextEvent.getServletContext();
		// set variable to servlet context
		context.setAttribute("TEST", "TEST_VALUE");
                
       try {
            server = new NetworkServerControl();
            server.start (null);
       } catch (Exception ex) {
           Logger.getLogger(ServletContextManager.class.getName()).log(Level.SEVERE, null, ex);
       }
               
                
	}
	public void contextDestroyed(ServletContextEvent contextEvent) {
		context = contextEvent.getServletContext();
		System.out.println("Context Destroyed");
                
                
                 try {
          
            server.shutdown();
                        } catch (Exception ex) {
                            Logger.getLogger(ServletContextManager.class.getName()).log(Level.SEVERE, null, ex);
                        }
                 
	}
    
    
    
    
}
