import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CobroSuscripcion } from './cobro-suscripcion.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CobroSuscripcion>;

@Injectable()
export class CobroSuscripcionService {

    private resourceUrl =  SERVER_API_URL + 'api/cobro-suscripcions';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/cobro-suscripcions';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(cobroSuscripcion: CobroSuscripcion): Observable<EntityResponseType> {
        const copy = this.convert(cobroSuscripcion);
        return this.http.post<CobroSuscripcion>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cobroSuscripcion: CobroSuscripcion): Observable<EntityResponseType> {
        const copy = this.convert(cobroSuscripcion);
        return this.http.put<CobroSuscripcion>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CobroSuscripcion>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CobroSuscripcion[]>> {
        const options = createRequestOption(req);
        return this.http.get<CobroSuscripcion[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CobroSuscripcion[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<CobroSuscripcion[]>> {
        const options = createRequestOption(req);
        return this.http.get<CobroSuscripcion[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CobroSuscripcion[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CobroSuscripcion = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CobroSuscripcion[]>): HttpResponse<CobroSuscripcion[]> {
        const jsonResponse: CobroSuscripcion[] = res.body;
        const body: CobroSuscripcion[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CobroSuscripcion.
     */
    private convertItemFromServer(cobroSuscripcion: CobroSuscripcion): CobroSuscripcion {
        const copy: CobroSuscripcion = Object.assign({}, cobroSuscripcion);
        copy.fecha = this.dateUtils
            .convertLocalDateFromServer(cobroSuscripcion.fecha);
        return copy;
    }

    /**
     * Convert a CobroSuscripcion to a JSON which can be sent to the server.
     */
    private convert(cobroSuscripcion: CobroSuscripcion): CobroSuscripcion {
        const copy: CobroSuscripcion = Object.assign({}, cobroSuscripcion);
        copy.fecha = this.dateUtils
            .convertLocalDateToServer(cobroSuscripcion.fecha);
        return copy;
    }
}
