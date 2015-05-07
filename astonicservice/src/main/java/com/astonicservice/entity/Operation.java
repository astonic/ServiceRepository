/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.astonicservice.entity;

import java.io.Serializable;
import java.util.Collection;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
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
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

/**
 *
 * @author aston
 */
@Entity
@Table(name = "operation", catalog = "repo", schema = "")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Operation.findAll", query = "SELECT o FROM Operation o"),
    @NamedQuery(name = "Operation.findById", query = "SELECT o FROM Operation o WHERE o.id = :id"),
    @NamedQuery(name = "Operation.findByName", query = "SELECT o FROM Operation o WHERE o.name = :name"),
    @NamedQuery(name = "Operation.findByDescription", query = "SELECT o FROM Operation o WHERE o.description = :description"),
    @NamedQuery(name = "Operation.findByRequestMsg", query = "SELECT o FROM Operation o WHERE o.requestMsg = :requestMsg"),
    @NamedQuery(name = "Operation.findByResponseMsg", query = "SELECT o FROM Operation o WHERE o.responseMsg = :responseMsg"),
    @NamedQuery(name = "Operation.findByTags", query = "SELECT o FROM Operation o WHERE o.tags = :tags"),
    @NamedQuery(name = "Operation.findByMepType", query = "SELECT o FROM Operation o WHERE o.mepType = :mepType"),
    @NamedQuery(name = "Operation.findByFlowDiagram", query = "SELECT o FROM Operation o WHERE o.flowDiagram = :flowDiagram")})
public class Operation implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Size(max = 45)
    @Column(name = "name")
    private String name;
    @Size(max = 1000)
    @Column(name = "description")
    private String description;
    @Size(max = 1000)
    @Column(name = "request_msg")
    private String requestMsg;
    @Size(max = 1000)
    @Column(name = "response_msg")
    private String responseMsg;
    @Size(max = 100)
    @Column(name = "tags")
    private String tags;
    @Size(max = 45)
    @Column(name = "mep_type")
    private String mepType;
    @Size(max = 500)
    @Column(name = "flow_diagram")
    private String flowDiagram;
    @OneToMany(mappedBy = "operationId", fetch = FetchType.EAGER)
    @Fetch(value = FetchMode.SUBSELECT)
    private Collection<Logic> logicCollection;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "operationId", fetch = FetchType.EAGER)
    @Fetch(value = FetchMode.SUBSELECT)
    private Collection<Relationship> relationshipCollection;
    @JoinColumn(name = "service_id", referencedColumnName = "id")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private Service serviceId;

    public Operation() {
    }

    public Operation(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRequestMsg() {
        return requestMsg;
    }

    public void setRequestMsg(String requestMsg) {
        this.requestMsg = requestMsg;
    }

    public String getResponseMsg() {
        return responseMsg;
    }

    public void setResponseMsg(String responseMsg) {
        this.responseMsg = responseMsg;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public String getMepType() {
        return mepType;
    }

    public void setMepType(String mepType) {
        this.mepType = mepType;
    }

    public String getFlowDiagram() {
        return flowDiagram;
    }

    public void setFlowDiagram(String flowDiagram) {
        this.flowDiagram = flowDiagram;
    }

    @XmlTransient
    public Collection<Logic> getLogicCollection() {
        return logicCollection;
    }

    public void setLogicCollection(Collection<Logic> logicCollection) {
        this.logicCollection = logicCollection;
    }

    @XmlTransient
    public Collection<Relationship> getRelationshipCollection() {
        return relationshipCollection;
    }

    public void setRelationshipCollection(Collection<Relationship> relationshipCollection) {
        this.relationshipCollection = relationshipCollection;
    }

    public Service getServiceId() {
        return serviceId;
    }

    public void setServiceId(Service serviceId) {
        this.serviceId = serviceId;
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
        if (!(object instanceof Operation)) {
            return false;
        }
        Operation other = (Operation) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.astonicservice.entity.Operation[ id=" + id + " ]";
    }
    
}
