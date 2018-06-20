package com.radicalbytes.greenlife.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A CentroAcopio.
 */
@Entity
@Table(name = "centro_acopio")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "centroacopio")
public class CentroAcopio implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "fecha_creacion", nullable = false)
    private LocalDate fechaCreacion;

    @NotNull
    @Size(max = 50)
    @Column(name = "nombre", length = 50, nullable = false)
    private String nombre;

    @NotNull
    @Size(max = 8)
    @Column(name = "telefono", length = 8, nullable = false)
    private String telefono;

    @NotNull
    @Size(max = 200)
    @Column(name = "direccion", length = 200, nullable = false)
    private String direccion;

    @NotNull
    @Column(name = "latitud", nullable = false)
    private Double latitud;

    @NotNull
    @Column(name = "longitud", nullable = false)
    private Double longitud;

    @Size(max = 200)
    @Column(name = "sitio_web", length = 200)
    private String sitioWeb;

    @Size(max = 200)
    @Column(name = "correo", length = 200)
    private String correo;

    @OneToMany(mappedBy = "centroAcopio")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Fotografia> fotos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaCreacion() {
        return fechaCreacion;
    }

    public CentroAcopio fechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
        return this;
    }

    public void setFechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public String getNombre() {
        return nombre;
    }

    public CentroAcopio nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTelefono() {
        return telefono;
    }

    public CentroAcopio telefono(String telefono) {
        this.telefono = telefono;
        return this;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getDireccion() {
        return direccion;
    }

    public CentroAcopio direccion(String direccion) {
        this.direccion = direccion;
        return this;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Double getLatitud() {
        return latitud;
    }

    public CentroAcopio latitud(Double latitud) {
        this.latitud = latitud;
        return this;
    }

    public void setLatitud(Double latitud) {
        this.latitud = latitud;
    }

    public Double getLongitud() {
        return longitud;
    }

    public CentroAcopio longitud(Double longitud) {
        this.longitud = longitud;
        return this;
    }

    public void setLongitud(Double longitud) {
        this.longitud = longitud;
    }

    public String getSitioWeb() {
        return sitioWeb;
    }

    public CentroAcopio sitioWeb(String sitioWeb) {
        this.sitioWeb = sitioWeb;
        return this;
    }

    public void setSitioWeb(String sitioWeb) {
        this.sitioWeb = sitioWeb;
    }

    public String getCorreo() {
        return correo;
    }

    public CentroAcopio correo(String correo) {
        this.correo = correo;
        return this;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public Set<Fotografia> getFotos() {
        return fotos;
    }

    public CentroAcopio fotos(Set<Fotografia> fotografias) {
        this.fotos = fotografias;
        return this;
    }

    public CentroAcopio addFotos(Fotografia fotografia) {
        this.fotos.add(fotografia);
        fotografia.setCentroAcopio(this);
        return this;
    }

    public CentroAcopio removeFotos(Fotografia fotografia) {
        this.fotos.remove(fotografia);
        fotografia.setCentroAcopio(null);
        return this;
    }

    public void setFotos(Set<Fotografia> fotografias) {
        this.fotos = fotografias;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        CentroAcopio centroAcopio = (CentroAcopio) o;
        if (centroAcopio.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), centroAcopio.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CentroAcopio{" +
            "id=" + getId() +
            ", fechaCreacion='" + getFechaCreacion() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", telefono='" + getTelefono() + "'" +
            ", direccion='" + getDireccion() + "'" +
            ", latitud=" + getLatitud() +
            ", longitud=" + getLongitud() +
            ", sitioWeb='" + getSitioWeb() + "'" +
            ", correo='" + getCorreo() + "'" +
            "}";
    }
}
