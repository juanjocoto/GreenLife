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

import com.radicalbytes.greenlife.domain.enumeration.TipoComercio;

/**
 * A Comercio.
 */
@Entity
@Table(name = "comercio")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "comercio")
public class Comercio implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "fecha_creacion", nullable = false)
    private LocalDate fechaCreacion;

    @NotNull
    @Size(min = 10, max = 10)
    @Column(name = "ced_juridica", length = 10, nullable = false)
    private String cedJuridica;

    @NotNull
    @Size(max = 50)
    @Column(name = "razon_social", length = 50, nullable = false)
    private String razonSocial;

    @NotNull
    @Size(max = 50)
    @Column(name = "nombre_comercial", length = 50, nullable = false)
    private String nombreComercial;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo")
    private TipoComercio tipo;

    @Size(max = 500)
    @Column(name = "logo_url", length = 500)
    private String logoUrl;

    @OneToMany(mappedBy = "comercio")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ResenaCliente> resenasClientes = new HashSet<>();

    @OneToMany(mappedBy = "comercio")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ResenaComercio> resenasPropias = new HashSet<>();

    @OneToMany(mappedBy = "comercio")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Producto> productos = new HashSet<>();

    @OneToMany(mappedBy = "comercio")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Local> locales = new HashSet<>();

    @OneToMany(mappedBy = "comercio")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Suscripcion> suscriptores = new HashSet<>();

    @OneToMany(mappedBy = "comercio")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Fotografia> fotos = new HashSet<>();

    @OneToMany(mappedBy = "comercio")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Contrato> contratos = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "comercio_etiquetas",
               joinColumns = @JoinColumn(name="comercios_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="etiquetas_id", referencedColumnName="id"))
    private Set<Etiqueta> etiquetas = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "comercio_categorias",
               joinColumns = @JoinColumn(name="comercios_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="categorias_id", referencedColumnName="id"))
    private Set<CategoriaAlimentacion> categorias = new HashSet<>();

    @ManyToOne
    private Usuario dueno;

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

    public Comercio fechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
        return this;
    }

    public void setFechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public String getCedJuridica() {
        return cedJuridica;
    }

    public Comercio cedJuridica(String cedJuridica) {
        this.cedJuridica = cedJuridica;
        return this;
    }

    public void setCedJuridica(String cedJuridica) {
        this.cedJuridica = cedJuridica;
    }

    public String getRazonSocial() {
        return razonSocial;
    }

    public Comercio razonSocial(String razonSocial) {
        this.razonSocial = razonSocial;
        return this;
    }

    public void setRazonSocial(String razonSocial) {
        this.razonSocial = razonSocial;
    }

    public String getNombreComercial() {
        return nombreComercial;
    }

    public Comercio nombreComercial(String nombreComercial) {
        this.nombreComercial = nombreComercial;
        return this;
    }

    public void setNombreComercial(String nombreComercial) {
        this.nombreComercial = nombreComercial;
    }

    public TipoComercio getTipo() {
        return tipo;
    }

    public Comercio tipo(TipoComercio tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(TipoComercio tipo) {
        this.tipo = tipo;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public Comercio logoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
        return this;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public Set<ResenaCliente> getResenasClientes() {
        return resenasClientes;
    }

    public Comercio resenasClientes(Set<ResenaCliente> resenaClientes) {
        this.resenasClientes = resenaClientes;
        return this;
    }

    public Comercio addResenasClientes(ResenaCliente resenaCliente) {
        this.resenasClientes.add(resenaCliente);
        resenaCliente.setComercio(this);
        return this;
    }

    public Comercio removeResenasClientes(ResenaCliente resenaCliente) {
        this.resenasClientes.remove(resenaCliente);
        resenaCliente.setComercio(null);
        return this;
    }

    public void setResenasClientes(Set<ResenaCliente> resenaClientes) {
        this.resenasClientes = resenaClientes;
    }

    public Set<ResenaComercio> getResenasPropias() {
        return resenasPropias;
    }

    public Comercio resenasPropias(Set<ResenaComercio> resenaComercios) {
        this.resenasPropias = resenaComercios;
        return this;
    }

    public Comercio addResenasPropias(ResenaComercio resenaComercio) {
        this.resenasPropias.add(resenaComercio);
        resenaComercio.setComercio(this);
        return this;
    }

    public Comercio removeResenasPropias(ResenaComercio resenaComercio) {
        this.resenasPropias.remove(resenaComercio);
        resenaComercio.setComercio(null);
        return this;
    }

    public void setResenasPropias(Set<ResenaComercio> resenaComercios) {
        this.resenasPropias = resenaComercios;
    }

    public Set<Producto> getProductos() {
        return productos;
    }

    public Comercio productos(Set<Producto> productos) {
        this.productos = productos;
        return this;
    }

    public Comercio addProductos(Producto producto) {
        this.productos.add(producto);
        producto.setComercio(this);
        return this;
    }

    public Comercio removeProductos(Producto producto) {
        this.productos.remove(producto);
        producto.setComercio(null);
        return this;
    }

    public void setProductos(Set<Producto> productos) {
        this.productos = productos;
    }

    public Set<Local> getLocales() {
        return locales;
    }

    public Comercio locales(Set<Local> locals) {
        this.locales = locals;
        return this;
    }

    public Comercio addLocales(Local local) {
        this.locales.add(local);
        local.setComercio(this);
        return this;
    }

    public Comercio removeLocales(Local local) {
        this.locales.remove(local);
        local.setComercio(null);
        return this;
    }

    public void setLocales(Set<Local> locals) {
        this.locales = locals;
    }

    public Set<Suscripcion> getSuscriptores() {
        return suscriptores;
    }

    public Comercio suscriptores(Set<Suscripcion> suscripcions) {
        this.suscriptores = suscripcions;
        return this;
    }

    public Comercio addSuscriptores(Suscripcion suscripcion) {
        this.suscriptores.add(suscripcion);
        suscripcion.setComercio(this);
        return this;
    }

    public Comercio removeSuscriptores(Suscripcion suscripcion) {
        this.suscriptores.remove(suscripcion);
        suscripcion.setComercio(null);
        return this;
    }

    public void setSuscriptores(Set<Suscripcion> suscripcions) {
        this.suscriptores = suscripcions;
    }

    public Set<Fotografia> getFotos() {
        return fotos;
    }

    public Comercio fotos(Set<Fotografia> fotografias) {
        this.fotos = fotografias;
        return this;
    }

    public Comercio addFotos(Fotografia fotografia) {
        this.fotos.add(fotografia);
        fotografia.setComercio(this);
        return this;
    }

    public Comercio removeFotos(Fotografia fotografia) {
        this.fotos.remove(fotografia);
        fotografia.setComercio(null);
        return this;
    }

    public void setFotos(Set<Fotografia> fotografias) {
        this.fotos = fotografias;
    }

    public Set<Contrato> getContratos() {
        return contratos;
    }

    public Comercio contratos(Set<Contrato> contratoes) {
        this.contratos = contratoes;
        return this;
    }

    public Comercio addContratos(Contrato contrato) {
        this.contratos.add(contrato);
        contrato.setComercio(this);
        return this;
    }

    public Comercio removeContratos(Contrato contrato) {
        this.contratos.remove(contrato);
        contrato.setComercio(null);
        return this;
    }

    public void setContratos(Set<Contrato> contratoes) {
        this.contratos = contratoes;
    }

    public Set<Etiqueta> getEtiquetas() {
        return etiquetas;
    }

    public Comercio etiquetas(Set<Etiqueta> etiquetas) {
        this.etiquetas = etiquetas;
        return this;
    }

    public Comercio addEtiquetas(Etiqueta etiqueta) {
        this.etiquetas.add(etiqueta);
        return this;
    }

    public Comercio removeEtiquetas(Etiqueta etiqueta) {
        this.etiquetas.remove(etiqueta);
        return this;
    }

    public void setEtiquetas(Set<Etiqueta> etiquetas) {
        this.etiquetas = etiquetas;
    }

    public Set<CategoriaAlimentacion> getCategorias() {
        return categorias;
    }

    public Comercio categorias(Set<CategoriaAlimentacion> categoriaAlimentacions) {
        this.categorias = categoriaAlimentacions;
        return this;
    }

    public Comercio addCategorias(CategoriaAlimentacion categoriaAlimentacion) {
        this.categorias.add(categoriaAlimentacion);
        return this;
    }

    public Comercio removeCategorias(CategoriaAlimentacion categoriaAlimentacion) {
        this.categorias.remove(categoriaAlimentacion);
        return this;
    }

    public void setCategorias(Set<CategoriaAlimentacion> categoriaAlimentacions) {
        this.categorias = categoriaAlimentacions;
    }

    public Usuario getDueno() {
        return dueno;
    }

    public Comercio dueno(Usuario usuario) {
        this.dueno = usuario;
        return this;
    }

    public void setDueno(Usuario usuario) {
        this.dueno = usuario;
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
        Comercio comercio = (Comercio) o;
        if (comercio.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), comercio.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Comercio{" +
            "id=" + getId() +
            ", fechaCreacion='" + getFechaCreacion() + "'" +
            ", cedJuridica='" + getCedJuridica() + "'" +
            ", razonSocial='" + getRazonSocial() + "'" +
            ", nombreComercial='" + getNombreComercial() + "'" +
            ", tipo='" + getTipo() + "'" +
            ", logoUrl='" + getLogoUrl() + "'" +
            "}";
    }
}
