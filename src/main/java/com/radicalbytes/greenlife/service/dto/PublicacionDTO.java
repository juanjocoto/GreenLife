package com.radicalbytes.greenlife.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Publicacion entity.
 */
public class PublicacionDTO implements Serializable {

    private Long id;

    @NotNull
    private LocalDate fechaCreacion;

    @NotNull
    @Size(max = 50)
    private String titulo;

    @NotNull
    @Size(max = 2000)
    private String texto;

    private Long usuarioId;

    private Set<EtiquetaDTO> etiquetas = new HashSet<>();

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

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Set<EtiquetaDTO> getEtiquetas() {
        return etiquetas;
    }

    public void setEtiquetas(Set<EtiquetaDTO> etiquetas) {
        this.etiquetas = etiquetas;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PublicacionDTO publicacionDTO = (PublicacionDTO) o;
        if(publicacionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), publicacionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PublicacionDTO{" +
            "id=" + getId() +
            ", fechaCreacion='" + getFechaCreacion() + "'" +
            ", titulo='" + getTitulo() + "'" +
            ", texto='" + getTexto() + "'" +
            "}";
    }
}
