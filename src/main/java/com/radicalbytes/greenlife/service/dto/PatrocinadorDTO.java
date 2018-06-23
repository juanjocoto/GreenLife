package com.radicalbytes.greenlife.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Patrocinador entity.
 */
public class PatrocinadorDTO implements Serializable {

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

    private Set<EventoDTO> eventos = new HashSet<>();

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

    public Set<EventoDTO> getEventos() {
        return eventos;
    }

    public void setEventos(Set<EventoDTO> eventos) {
        this.eventos = eventos;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PatrocinadorDTO patrocinadorDTO = (PatrocinadorDTO) o;
        if(patrocinadorDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), patrocinadorDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PatrocinadorDTO{" +
            "id=" + getId() +
            ", fechaCreacion='" + getFechaCreacion() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", cedJuridica='" + getCedJuridica() + "'" +
            ", correo='" + getCorreo() + "'" +
            "}";
    }
}
