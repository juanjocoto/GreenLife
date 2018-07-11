import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Suscripcion } from './suscripcion.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Suscripcion>;

@Injectable()
export class SuscripcionService {

    private resourceUrl =  SERVER_API_URL + 'api/suscripcions';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/suscripcions';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(suscripcion: Suscripcion): Observable<EntityResponseType> {
        const copy = this.convert(suscripcion);
        return this.http.post<Suscripcion>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(suscripcion: Suscripcion): Observable<EntityResponseType> {
        const copy = this.convert(suscripcion);
        return this.http.put<Suscripcion>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Suscripcion>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Suscripcion[]>> {
        const options = createRequestOption(req);
        return this.http.get<Suscripcion[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Suscripcion[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Suscripcion[]>> {
        const options = createRequestOption(req);
        return this.http.get<Suscripcion[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Suscripcion[]>) => this.convertArrayResponse(res));
    }

    findSuscripcionesByComercio(id: number): Observable<HttpResponse<Suscripcion[]>> {
        return this.http.get<Suscripcion[]>(`${this.resourceUrl}/comercio/${id}`, { observe: 'response'})
            .map((res: HttpResponse<Suscripcion[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Suscripcion = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Suscripcion[]>): HttpResponse<Suscripcion[]> {
        const jsonResponse: Suscripcion[] = res.body;
        const body: Suscripcion[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Suscripcion.
     */
    private convertItemFromServer(suscripcion: Suscripcion): Suscripcion {
        const copy: Suscripcion = Object.assign({}, suscripcion);
        copy.fechaCreacion = this.dateUtils
            .convertLocalDateFromServer(suscripcion.fechaCreacion);
        copy.fechaCancelacion = this.dateUtils
            .convertLocalDateFromServer(suscripcion.fechaCancelacion);
        copy.fechaCobro = this.dateUtils
            .convertLocalDateFromServer(suscripcion.fechaCobro);
        return copy;
    }

    /**
     * Convert a Suscripcion to a JSON which can be sent to the server.
     */
    private convert(suscripcion: Suscripcion): Suscripcion {
        const copy: Suscripcion = Object.assign({}, suscripcion);
        copy.fechaCreacion = this.dateUtils
            .convertLocalDateToServer(suscripcion.fechaCreacion);
        copy.fechaCancelacion = this.dateUtils
            .convertLocalDateToServer(suscripcion.fechaCancelacion);
        copy.fechaCobro = this.dateUtils
            .convertLocalDateToServer(suscripcion.fechaCobro);
        return copy;
    }
}
