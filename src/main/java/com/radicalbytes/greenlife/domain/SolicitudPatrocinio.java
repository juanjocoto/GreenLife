package com.radicalbytes.greenlife.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A SolicitudPatrocinio.
 */
@Entity
@Table(name = "solicitud_patrocinio")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "solicitudpatrocinio")
public class SolicitudPatrocinio implements Serializable {

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
    @Size(min = 10, max = 10)
    @Column(name = "ced_juridica", length = 10, nullable = false)
    private String cedJuridica;

    @NotNull
    @Size(max = 10)
    @Column(name = "correo", length = 10, nullable = false)
    private String correo;

    @Size(max = 200)
    @Column(name = "datos_adicionales", length = 200)
    private String datosAdicionales;

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

    public SolicitudPatrocinio fechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
        return this;
    }

    public void setFechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public String getNombre() {
        return nombre;
    }

    public SolicitudPatrocinio nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCedJuridica() {
        return cedJuridica;
    }

    public SolicitudPatrocinio cedJuridica(String cedJuridica) {
        this.cedJuridica = cedJuridica;
        return this;
    }

    public void setCedJuridica(String cedJuridica) {
        this.cedJuridica = cedJuridica;
    }

    public String getCorreo() {
        return correo;
    }

    public SolicitudPatrocinio correo(String correo) {
        this.correo = correo;
        return this;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getDatosAdicionales() {
        return datosAdicionales;
    }

    public SolicitudPatrocinio datosAdicionales(String datosAdicionales) {
        this.datosAdicionales = datosAdicionales;
        return this;
    }

    public void setDatosAdicionales(String datosAdicionales) {
        this.datosAdicionales = datosAdicionales;
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
        SolicitudPatrocinio solicitudPatrocinio = (SolicitudPatrocinio) o;
        if (solicitudPatrocinio.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), solicitudPatrocinio.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SolicitudPatrocinio{" +
            "id=" + getId() +
            ", fechaCreacion='" + getFechaCreacion() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", cedJuridica='" + getCedJuridica() + "'" +
            ", correo='" + getCorreo() + "'" +
            ", datosAdicionales='" + getDatosAdicionales() + "'" +
            "}";
    }
}
