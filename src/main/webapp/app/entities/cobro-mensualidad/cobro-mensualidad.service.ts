import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CobroMensualidad } from './cobro-mensualidad.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CobroMensualidad>;

@Injectable()
export class CobroMensualidadService {

    private resourceUrl =  SERVER_API_URL + 'api/cobro-mensualidads';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/cobro-mensualidads';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(cobroMensualidad: CobroMensualidad): Observable<EntityResponseType> {
        const copy = this.convert(cobroMensualidad);
        return this.http.post<CobroMensualidad>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cobroMensualidad: CobroMensualidad): Observable<EntityResponseType> {
        const copy = this.convert(cobroMensualidad);
        return this.http.put<CobroMensualidad>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CobroMensualidad>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CobroMensualidad[]>> {
        const options = createRequestOption(req);
        return this.http.get<CobroMensualidad[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CobroMensualidad[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<CobroMensualidad[]>> {
        const options = createRequestOption(req);
        return this.http.get<CobroMensualidad[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CobroMensualidad[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CobroMensualidad = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CobroMensualidad[]>): HttpResponse<CobroMensualidad[]> {
        const jsonResponse: CobroMensualidad[] = res.body;
        const body: CobroMensualidad[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CobroMensualidad.
     */
    private convertItemFromServer(cobroMensualidad: CobroMensualidad): CobroMensualidad {
        const copy: CobroMensualidad = Object.assign({}, cobroMensualidad);
        copy.fecha = this.dateUtils
            .convertLocalDateFromServer(cobroMensualidad.fecha);
        return copy;
    }

    /**
     * Convert a CobroMensualidad to a JSON which can be sent to the server.
     */
    private convert(cobroMensualidad: CobroMensualidad): CobroMensualidad {
        const copy: CobroMensualidad = Object.assign({}, cobroMensualidad);
        copy.fecha = this.dateUtils
            .convertLocalDateToServer(cobroMensualidad.fecha);
        return copy;
    }
}
