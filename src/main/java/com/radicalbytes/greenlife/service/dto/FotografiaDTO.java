package com.radicalbytes.greenlife.service.dto;


import java.io.Serializable;
import java.util.Objects;

import javax.validation.constraints.NotNull;

/**
 * A DTO for the Fotografia entity.
 */
public class FotografiaDTO implements Serializable {

    private Long id;

    @NotNull
    private String urlImage;

    private Long centroAcopioId;

    private Long comercioId;

    private Long productoId;

    private Long publicacionId;

    private Long eventoId;

    private Long patrocinadorId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrlImage() {
        return urlImage;
    }

    public void setUrlImage(String urlImage) {
        this.urlImage = urlImage;
    }

    public Long getCentroAcopioId() {
        return centroAcopioId;
    }

    public void setCentroAcopioId(Long centroAcopioId) {
        this.centroAcopioId = centroAcopioId;
    }

    public Long getComercioId() {
        return comercioId;
    }

    public void setComercioId(Long comercioId) {
        this.comercioId = comercioId;
    }

    public Long getProductoId() {
        return productoId;
    }

    public void setProductoId(Long productoId) {
        this.productoId = productoId;
    }

    public Long getPublicacionId() {
        return publicacionId;
    }

    public void setPublicacionId(Long publicacionId) {
        this.publicacionId = publicacionId;
    }

    public Long getEventoId() {
        return eventoId;
    }

    public void setEventoId(Long eventoId) {
        this.eventoId = eventoId;
    }

    public Long getPatrocinadorId() {
        return patrocinadorId;
    }

    public void setPatrocinadorId(Long patrocinadorId) {
        this.patrocinadorId = patrocinadorId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        FotografiaDTO fotografiaDTO = (FotografiaDTO) o;
        if(fotografiaDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), fotografiaDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FotografiaDTO{" +
            "id=" + getId() +
            ", urlImage='" + getUrlImage() + "'" +
            "}";
    }
}
