package com.radicalbytes.greenlife.service.dto;


import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * A DTO for the CentroAcopio entity.
 */
public class CentroAcopioDTO implements Serializable {

    private Long id;

    @NotNull
    private LocalDate fechaCreacion;

    @NotNull
    @Size(max = 50)
    private String nombre;

    @NotNull
    @Size(max = 8)
    private String telefono;

    @NotNull
    @Size(max = 200)
    private String direccion;

    @NotNull
    private Double latitud;

    @NotNull
    private Double longitud;

    @Size(max = 200)
    private String sitioWeb;

    @Size(max = 200)
    private String correo;

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

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
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

    public String getSitioWeb() {
        return sitioWeb;
    }

    public void setSitioWeb(String sitioWeb) {
        this.sitioWeb = sitioWeb;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CentroAcopioDTO centroAcopioDTO = (CentroAcopioDTO) o;
        if(centroAcopioDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), centroAcopioDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CentroAcopioDTO{" +
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
