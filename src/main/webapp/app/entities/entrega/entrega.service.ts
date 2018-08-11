import { HttpClient, HttpResponse } from '@angular/common/http';

import { Comercio } from './../comercio/comercio.model';
import { Entrega } from './entrega.model';
import { Injectable } from '@angular/core';
import { JhiDateUtils } from 'ng-jhipster';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Entrega>;

@Injectable()
export class EntregaService {

    private resourceUrl = SERVER_API_URL + 'api/entregas';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/entregas';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(entrega: Entrega): Observable<EntityResponseType> {
        const copy = this.convert(entrega);
        return this.http.post<Entrega>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(entrega: Entrega): Observable<EntityResponseType> {
        const copy = this.convert(entrega);
        return this.http.put<Entrega>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Entrega>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findByComercio(comercio: Comercio) {
        return this.http.get<Entrega[]>(`${this.resourceUrl}/comercio/${comercio.id}`, { observe: 'response' })
            .map((res: HttpResponse<Entrega[]>) => this.convertArrayResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Entrega[]>> {
        const options = createRequestOption(req);
        return this.http.get<Entrega[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Entrega[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<Entrega[]>> {
        const options = createRequestOption(req);
        return this.http.get<Entrega[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Entrega[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Entrega = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<Entrega[]>): HttpResponse<Entrega[]> {
        const jsonResponse: Entrega[] = res.body;
        const body: Entrega[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to Entrega.
     */
    private convertItemFromServer(entrega: Entrega): Entrega {
        const copy: Entrega = Object.assign({}, entrega);
        copy.fechaInicio = this.dateUtils
            .convertLocalDateFromServer(entrega.fechaInicio);
        return copy;
    }

    /**
     * Convert a Entrega to a JSON which can be sent to the server.
     */
    private convert(entrega: Entrega): Entrega {
        const copy: Entrega = Object.assign({}, entrega);
        copy.fechaInicio = this.dateUtils
            .convertLocalDateToServer(entrega.fechaInicio);
        return copy;
    }
}
