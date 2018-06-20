import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { OrdenRecoleccion } from './orden-recoleccion.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<OrdenRecoleccion>;

@Injectable()
export class OrdenRecoleccionService {

    private resourceUrl =  SERVER_API_URL + 'api/orden-recoleccions';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/orden-recoleccions';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(ordenRecoleccion: OrdenRecoleccion): Observable<EntityResponseType> {
        const copy = this.convert(ordenRecoleccion);
        return this.http.post<OrdenRecoleccion>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(ordenRecoleccion: OrdenRecoleccion): Observable<EntityResponseType> {
        const copy = this.convert(ordenRecoleccion);
        return this.http.put<OrdenRecoleccion>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<OrdenRecoleccion>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<OrdenRecoleccion[]>> {
        const options = createRequestOption(req);
        return this.http.get<OrdenRecoleccion[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<OrdenRecoleccion[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<OrdenRecoleccion[]>> {
        const options = createRequestOption(req);
        return this.http.get<OrdenRecoleccion[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<OrdenRecoleccion[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: OrdenRecoleccion = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<OrdenRecoleccion[]>): HttpResponse<OrdenRecoleccion[]> {
        const jsonResponse: OrdenRecoleccion[] = res.body;
        const body: OrdenRecoleccion[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to OrdenRecoleccion.
     */
    private convertItemFromServer(ordenRecoleccion: OrdenRecoleccion): OrdenRecoleccion {
        const copy: OrdenRecoleccion = Object.assign({}, ordenRecoleccion);
        copy.fechaCrecion = this.dateUtils
            .convertLocalDateFromServer(ordenRecoleccion.fechaCrecion);
        copy.fechaSolicitud = this.dateUtils
            .convertLocalDateFromServer(ordenRecoleccion.fechaSolicitud);
        return copy;
    }

    /**
     * Convert a OrdenRecoleccion to a JSON which can be sent to the server.
     */
    private convert(ordenRecoleccion: OrdenRecoleccion): OrdenRecoleccion {
        const copy: OrdenRecoleccion = Object.assign({}, ordenRecoleccion);
        copy.fechaCrecion = this.dateUtils
            .convertLocalDateToServer(ordenRecoleccion.fechaCrecion);
        copy.fechaSolicitud = this.dateUtils
            .convertLocalDateToServer(ordenRecoleccion.fechaSolicitud);
        return copy;
    }
}
