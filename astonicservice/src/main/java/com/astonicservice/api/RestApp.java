/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.astonicservice.api;

import javax.ws.rs.ApplicationPath;

import org.glassfish.jersey.server.ResourceConfig;

/**
 *
 * @author aston
 */

@ApplicationPath("/")
public class RestApp extends ResourceConfig {
    public RestApp() {
        packages("com.astonicservice.api");
       
    }
}