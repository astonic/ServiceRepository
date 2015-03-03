/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.za.mtn.ws;

import java.util.ArrayList;

/**
 *
 * @author aston
 */
public class WSDL {
    
    
    private ArrayList<OperationN> operations;
    private String name;
    private String decription;
    private String url;
    
    
    
    
    public WSDL() {
        operations = new ArrayList<OperationN>();
    }

    /**
     * @return the operations
     */
    public ArrayList<OperationN> getOperations() {
        return operations;
    }

    /**
     * @param operations the operations to set
     */
    public void setOperations(ArrayList<OperationN> operations) {
        this.operations = operations;
    }
    
    public void addOperation(OperationN o){
        this.operations.add(o);
    }
    
    /**
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return the decription
     */
    public String getDecription() {
        return decription;
    }

    /**
     * @param decription the decription to set
     */
    public void setDecription(String decription) {
        this.decription = decription;
    }

    /**
     * @return the url
     */
    public String getUrl() {
        return url;
    }

    /**
     * @param url the url to set
     */
    public void setUrl(String url) {
        this.url = url;
    }
    
 
    
    
}
