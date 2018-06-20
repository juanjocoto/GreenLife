import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Contrato } from './contrato.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Contrato>;

@Injectable()
export class ContratoService {

    private resourceUrl =  SERVER_API_URL + 'api/contratoes';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/contratoes';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(contrato: Contrato): Observable<EntityResponseType> {
        const copy = this.convert(contrato);
        return this.http.post<Contrato>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(contrato: Contrato): Observable<EntityResponseType> {
        const copy = this.convert(contrato);
        return this.http.put<Contrato>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Contrato>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Contrato[]>> {
        const options = createRequestOption(req);
        return this.http.get<Contrato[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Contrato[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Contrato[]>> {
        const options = createRequestOption(req);
        return this.http.get<Contrato[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Contrato[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Contrato = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Contrato[]>): HttpResponse<Contrato[]> {
        const jsonResponse: Contrato[] = res.body;
        const body: Contrato[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Contrato.
     */
    private convertItemFromServer(contrato: Contrato): Contrato {
        const copy: Contrato = Object.assign({}, contrato);
        copy.fechaCreacion = this.dateUtils
            .convertLocalDateFromServer(contrato.fechaCreacion);
        return copy;
    }

    /**
     * Convert a Contrato to a JSON which can be sent to the server.
     */
    private convert(contrato: Contrato): Contrato {
        const copy: Contrato = Object.assign({}, contrato);
        copy.fechaCreacion = this.dateUtils
            .convertLocalDateToServer(contrato.fechaCreacion);
        return copy;
    }
}
