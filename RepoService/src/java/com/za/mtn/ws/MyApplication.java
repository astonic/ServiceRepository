package com.za.mtn.ws;


import javax.json.stream.JsonGenerator;
import org.glassfish.jersey.filter.LoggingFilter;
import org.glassfish.jersey.server.ResourceConfig;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author aston
 */
public class MyApplication extends ResourceConfig {

    public MyApplication() {
        packages("org.glassfish.jersey.examples.jsonp.resource");
        register(LoggingFilter.class);
        property(JsonGenerator.PRETTY_PRINTING, true);
    }
}