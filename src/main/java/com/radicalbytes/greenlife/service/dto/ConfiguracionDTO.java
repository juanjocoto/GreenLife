package com.radicalbytes.greenlife.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Configuracion entity.
 */
public class ConfiguracionDTO implements Serializable {

    private Long id;

    @NotNull
    private Integer calificacionMinima;

    @NotNull
    private Integer calificacionMaxima;

    @NotNull
    private String nombreAplicacion;

    @NotNull
    private String razonSocial;

    @NotNull
    private String cedJuridica;

    @NotNull
    private String direccion;

    private Double latitud;

    private Double longitud;

    @NotNull
    private String telefono;

    @NotNull
    private String urlLogo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCalificacionMinima() {
        return calificacionMinima;
    }

    public void setCalificacionMinima(Integer calificacionMinima) {
        this.calificacionMinima = calificacionMinima;
    }

    public Integer getCalificacionMaxima() {
        return calificacionMaxima;
    }

    public void setCalificacionMaxima(Integer calificacionMaxima) {
        this.calificacionMaxima = calificacionMaxima;
    }

    public String getNombreAplicacion() {
        return nombreAplicacion;
    }

    public void setNombreAplicacion(String nombreAplicacion) {
        this.nombreAplicacion = nombreAplicacion;
    }

    public String getRazonSocial() {
        return razonSocial;
    }

    public void setRazonSocial(String razonSocial) {
        this.razonSocial = razonSocial;
    }

    public String getCedJuridica() {
        return cedJuridica;
    }

    public void setCedJuridica(String cedJuridica) {
        this.cedJuridica = cedJuridica;
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

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getUrlLogo() {
        return urlLogo;
    }

    public void setUrlLogo(String urlLogo) {
        this.urlLogo = urlLogo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ConfiguracionDTO configuracionDTO = (ConfiguracionDTO) o;
        if(configuracionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), configuracionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ConfiguracionDTO{" +
            "id=" + getId() +
            ", calificacionMinima=" + getCalificacionMinima() +
            ", calificacionMaxima=" + getCalificacionMaxima() +
            ", nombreAplicacion='" + getNombreAplicacion() + "'" +
            ", razonSocial='" + getRazonSocial() + "'" +
            ", cedJuridica='" + getCedJuridica() + "'" +
            ", direccion='" + getDireccion() + "'" +
            ", latitud=" + getLatitud() +
            ", longitud=" + getLongitud() +
            ", telefono='" + getTelefono() + "'" +
            ", urlLogo='" + getUrlLogo() + "'" +
            "}";
    }
}
