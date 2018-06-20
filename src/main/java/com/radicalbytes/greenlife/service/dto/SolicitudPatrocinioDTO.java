package com.radicalbytes.greenlife.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the SolicitudPatrocinio entity.
 */
public class SolicitudPatrocinioDTO implements Serializable {

    private Long id;

    @NotNull
    private LocalDate fechaCreacion;

    @NotNull
    @Size(max = 50)
    private String nombre;

    @NotNull
    @Size(min = 10, max = 10)
    private String cedJuridica;

    @NotNull
    @Size(max = 10)
    private String correo;

    @Size(max = 200)
    private String datosAdicionales;

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

    public String getCedJuridica() {
        return cedJuridica;
    }

    public void setCedJuridica(String cedJuridica) {
        this.cedJuridica = cedJuridica;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getDatosAdicionales() {
        return datosAdicionales;
    }

    public void setDatosAdicionales(String datosAdicionales) {
        this.datosAdicionales = datosAdicionales;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SolicitudPatrocinioDTO solicitudPatrocinioDTO = (SolicitudPatrocinioDTO) o;
        if(solicitudPatrocinioDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), solicitudPatrocinioDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SolicitudPatrocinioDTO{" +
            "id=" + getId() +
            ", fechaCreacion='" + getFechaCreacion() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", cedJuridica='" + getCedJuridica() + "'" +
            ", correo='" + getCorreo() + "'" +
            ", datosAdicionales='" + getDatosAdicionales() + "'" +
            "}";
    }
}
