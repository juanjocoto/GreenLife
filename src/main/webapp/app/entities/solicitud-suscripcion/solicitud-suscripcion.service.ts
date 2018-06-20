import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { SolicitudSuscripcion } from './solicitud-suscripcion.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SolicitudSuscripcion>;

@Injectable()
export class SolicitudSuscripcionService {

    private resourceUrl =  SERVER_API_URL + 'api/solicitud-suscripcions';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/solicitud-suscripcions';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(solicitudSuscripcion: SolicitudSuscripcion): Observable<EntityResponseType> {
        const copy = this.convert(solicitudSuscripcion);
        return this.http.post<SolicitudSuscripcion>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(solicitudSuscripcion: SolicitudSuscripcion): Observable<EntityResponseType> {
        const copy = this.convert(solicitudSuscripcion);
        return this.http.put<SolicitudSuscripcion>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SolicitudSuscripcion>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SolicitudSuscripcion[]>> {
        const options = createRequestOption(req);
        return this.http.get<SolicitudSuscripcion[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SolicitudSuscripcion[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<SolicitudSuscripcion[]>> {
        const options = createRequestOption(req);
        return this.http.get<SolicitudSuscripcion[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SolicitudSuscripcion[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SolicitudSuscripcion = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SolicitudSuscripcion[]>): HttpResponse<SolicitudSuscripcion[]> {
        const jsonResponse: SolicitudSuscripcion[] = res.body;
        const body: SolicitudSuscripcion[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SolicitudSuscripcion.
     */
    private convertItemFromServer(solicitudSuscripcion: SolicitudSuscripcion): SolicitudSuscripcion {
        const copy: SolicitudSuscripcion = Object.assign({}, solicitudSuscripcion);
        copy.fecha = this.dateUtils
            .convertLocalDateFromServer(solicitudSuscripcion.fecha);
        return copy;
    }

    /**
     * Convert a SolicitudSuscripcion to a JSON which can be sent to the server.
     */
    private convert(solicitudSuscripcion: SolicitudSuscripcion): SolicitudSuscripcion {
        const copy: SolicitudSuscripcion = Object.assign({}, solicitudSuscripcion);
        copy.fecha = this.dateUtils
            .convertLocalDateToServer(solicitudSuscripcion.fecha);
        return copy;
    }
}
