/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.astonicservice.entity;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author aston
 */
@Entity
@Table(name = "logic", catalog = "repo", schema = "")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Logic.findAll", query = "SELECT l FROM Logic l"),
    @NamedQuery(name = "Logic.findById", query = "SELECT l FROM Logic l WHERE l.id = :id"),
    @NamedQuery(name = "Logic.findByDescription", query = "SELECT l FROM Logic l WHERE l.description = :description"),
    @NamedQuery(name = "Logic.findByType", query = "SELECT l FROM Logic l WHERE l.type = :type"),
    @NamedQuery(name = "Logic.findByDocumentationUrl", query = "SELECT l FROM Logic l WHERE l.documentationUrl = :documentationUrl")})
public class Logic implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Size(max = 1000)
    @Column(name = "description")
    private String description;
    @Size(max = 45)
    @Column(name = "type")
    private String type;
    @Size(max = 45)
    @Column(name = "documentation_url")
    private String documentationUrl;
    @JoinColumn(name = "operation_id", referencedColumnName = "id")
    @ManyToOne(fetch = FetchType.EAGER)
    private Operation operationId;

    public Logic() {
    }

    public Logic(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDocumentationUrl() {
        return documentationUrl;
    }

    public void setDocumentationUrl(String documentationUrl) {
        this.documentationUrl = documentationUrl;
    }

    public Operation getOperationId() {
        return operationId;
    }

    public void setOperationId(Operation operationId) {
        this.operationId = operationId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Logic)) {
            return false;
        }
        Logic other = (Logic) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.astonicservice.entity.Logic[ id=" + id + " ]";
    }
    
}
