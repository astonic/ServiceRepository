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
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author aston
 */
@Entity
@Table(name = "relationship", catalog = "repo", schema = "")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Relationship.findAll", query = "SELECT r FROM Relationship r"),
    @NamedQuery(name = "Relationship.findByRelationshipId", query = "SELECT r FROM Relationship r WHERE r.relationshipId = :relationshipId"),
    @NamedQuery(name = "Relationship.findByRelationshipType", query = "SELECT r FROM Relationship r WHERE r.relationshipType = :relationshipType"),
    @NamedQuery(name = "Relationship.findByComponentType", query = "SELECT r FROM Relationship r WHERE r.componentType = :componentType"),
    @NamedQuery(name = "Relationship.findByDescription", query = "SELECT r FROM Relationship r WHERE r.description = :description"),
    @NamedQuery(name = "Relationship.findById", query = "SELECT r FROM Relationship r WHERE r.id = :id"),
    @NamedQuery(name = "Relationship.findByComponentName", query = "SELECT r FROM Relationship r WHERE r.componentName = :componentName")})
public class Relationship implements Serializable {
    private static final long serialVersionUID = 1L;
    @Basic(optional = false)
    @NotNull
    @Column(name = "relationship_id")
    private int relationshipId;
    @Size(max = 45)
    @Column(name = "relationship_type")
    private String relationshipType;
    @Size(max = 100)
    @Column(name = "component_type")
    private String componentType;
    @Size(max = 1000)
    @Column(name = "description")
    private String description;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Size(max = 100)
    @Column(name = "component_name")
    private String componentName;
    @JoinColumn(name = "operation_id", referencedColumnName = "id")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private Operation operationId;

    public Relationship() {
    }

    public Relationship(Integer id) {
        this.id = id;
    }

    public Relationship(Integer id, int relationshipId) {
        this.id = id;
        this.relationshipId = relationshipId;
    }

    public int getRelationshipId() {
        return relationshipId;
    }

    public void setRelationshipId(int relationshipId) {
        this.relationshipId = relationshipId;
    }

    public String getRelationshipType() {
        return relationshipType;
    }

    public void setRelationshipType(String relationshipType) {
        this.relationshipType = relationshipType;
    }

    public String getComponentType() {
        return componentType;
    }

    public void setComponentType(String componentType) {
        this.componentType = componentType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getComponentName() {
        return componentName;
    }

    public void setComponentName(String componentName) {
        this.componentName = componentName;
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
        if (!(object instanceof Relationship)) {
            return false;
        }
        Relationship other = (Relationship) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.astonicservice.entity.Relationship[ id=" + id + " ]";
    }
    
}
