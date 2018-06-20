package com.radicalbytes.greenlife.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Configuracion.
 */
@Entity
@Table(name = "configuracion")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "configuracion")
public class Configuracion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "calificacion_minima", nullable = false)
    private Integer calificacionMinima;

    @NotNull
    @Column(name = "calificacion_maxima", nullable = false)
    private Integer calificacionMaxima;

    @NotNull
    @Column(name = "nombre_aplicacion", nullable = false)
    private String nombreAplicacion;

    @NotNull
    @Column(name = "razon_social", nullable = false)
    private String razonSocial;

    @NotNull
    @Column(name = "ced_juridica", nullable = false)
    private String cedJuridica;

    @NotNull
    @Column(name = "direccion", nullable = false)
    private String direccion;

    @Column(name = "latitud")
    private Double latitud;

    @Column(name = "longitud")
    private Double longitud;

    @NotNull
    @Column(name = "telefono", nullable = false)
    private String telefono;

    @NotNull
    @Column(name = "url_logo", nullable = false)
    private String urlLogo;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCalificacionMinima() {
        return calificacionMinima;
    }

    public Configuracion calificacionMinima(Integer calificacionMinima) {
        this.calificacionMinima = calificacionMinima;
        return this;
    }

    public void setCalificacionMinima(Integer calificacionMinima) {
        this.calificacionMinima = calificacionMinima;
    }

    public Integer getCalificacionMaxima() {
        return calificacionMaxima;
    }

    public Configuracion calificacionMaxima(Integer calificacionMaxima) {
        this.calificacionMaxima = calificacionMaxima;
        return this;
    }

    public void setCalificacionMaxima(Integer calificacionMaxima) {
        this.calificacionMaxima = calificacionMaxima;
    }

    public String getNombreAplicacion() {
        return nombreAplicacion;
    }

    public Configuracion nombreAplicacion(String nombreAplicacion) {
        this.nombreAplicacion = nombreAplicacion;
        return this;
    }

    public void setNombreAplicacion(String nombreAplicacion) {
        this.nombreAplicacion = nombreAplicacion;
    }

    public String getRazonSocial() {
        return razonSocial;
    }

    public Configuracion razonSocial(String razonSocial) {
        this.razonSocial = razonSocial;
        return this;
    }

    public void setRazonSocial(String razonSocial) {
        this.razonSocial = razonSocial;
    }

    public String getCedJuridica() {
        return cedJuridica;
    }

    public Configuracion cedJuridica(String cedJuridica) {
        this.cedJuridica = cedJuridica;
        return this;
    }

    public void setCedJuridica(String cedJuridica) {
        this.cedJuridica = cedJuridica;
    }

    public String getDireccion() {
        return direccion;
    }

    public Configuracion direccion(String direccion) {
        this.direccion = direccion;
        return this;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Double getLatitud() {
        return latitud;
    }

    public Configuracion latitud(Double latitud) {
        this.latitud = latitud;
        return this;
    }

    public void setLatitud(Double latitud) {
        this.latitud = latitud;
    }

    public Double getLongitud() {
        return longitud;
    }

    public Configuracion longitud(Double longitud) {
        this.longitud = longitud;
        return this;
    }

    public void setLongitud(Double longitud) {
        this.longitud = longitud;
    }

    public String getTelefono() {
        return telefono;
    }

    public Configuracion telefono(String telefono) {
        this.telefono = telefono;
        return this;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getUrlLogo() {
        return urlLogo;
    }

    public Configuracion urlLogo(String urlLogo) {
        this.urlLogo = urlLogo;
        return this;
    }

    public void setUrlLogo(String urlLogo) {
        this.urlLogo = urlLogo;
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
        Configuracion configuracion = (Configuracion) o;
        if (configuracion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), configuracion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Configuracion{" +
            "id=" + getId() +
            ", calificacionMinima=" + getCalificacionMinima() +
            ", calificacionMaxima=" + getCalificacionMaxima() +
            ", nombreAplicacion='" + getNombreAplicacion() + "'" +
            ", razonSocial='" + getRazonSocial() + "'" +
            ", cedJuridica='" + getCedJuridica() + "'" +
            ", direccion='" + getDireccion() + "'" +
            ", latitud=" + getLatitud() +
            ", longitud=" + getLongitud() +
            ", telefono='" + getTelefono() + "'" +
            ", urlLogo='" + getUrlLogo() + "'" +
            "}";
    }
}
