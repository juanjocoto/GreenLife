package com.radicalbytes.greenlife.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.serviceregistry.Registration;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.radicalbytes.greenlife.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.SocialUserConnection.class.getName(), jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Configuracion.class.getName(), jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Rol.class.getName(), jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Rol.class.getName() + ".permisos", jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Permiso.class.getName(), jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Usuario.class.getName(), jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Usuario.class.getName() + ".publicaciones", jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Usuario.class.getName() + ".comentarios", jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Contrato.class.getName(), jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.TipoContrato.class.getName(), jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Cliente.class.getName(), jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Cliente.class.getName() + ".resenas", jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Cliente.class.getName() + ".suscripciones", jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Cliente.class.getName() + ".solicitudesRecoleccions", jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Administrador.class.getName(), jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Recolector.class.getName(), jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Recolector.class.getName() + ".ordenes", jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.CentroAcopio.class.getName(), jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.CentroAcopio.class.getName() + ".fotos", jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Comercio.class.getName(), jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Comercio.class.getName() + ".resenasClientes", jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Comercio.class.getName() + ".resenasPropias", jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Comercio.class.getName() + ".productos", jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Comercio.class.getName() + ".locales", jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Comercio.class.getName() + ".suscriptores", jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Comercio.class.getName() + ".fotos", jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Comercio.class.getName() + ".contratos", jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Comercio.class.getName() + ".etiquetas", jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Comercio.class.getName() + ".categorias", jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Local.class.getName(), jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Fotografia.class.getName(), jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Producto.class.getName(), jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Producto.class.getName() + ".fotos", jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Producto.class.getName() + ".etiquetas", jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Producto.class.getName() + ".categorias", jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.SolicitudSuscripcion.class.getName(), jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Suscripcion.class.getName(), jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Suscripcion.class.getName() + ".pedidos", jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Suscripcion.class.getName() + ".historicoEntregases", jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Pedido.class.getName(), jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Pedido.class.getName() + ".entregases", jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.LineaProducto.class.getName(), jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.LineaEntrega.class.getName(), jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.OrdenRecoleccion.class.getName(), jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.OrdenRecoleccion.class.getName() + ".estados", jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.CadenaOrdenRecoleccion.class.getName(), jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.CategoriaAlimentacion.class.getName(), jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Publicacion.class.getName(), jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Publicacion.class.getName() + ".comentarios", jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Publicacion.class.getName() + ".fotos", jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Publicacion.class.getName() + ".etiquetas", jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.ComentarioPublicacion.class.getName(), jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Evento.class.getName(), jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Evento.class.getName() + ".fotos", jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Evento.class.getName() + ".etiquetas", jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.DiaEntrega.class.getName(), jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.ResenaComercio.class.getName(), jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.ResenaCliente.class.getName(), jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Patrocinador.class.getName(), jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Patrocinador.class.getName() + ".fotos", jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Patrocinador.class.getName() + ".eventos", jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.SolicitudPatrocinio.class.getName(), jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Etiqueta.class.getName(), jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Entrega.class.getName(), jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Entrega.class.getName() + ".cadenas", jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Entrega.class.getName() + ".lineas", jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.CadenaEntrega.class.getName(), jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.CobroSuscripcion.class.getName(), jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.Pago.class.getName(), jcacheConfiguration);
            cm.createCache(com.radicalbytes.greenlife.domain.CobroMensualidad.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
