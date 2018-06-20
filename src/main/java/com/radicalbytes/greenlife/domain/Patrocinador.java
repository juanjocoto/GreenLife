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
 * A Patrocinador.
 */
@Entity
@Table(name = "patrocinador")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "patrocinador")
public class Patrocinador implements Serializable {

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

    @OneToOne
    @JoinColumn(unique = true)
    private SolicitudPatrocinio solicitud;

    @OneToMany(mappedBy = "patrocinador")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Fotografia> fotos = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "patrocinador_eventos",
               joinColumns = @JoinColumn(name="patrocinadors_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="eventos_id", referencedColumnName="id"))
    private Set<Evento> eventos = new HashSet<>();

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

    public Patrocinador fechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
        return this;
    }

    public void setFechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public String getNombre() {
        return nombre;
    }

    public Patrocinador nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCedJuridica() {
        return cedJuridica;
    }

    public Patrocinador cedJuridica(String cedJuridica) {
        this.cedJuridica = cedJuridica;
        return this;
    }

    public void setCedJuridica(String cedJuridica) {
        this.cedJuridica = cedJuridica;
    }

    public String getCorreo() {
        return correo;
    }

    public Patrocinador correo(String correo) {
        this.correo = correo;
        return this;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public SolicitudPatrocinio getSolicitud() {
        return solicitud;
    }

    public Patrocinador solicitud(SolicitudPatrocinio solicitudPatrocinio) {
        this.solicitud = solicitudPatrocinio;
        return this;
    }

    public void setSolicitud(SolicitudPatrocinio solicitudPatrocinio) {
        this.solicitud = solicitudPatrocinio;
    }

    public Set<Fotografia> getFotos() {
        return fotos;
    }

    public Patrocinador fotos(Set<Fotografia> fotografias) {
        this.fotos = fotografias;
        return this;
    }

    public Patrocinador addFotos(Fotografia fotografia) {
        this.fotos.add(fotografia);
        fotografia.setPatrocinador(this);
        return this;
    }

    public Patrocinador removeFotos(Fotografia fotografia) {
        this.fotos.remove(fotografia);
        fotografia.setPatrocinador(null);
        return this;
    }

    public void setFotos(Set<Fotografia> fotografias) {
        this.fotos = fotografias;
    }

    public Set<Evento> getEventos() {
        return eventos;
    }

    public Patrocinador eventos(Set<Evento> eventos) {
        this.eventos = eventos;
        return this;
    }

    public Patrocinador addEventos(Evento evento) {
        this.eventos.add(evento);
        return this;
    }

    public Patrocinador removeEventos(Evento evento) {
        this.eventos.remove(evento);
        return this;
    }

    public void setEventos(Set<Evento> eventos) {
        this.eventos = eventos;
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
        Patrocinador patrocinador = (Patrocinador) o;
        if (patrocinador.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), patrocinador.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Patrocinador{" +
            "id=" + getId() +
            ", fechaCreacion='" + getFechaCreacion() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", cedJuridica='" + getCedJuridica() + "'" +
            ", correo='" + getCorreo() + "'" +
            "}";
    }
}
