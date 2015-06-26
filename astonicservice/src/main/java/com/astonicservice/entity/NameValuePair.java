/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.astonicservice.entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author aston
 */
@Entity
@XmlRootElement
public class NameValuePair implements Serializable {
    
    @Id
    @Column(name = "name")
    private String name;
    @Column(name = "total")
    private Integer total; 

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
     * @return the count
     */
    public Integer getTotal() {
        return total;
    }

    /**
     * @param count the count to set
     */
    public void setTotal(Integer count) {
        this.total = count;
    }
    
}
