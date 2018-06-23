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
 * A Usuario.
 */
@Entity
@Table(name = "usuario")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "usuario")
public class Usuario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "fecha_creacion", nullable = false)
    private LocalDate fechaCreacion;

    @NotNull
    @Column(name = "fecha_nacimiento", nullable = false)
    private LocalDate fechaNacimiento;

    @NotNull
    @Size(min = 8, max = 15)
    @Column(name = "cedula", length = 15, nullable = false)
    private String cedula;

    @Size(max = 200)
    @Column(name = "direccion", length = 200)
    private String direccion;

    @NotNull
    @Size(min = 8, max = 8)
    @Column(name = "telefono", length = 8, nullable = false)
    private String telefono;

    @Column(name = "foto_url")
    private String fotoUrl;

    @Column(name = "latitud")
    private Double latitud;

    @Column(name = "longitud")
    private Double longitud;

    @OneToOne
    @JoinColumn(unique = true)
    private User userDetail;

    @OneToMany(mappedBy = "usuario")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ResenaComercio> resenasComercios = new HashSet<>();

    @OneToMany(mappedBy = "usuario")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Suscripcion> suscripciones = new HashSet<>();

    @OneToMany(mappedBy = "solicitante")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<OrdenRecoleccion> solicitudesRecoleccions = new HashSet<>();

    @OneToMany(mappedBy = "recolector")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<OrdenRecoleccion> ordenes = new HashSet<>();

    @OneToMany(mappedBy = "usuario")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Publicacion> publicaciones = new HashSet<>();

    @OneToMany(mappedBy = "usuario")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ComentarioPublicacion> comentarios = new HashSet<>();

    @OneToMany(mappedBy = "dueno")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Comercio> comercios = new HashSet<>();

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

    public Usuario fechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
        return this;
    }

    public void setFechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public Usuario fechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
        return this;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getCedula() {
        return cedula;
    }

    public Usuario cedula(String cedula) {
        this.cedula = cedula;
        return this;
    }

    public void setCedula(String cedula) {
        this.cedula = cedula;
    }

    public String getDireccion() {
        return direccion;
    }

    public Usuario direccion(String direccion) {
        this.direccion = direccion;
        return this;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getTelefono() {
        return telefono;
    }

    public Usuario telefono(String telefono) {
        this.telefono = telefono;
        return this;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getFotoUrl() {
        return fotoUrl;
    }

    public Usuario fotoUrl(String fotoUrl) {
        this.fotoUrl = fotoUrl;
        return this;
    }

    public void setFotoUrl(String fotoUrl) {
        this.fotoUrl = fotoUrl;
    }

    public Double getLatitud() {
        return latitud;
    }

    public Usuario latitud(Double latitud) {
        this.latitud = latitud;
        return this;
    }

    public void setLatitud(Double latitud) {
        this.latitud = latitud;
    }

    public Double getLongitud() {
        return longitud;
    }

    public Usuario longitud(Double longitud) {
        this.longitud = longitud;
        return this;
    }

    public void setLongitud(Double longitud) {
        this.longitud = longitud;
    }

    public User getUserDetail() {
        return userDetail;
    }

    public Usuario userDetail(User user) {
        this.userDetail = user;
        return this;
    }

    public void setUserDetail(User user) {
        this.userDetail = user;
    }

    public Set<ResenaComercio> getResenasComercios() {
        return resenasComercios;
    }

    public Usuario resenasComercios(Set<ResenaComercio> resenaComercios) {
        this.resenasComercios = resenaComercios;
        return this;
    }

    public Usuario addResenasComercio(ResenaComercio resenaComercio) {
        this.resenasComercios.add(resenaComercio);
        resenaComercio.setUsuario(this);
        return this;
    }

    public Usuario removeResenasComercio(ResenaComercio resenaComercio) {
        this.resenasComercios.remove(resenaComercio);
        resenaComercio.setUsuario(null);
        return this;
    }

    public void setResenasComercios(Set<ResenaComercio> resenaComercios) {
        this.resenasComercios = resenaComercios;
    }

    public Set<Suscripcion> getSuscripciones() {
        return suscripciones;
    }

    public Usuario suscripciones(Set<Suscripcion> suscripcions) {
        this.suscripciones = suscripcions;
        return this;
    }

    public Usuario addSuscripciones(Suscripcion suscripcion) {
        this.suscripciones.add(suscripcion);
        suscripcion.setUsuario(this);
        return this;
    }

    public Usuario removeSuscripciones(Suscripcion suscripcion) {
        this.suscripciones.remove(suscripcion);
        suscripcion.setUsuario(null);
        return this;
    }

    public void setSuscripciones(Set<Suscripcion> suscripcions) {
        this.suscripciones = suscripcions;
    }

    public Set<OrdenRecoleccion> getSolicitudesRecoleccions() {
        return solicitudesRecoleccions;
    }

    public Usuario solicitudesRecoleccions(Set<OrdenRecoleccion> ordenRecoleccions) {
        this.solicitudesRecoleccions = ordenRecoleccions;
        return this;
    }

    public Usuario addSolicitudesRecoleccion(OrdenRecoleccion ordenRecoleccion) {
        this.solicitudesRecoleccions.add(ordenRecoleccion);
        ordenRecoleccion.setSolicitante(this);
        return this;
    }

    public Usuario removeSolicitudesRecoleccion(OrdenRecoleccion ordenRecoleccion) {
        this.solicitudesRecoleccions.remove(ordenRecoleccion);
        ordenRecoleccion.setSolicitante(null);
        return this;
    }

    public void setSolicitudesRecoleccions(Set<OrdenRecoleccion> ordenRecoleccions) {
        this.solicitudesRecoleccions = ordenRecoleccions;
    }

    public Set<OrdenRecoleccion> getOrdenes() {
        return ordenes;
    }

    public Usuario ordenes(Set<OrdenRecoleccion> ordenRecoleccions) {
        this.ordenes = ordenRecoleccions;
        return this;
    }

    public Usuario addOrdenes(OrdenRecoleccion ordenRecoleccion) {
        this.ordenes.add(ordenRecoleccion);
        ordenRecoleccion.setRecolector(this);
        return this;
    }

    public Usuario removeOrdenes(OrdenRecoleccion ordenRecoleccion) {
        this.ordenes.remove(ordenRecoleccion);
        ordenRecoleccion.setRecolector(null);
        return this;
    }

    public void setOrdenes(Set<OrdenRecoleccion> ordenRecoleccions) {
        this.ordenes = ordenRecoleccions;
    }

    public Set<Publicacion> getPublicaciones() {
        return publicaciones;
    }

    public Usuario publicaciones(Set<Publicacion> publicacions) {
        this.publicaciones = publicacions;
        return this;
    }

    public Usuario addPublicaciones(Publicacion publicacion) {
        this.publicaciones.add(publicacion);
        publicacion.setUsuario(this);
        return this;
    }

    public Usuario removePublicaciones(Publicacion publicacion) {
        this.publicaciones.remove(publicacion);
        publicacion.setUsuario(null);
        return this;
    }

    public void setPublicaciones(Set<Publicacion> publicacions) {
        this.publicaciones = publicacions;
    }

    public Set<ComentarioPublicacion> getComentarios() {
        return comentarios;
    }

    public Usuario comentarios(Set<ComentarioPublicacion> comentarioPublicacions) {
        this.comentarios = comentarioPublicacions;
        return this;
    }

    public Usuario addComentarios(ComentarioPublicacion comentarioPublicacion) {
        this.comentarios.add(comentarioPublicacion);
        comentarioPublicacion.setUsuario(this);
        return this;
    }

    public Usuario removeComentarios(ComentarioPublicacion comentarioPublicacion) {
        this.comentarios.remove(comentarioPublicacion);
        comentarioPublicacion.setUsuario(null);
        return this;
    }

    public void setComentarios(Set<ComentarioPublicacion> comentarioPublicacions) {
        this.comentarios = comentarioPublicacions;
    }

    public Set<Comercio> getComercios() {
        return comercios;
    }

    public Usuario comercios(Set<Comercio> comercios) {
        this.comercios = comercios;
        return this;
    }

    public Usuario addComercios(Comercio comercio) {
        this.comercios.add(comercio);
        comercio.setDueno(this);
        return this;
    }

    public Usuario removeComercios(Comercio comercio) {
        this.comercios.remove(comercio);
        comercio.setDueno(null);
        return this;
    }

    public void setComercios(Set<Comercio> comercios) {
        this.comercios = comercios;
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
        Usuario usuario = (Usuario) o;
        if (usuario.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), usuario.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Usuario{" +
            "id=" + getId() +
            ", fechaCreacion='" + getFechaCreacion() + "'" +
            ", fechaNacimiento='" + getFechaNacimiento() + "'" +
            ", cedula='" + getCedula() + "'" +
            ", direccion='" + getDireccion() + "'" +
            ", telefono='" + getTelefono() + "'" +
            ", fotoUrl='" + getFotoUrl() + "'" +
            ", latitud=" + getLatitud() +
            ", longitud=" + getLongitud() +
            "}";
    }
}
