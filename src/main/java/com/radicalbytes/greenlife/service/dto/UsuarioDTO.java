package com.radicalbytes.greenlife.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Usuario entity.
 */
public class UsuarioDTO implements Serializable {

    private Long id;

    @NotNull
    private LocalDate fechaCreacion;

    @NotNull
    private LocalDate fechaNacimiento;

    @NotNull
    @Size(min = 8, max = 15)
    private String cedula;

    @Size(max = 200)
    private String direccion;

    @NotNull
    @Size(min = 8, max = 8)
    private String telefono;

    private String fotoUrl;

    private Double latitud;

    private Double longitud;

    private Long userDetailId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getCedula() {
        return cedula;
    }

    public void setCedula(String cedula) {
        this.cedula = cedula;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getFotoUrl() {
        return fotoUrl;
    }

    public void setFotoUrl(String fotoUrl) {
        this.fotoUrl = fotoUrl;
    }

    public Double getLatitud() {
        return latitud;
    }

    public void setLatitud(Double latitud) {
        this.latitud = latitud;
    }

    public Double getLongitud() {
        return longitud;
    }

    public void setLongitud(Double longitud) {
        this.longitud = longitud;
    }

    public Long getUserDetailId() {
        return userDetailId;
    }

    public void setUserDetailId(Long userId) {
        this.userDetailId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        UsuarioDTO usuarioDTO = (UsuarioDTO) o;
        if(usuarioDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), usuarioDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UsuarioDTO{" +
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
