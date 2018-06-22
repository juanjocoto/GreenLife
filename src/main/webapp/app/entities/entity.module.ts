import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { GreenlifeCadenaEntregaModule } from './cadena-entrega/cadena-entrega.module';
import { GreenlifeCadenaOrdenRecoleccionModule } from './cadena-orden-recoleccion/cadena-orden-recoleccion.module';
import { GreenlifeCategoriaAlimentacionModule } from './categoria-alimentacion/categoria-alimentacion.module';
import { GreenlifeCentroAcopioModule } from './centro-acopio/centro-acopio.module';
import { GreenlifeCobroMensualidadModule } from './cobro-mensualidad/cobro-mensualidad.module';
import { GreenlifeCobroSuscripcionModule } from './cobro-suscripcion/cobro-suscripcion.module';
import { GreenlifeComentarioPublicacionModule } from './comentario-publicacion/comentario-publicacion.module';
import { GreenlifeComercioModule } from './comercio/comercio.module';
import { GreenlifeConfiguracionModule } from './configuracion/configuracion.module';
import { GreenlifeContratoModule } from './contrato/contrato.module';
import { GreenlifeDiaEntregaModule } from './dia-entrega/dia-entrega.module';
import { GreenlifeEntregaModule } from './entrega/entrega.module';
import { GreenlifeEtiquetaModule } from './etiqueta/etiqueta.module';
import { GreenlifeEventoModule } from './evento/evento.module';
import { GreenlifeFotografiaModule } from './fotografia/fotografia.module';
import { GreenlifeLineaEntregaModule } from './linea-entrega/linea-entrega.module';
import { GreenlifeLineaProductoModule } from './linea-producto/linea-producto.module';
import { GreenlifeLocalModule } from './local/local.module';
import { GreenlifeOrdenRecoleccionModule } from './orden-recoleccion/orden-recoleccion.module';
import { GreenlifePagoModule } from './pago/pago.module';
import { GreenlifePatrocinadorModule } from './patrocinador/patrocinador.module';
import { GreenlifePedidoModule } from './pedido/pedido.module';
import { GreenlifeProductoModule } from './producto/producto.module';
import { GreenlifePublicacionModule } from './publicacion/publicacion.module';
import { GreenlifeResenaClienteModule } from './resena-cliente/resena-cliente.module';
import { GreenlifeResenaComercioModule } from './resena-comercio/resena-comercio.module';
import { GreenlifeSuscripcionModule } from './suscripcion/suscripcion.module';
import { GreenlifeTipoContratoModule } from './tipo-contrato/tipo-contrato.module';
import { GreenlifeUsuarioModule } from './usuario/usuario.module';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GreenlifeConfiguracionModule,
        GreenlifeUsuarioModule,
        GreenlifeContratoModule,
        GreenlifeTipoContratoModule,
        GreenlifeCentroAcopioModule,
        GreenlifeComercioModule,
        GreenlifeLocalModule,
        GreenlifeFotografiaModule,
        GreenlifeProductoModule,
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
