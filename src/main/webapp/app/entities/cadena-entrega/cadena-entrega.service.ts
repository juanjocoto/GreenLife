import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CadenaEntrega } from './cadena-entrega.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CadenaEntrega>;

@Injectable()
export class CadenaEntregaService {

    private resourceUrl =  SERVER_API_URL + 'api/cadena-entregas';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/cadena-entregas';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(cadenaEntrega: CadenaEntrega): Observable<EntityResponseType> {
        const copy = this.convert(cadenaEntrega);
        return this.http.post<CadenaEntrega>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cadenaEntrega: CadenaEntrega): Observable<EntityResponseType> {
        const copy = this.convert(cadenaEntrega);
        return this.http.put<CadenaEntrega>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CadenaEntrega>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CadenaEntrega[]>> {
        const options = createRequestOption(req);
        return this.http.get<CadenaEntrega[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CadenaEntrega[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<CadenaEntrega[]>> {
        const options = createRequestOption(req);
        return this.http.get<CadenaEntrega[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CadenaEntrega[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CadenaEntrega = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CadenaEntrega[]>): HttpResponse<CadenaEntrega[]> {
        const jsonResponse: CadenaEntrega[] = res.body;
        const body: CadenaEntrega[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CadenaEntrega.
     */
    private convertItemFromServer(cadenaEntrega: CadenaEntrega): CadenaEntrega {
        const copy: CadenaEntrega = Object.assign({}, cadenaEntrega);
        copy.fecha = this.dateUtils
            .convertLocalDateFromServer(cadenaEntrega.fecha);
        return copy;
    }

    /**
     * Convert a CadenaEntrega to a JSON which can be sent to the server.
     */
    private convert(cadenaEntrega: CadenaEntrega): CadenaEntrega {
        const copy: CadenaEntrega = Object.assign({}, cadenaEntrega);
        copy.fecha = this.dateUtils
            .convertLocalDateToServer(cadenaEntrega.fecha);
        return copy;
    }
}
