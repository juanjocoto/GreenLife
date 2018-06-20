import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GreenlifeConfiguracionModule } from './configuracion/configuracion.module';
import { GreenlifeRolModule } from './rol/rol.module';
import { GreenlifePermisoModule } from './permiso/permiso.module';
import { GreenlifeUsuarioModule } from './usuario/usuario.module';
import { GreenlifeContratoModule } from './contrato/contrato.module';
import { GreenlifeTipoContratoModule } from './tipo-contrato/tipo-contrato.module';
import { GreenlifeClienteModule } from './cliente/cliente.module';
import { GreenlifeAdministradorModule } from './administrador/administrador.module';
import { GreenlifeRecolectorModule } from './recolector/recolector.module';
import { GreenlifeCentroAcopioModule } from './centro-acopio/centro-acopio.module';
import { GreenlifeComercioModule } from './comercio/comercio.module';
import { GreenlifeLocalModule } from './local/local.module';
import { GreenlifeFotografiaModule } from './fotografia/fotografia.module';
import { GreenlifeProductoModule } from './producto/producto.module';
import { GreenlifeSolicitudSuscripcionModule } from './solicitud-suscripcion/solicitud-suscripcion.module';
import { GreenlifeSuscripcionModule } from './suscripcion/suscripcion.module';
import { GreenlifePedidoModule } from './pedido/pedido.module';
import { GreenlifeLineaProductoModule } from './linea-producto/linea-producto.module';
import { GreenlifeLineaEntregaModule } from './linea-entrega/linea-entrega.module';
import { GreenlifeOrdenRecoleccionModule } from './orden-recoleccion/orden-recoleccion.module';
import { GreenlifeCadenaOrdenRecoleccionModule } from './cadena-orden-recoleccion/cadena-orden-recoleccion.module';
import { GreenlifeCategoriaAlimentacionModule } from './categoria-alimentacion/categoria-alimentacion.module';
import { GreenlifePublicacionModule } from './publicacion/publicacion.module';
import { GreenlifeComentarioPublicacionModule } from './comentario-publicacion/comentario-publicacion.module';
import { GreenlifeEventoModule } from './evento/evento.module';
import { GreenlifeDiaEntregaModule } from './dia-entrega/dia-entrega.module';
import { GreenlifeResenaComercioModule } from './resena-comercio/resena-comercio.module';
import { GreenlifeResenaClienteModule } from './resena-cliente/resena-cliente.module';
import { GreenlifePatrocinadorModule } from './patrocinador/patrocinador.module';
import { GreenlifeSolicitudPatrocinioModule } from './solicitud-patrocinio/solicitud-patrocinio.module';
import { GreenlifeEtiquetaModule } from './etiqueta/etiqueta.module';
import { GreenlifeEntregaModule } from './entrega/entrega.module';
import { GreenlifeCadenaEntregaModule } from './cadena-entrega/cadena-entrega.module';
import { GreenlifeCobroSuscripcionModule } from './cobro-suscripcion/cobro-suscripcion.module';
import { GreenlifePagoModule } from './pago/pago.module';
import { GreenlifeCobroMensualidadModule } from './cobro-mensualidad/cobro-mensualidad.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GreenlifeConfiguracionModule,
        GreenlifeRolModule,
        GreenlifePermisoModule,
        GreenlifeUsuarioModule,
        GreenlifeContratoModule,
        GreenlifeTipoContratoModule,
        GreenlifeClienteModule,
        GreenlifeAdministradorModule,
        GreenlifeRecolectorModule,
        GreenlifeCentroAcopioModule,
        GreenlifeComercioModule,
        GreenlifeLocalModule,
        GreenlifeFotografiaModule,
        GreenlifeProductoModule,
        GreenlifeSolicitudSuscripcionModule,
        GreenlifeSuscripcionModule,
        GreenlifePedidoModule,
        GreenlifeLineaProductoModule,
        GreenlifeLineaEntregaModule,
        GreenlifeOrdenRecoleccionModule,
        GreenlifeCadenaOrdenRecoleccionModule,
        GreenlifeCategoriaAlimentacionModule,
        GreenlifePublicacionModule,
        GreenlifeComentarioPublicacionModule,
        GreenlifeEventoModule,
        GreenlifeDiaEntregaModule,
        GreenlifeResenaComercioModule,
        GreenlifeResenaClienteModule,
        GreenlifePatrocinadorModule,
        GreenlifeSolicitudPatrocinioModule,
        GreenlifeEtiquetaModule,
        GreenlifeEntregaModule,
        GreenlifeCadenaEntregaModule,
        GreenlifeCobroSuscripcionModule,
        GreenlifePagoModule,
        GreenlifeCobroMensualidadModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenlifeEntityModule {}
