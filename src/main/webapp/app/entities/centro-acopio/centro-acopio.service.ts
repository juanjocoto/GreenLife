import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CentroAcopio } from './centro-acopio.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CentroAcopio>;

@Injectable()
export class CentroAcopioService {

    private resourceUrl =  SERVER_API_URL + 'api/centro-acopios';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/centro-acopios';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(centroAcopio: CentroAcopio): Observable<EntityResponseType> {
        const copy = this.convert(centroAcopio);
        return this.http.post<CentroAcopio>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(centroAcopio: CentroAcopio): Observable<EntityResponseType> {
        const copy = this.convert(centroAcopio);
        return this.http.put<CentroAcopio>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CentroAcopio>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CentroAcopio[]>> {
        const options = createRequestOption(req);
        return this.http.get<CentroAcopio[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CentroAcopio[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<CentroAcopio[]>> {
        const options = createRequestOption(req);
        return this.http.get<CentroAcopio[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CentroAcopio[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CentroAcopio = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CentroAcopio[]>): HttpResponse<CentroAcopio[]> {
        const jsonResponse: CentroAcopio[] = res.body;
        const body: CentroAcopio[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CentroAcopio.
     */
    private convertItemFromServer(centroAcopio: CentroAcopio): CentroAcopio {
        const copy: CentroAcopio = Object.assign({}, centroAcopio);
        copy.fechaCreacion = this.dateUtils
            .convertLocalDateFromServer(centroAcopio.fechaCreacion);
        return copy;
    }

    /**
     * Convert a CentroAcopio to a JSON which can be sent to the server.
     */
    private convert(centroAcopio: CentroAcopio): CentroAcopio {
        const copy: CentroAcopio = Object.assign({}, centroAcopio);
        copy.fechaCreacion = this.dateUtils
            .convertLocalDateToServer(centroAcopio.fechaCreacion);
        return copy;
    }
}
