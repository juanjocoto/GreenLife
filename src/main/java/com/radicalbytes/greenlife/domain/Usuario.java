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
    @Size(min = 5, max = 20)
    @Column(name = "nombre", length = 20, nullable = false)
    private String nombre;

    @NotNull
    @Size(min = 5, max = 50)
    @Column(name = "apellidos", length = 50, nullable = false)
    private String apellidos;

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

    @Column(name = "latitud")
    private Double latitud;

    @Column(name = "longitud")
    private Double longitud;

    @NotNull
    @Size(min = 8)
    @Column(name = "contrasena", nullable = false)
    private String contrasena;

    @NotNull
    @Size(max = 80)
    @Column(name = "correo", length = 80, nullable = false)
    private String correo;

    @NotNull
    @Column(name = "esta_activado", nullable = false)
    private Boolean estaActivado;

    @NotNull
    @Size(max = 20)
    @Column(name = "nombre_usuario", length = 20, nullable = false)
    private String nombreUsuario;

    @OneToOne
    @JoinColumn(unique = true)
    private Fotografia foto;

    @OneToOne
    @JoinColumn(unique = true)
    private User userDetail;

    @OneToMany(mappedBy = "usuario")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Publicacion> publicaciones = new HashSet<>();

    @OneToMany(mappedBy = "usuario")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ComentarioPublicacion> comentarios = new HashSet<>();

    @ManyToOne
    private Rol rol;

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

    public String getNombre() {
        return nombre;
    }

    public Usuario nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public Usuario apellidos(String apellidos) {
        this.apellidos = apellidos;
        return this;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
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

    public String getContrasena() {
        return contrasena;
    }

    public Usuario contrasena(String contrasena) {
        this.contrasena = contrasena;
        return this;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public String getCorreo() {
        return correo;
    }

    public Usuario correo(String correo) {
        this.correo = correo;
        return this;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public Boolean isEstaActivado() {
        return estaActivado;
    }

    public Usuario estaActivado(Boolean estaActivado) {
        this.estaActivado = estaActivado;
        return this;
    }

    public void setEstaActivado(Boolean estaActivado) {
        this.estaActivado = estaActivado;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public Usuario nombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
        return this;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public Fotografia getFoto() {
        return foto;
    }

    public Usuario foto(Fotografia fotografia) {
        this.foto = fotografia;
        return this;
    }

    public void setFoto(Fotografia fotografia) {
        this.foto = fotografia;
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

    public Rol getRol() {
        return rol;
    }

    public Usuario rol(Rol rol) {
        this.rol = rol;
        return this;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
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
            ", nombre='" + getNombre() + "'" +
            ", apellidos='" + getApellidos() + "'" +
            ", cedula='" + getCedula() + "'" +
            ", direccion='" + getDireccion() + "'" +
            ", telefono='" + getTelefono() + "'" +
            ", latitud=" + getLatitud() +
            ", longitud=" + getLongitud() +
            ", contrasena='" + getContrasena() + "'" +
            ", correo='" + getCorreo() + "'" +
            ", estaActivado='" + isEstaActivado() + "'" +
            ", nombreUsuario='" + getNombreUsuario() + "'" +
            "}";
    }
}
