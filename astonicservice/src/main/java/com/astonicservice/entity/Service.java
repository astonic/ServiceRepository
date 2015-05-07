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
@Table(name = "service", catalog = "repo", schema = "")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Service.findAll", query = "SELECT s FROM Service s"),
    @NamedQuery(name = "Service.findById", query = "SELECT s FROM Service s WHERE s.id = :id"),
    @NamedQuery(name = "Service.findByName", query = "SELECT s FROM Service s WHERE s.name = :name"),
    @NamedQuery(name = "Service.findByProtocolType", query = "SELECT s FROM Service s WHERE s.protocolType = :protocolType"),
    @NamedQuery(name = "Service.findByStatus", query = "SELECT s FROM Service s WHERE s.status = :status"),
    @NamedQuery(name = "Service.findByUri", query = "SELECT s FROM Service s WHERE s.uri = :uri"),
    @NamedQuery(name = "Service.findBySecured", query = "SELECT s FROM Service s WHERE s.secured = :secured"),
    @NamedQuery(name = "Service.findByDocumentationLoc", query = "SELECT s FROM Service s WHERE s.documentationLoc = :documentationLoc"),
    @NamedQuery(name = "Service.findByServiceType", query = "SELECT s FROM Service s WHERE s.serviceType = :serviceType"),
    @NamedQuery(name = "Service.findByDescription", query = "SELECT s FROM Service s WHERE s.description = :description"),
    @NamedQuery(name = "Service.findByBusinessDomain", query = "SELECT s FROM Service s WHERE s.businessDomain = :businessDomain"),
    @NamedQuery(name = "Service.findByTags", query = "SELECT s FROM Service s WHERE s.tags = :tags"),
    @NamedQuery(name = "Service.findByEnvironment", query = "SELECT s FROM Service s WHERE s.environment = :environment")})
public class Service implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Size(max = 45)
    @Column(name = "name")
    private String name;
    @Size(max = 45)
    @Column(name = "protocol_type")
    private String protocolType;
    @Size(max = 45)
    @Column(name = "status")
    private String status;
    @Size(max = 500)
    @Column(name = "uri")
    private String uri;
    @Size(max = 100)
    @Column(name = "secured")
    private String secured;
    @Size(max = 500)
    @Column(name = "documentation_loc")
    private String documentationLoc;
    @Size(max = 500)
    @Column(name = "service_type")
    private String serviceType;
    @Size(max = 1000)
    @Column(name = "description")
    private String description;
    @Size(max = 100)
    @Column(name = "business_domain")
    private String businessDomain;
    @Size(max = 100)
    @Column(name = "tags")
    private String tags;
    @Size(max = 1000)
    @Column(name = "environment")
    private String environment;
    @JoinColumn(name = "project_id", referencedColumnName = "id")
    @ManyToOne(fetch = FetchType.EAGER)
    private Project projectId;
    @OneToMany(mappedBy = "serviceId", fetch = FetchType.EAGER)
    @Fetch(value = FetchMode.SUBSELECT)
    private Collection<History> historyCollection;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "serviceId", fetch = FetchType.EAGER)
    @Fetch(value = FetchMode.SUBSELECT)
    private Collection<Operation> operationCollection;

    public Service() {
    }

    public Service(Integer id) {
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

    public String getProtocolType() {
        return protocolType;
    }

    public void setProtocolType(String protocolType) {
        this.protocolType = protocolType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }

    public String getSecured() {
        return secured;
    }

    public void setSecured(String secured) {
        this.secured = secured;
    }

    public String getDocumentationLoc() {
        return documentationLoc;
    }

    public void setDocumentationLoc(String documentationLoc) {
        this.documentationLoc = documentationLoc;
    }

    public String getServiceType() {
        return serviceType;
    }

    public void setServiceType(String serviceType) {
        this.serviceType = serviceType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBusinessDomain() {
        return businessDomain;
    }

    public void setBusinessDomain(String businessDomain) {
        this.businessDomain = businessDomain;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public String getEnvironment() {
        return environment;
    }

    public void setEnvironment(String environment) {
        this.environment = environment;
    }

    public Project getProjectId() {
        return projectId;
    }

    public void setProjectId(Project projectId) {
        this.projectId = projectId;
    }

    @XmlTransient
    public Collection<History> getHistoryCollection() {
        return historyCollection;
    }

    public void setHistoryCollection(Collection<History> historyCollection) {
        this.historyCollection = historyCollection;
    }

    @XmlTransient
    public Collection<Operation> getOperationCollection() {
        return operationCollection;
    }

    public void setOperationCollection(Collection<Operation> operationCollection) {
        this.operationCollection = operationCollection;
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
        if (!(object instanceof Service)) {
            return false;
        }
        Service other = (Service) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.astonicservice.entity.Service[ id=" + id + " ]";
    }
    
}
