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
 * A Evento.
 */
@Entity
@Table(name = "evento")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "evento")
public class Evento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "fecha_creacion", nullable = false)
    private LocalDate fechaCreacion;

    @NotNull
    @Column(name = "fecha_actividad", nullable = false)
    private LocalDate fechaActividad;

    @NotNull
    @Size(max = 20)
    @Column(name = "nombre", length = 20, nullable = false)
    private String nombre;

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

    @NotNull
    @Size(max = 30)
    @Column(name = "horario", length = 30, nullable = false)
    private String horario;

    @OneToMany(mappedBy = "evento")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Fotografia> fotos = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "evento_etiquetas",
               joinColumns = @JoinColumn(name="eventos_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="etiquetas_id", referencedColumnName="id"))
    private Set<Etiqueta> etiquetas = new HashSet<>();

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

    public Evento fechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
        return this;
    }

    public void setFechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public LocalDate getFechaActividad() {
        return fechaActividad;
    }

    public Evento fechaActividad(LocalDate fechaActividad) {
        this.fechaActividad = fechaActividad;
        return this;
    }

    public void setFechaActividad(LocalDate fechaActividad) {
        this.fechaActividad = fechaActividad;
    }

    public String getNombre() {
        return nombre;
    }

    public Evento nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDireccion() {
        return direccion;
    }

    public Evento direccion(String direccion) {
        this.direccion = direccion;
        return this;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Double getLatitud() {
        return latitud;
    }

    public Evento latitud(Double latitud) {
        this.latitud = latitud;
        return this;
    }

    public void setLatitud(Double latitud) {
        this.latitud = latitud;
    }

    public Double getLongitud() {
        return longitud;
    }

    public Evento longitud(Double longitud) {
        this.longitud = longitud;
        return this;
    }

    public void setLongitud(Double longitud) {
        this.longitud = longitud;
    }

    public String getHorario() {
        return horario;
    }

    public Evento horario(String horario) {
        this.horario = horario;
        return this;
    }

    public void setHorario(String horario) {
        this.horario = horario;
    }

    public Set<Fotografia> getFotos() {
        return fotos;
    }

    public Evento fotos(Set<Fotografia> fotografias) {
        this.fotos = fotografias;
        return this;
    }

    public Evento addFotos(Fotografia fotografia) {
        this.fotos.add(fotografia);
        fotografia.setEvento(this);
        return this;
    }

    public Evento removeFotos(Fotografia fotografia) {
        this.fotos.remove(fotografia);
        fotografia.setEvento(null);
        return this;
    }

    public void setFotos(Set<Fotografia> fotografias) {
        this.fotos = fotografias;
    }

    public Set<Etiqueta> getEtiquetas() {
        return etiquetas;
    }

    public Evento etiquetas(Set<Etiqueta> etiquetas) {
        this.etiquetas = etiquetas;
        return this;
    }

    public Evento addEtiquetas(Etiqueta etiqueta) {
        this.etiquetas.add(etiqueta);
        return this;
    }

    public Evento removeEtiquetas(Etiqueta etiqueta) {
        this.etiquetas.remove(etiqueta);
        return this;
    }

    public void setEtiquetas(Set<Etiqueta> etiquetas) {
        this.etiquetas = etiquetas;
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
        Evento evento = (Evento) o;
        if (evento.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), evento.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Evento{" +
            "id=" + getId() +
            ", fechaCreacion='" + getFechaCreacion() + "'" +
            ", fechaActividad='" + getFechaActividad() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", direccion='" + getDireccion() + "'" +
            ", latitud=" + getLatitud() +
            ", longitud=" + getLongitud() +
            ", horario='" + getHorario() + "'" +
            "}";
    }
}
