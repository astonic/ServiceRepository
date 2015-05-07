package com.rest.astonicservice;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.DefaultServlet;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
 
public class App {
    public static void main(String[] args) throws Exception {
        ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
        context.setContextPath("/");
 
        Server jettyServer = new Server(8080);
        jettyServer.setHandler(context);
 
        ServletHolder jerseyServlet = context.addServlet(
             org.glassfish.jersey.servlet.ServletContainer.class, "/api/rest/*");
        jerseyServlet.setInitOrder(0);
        
        
 
        // Tells the Jersey Servlet which REST service/class to load.
        //jerseyServlet.setInitParameter( "jersey.config.server.provider.classnames", EntryPoint.class.getCanonicalName());
 
       //jerseyServlet.setInitParameter("com.sun.jersey.config.property.resourceConfigClass", "com.sun.jersey.api.core.PackagesResourceConfig");
        jerseyServlet.setInitParameter("jersey.config.server.provider.packages", "com.astonicservice.api");//Set the package where the services reside
        //jerseyServlet.setInitParameter("com.sun.jersey.api.json.POJOMappingFeature", "true");
        
        
        ServletHolder staticServlet = context.addServlet(DefaultServlet.class,"/*");
        staticServlet.setInitParameter("resourceBase","src/main/webapp");
        staticServlet.setInitParameter("pathInfoOnly","true");
        
        
        try {
            jettyServer.start();
            jettyServer.join();
        } finally {
            jettyServer.destroy();
        }
    }
}
