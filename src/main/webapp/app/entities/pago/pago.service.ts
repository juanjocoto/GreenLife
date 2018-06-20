import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Pago } from './pago.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Pago>;

@Injectable()
export class PagoService {

    private resourceUrl =  SERVER_API_URL + 'api/pagos';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/pagos';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(pago: Pago): Observable<EntityResponseType> {
        const copy = this.convert(pago);
        return this.http.post<Pago>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(pago: Pago): Observable<EntityResponseType> {
        const copy = this.convert(pago);
        return this.http.put<Pago>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Pago>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Pago[]>> {
        const options = createRequestOption(req);
        return this.http.get<Pago[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Pago[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Pago[]>> {
        const options = createRequestOption(req);
        return this.http.get<Pago[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Pago[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Pago = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Pago[]>): HttpResponse<Pago[]> {
        const jsonResponse: Pago[] = res.body;
        const body: Pago[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Pago.
     */
    private convertItemFromServer(pago: Pago): Pago {
        const copy: Pago = Object.assign({}, pago);
        copy.fecha = this.dateUtils
            .convertLocalDateFromServer(pago.fecha);
        return copy;
    }

    /**
     * Convert a Pago to a JSON which can be sent to the server.
     */
    private convert(pago: Pago): Pago {
        const copy: Pago = Object.assign({}, pago);
        copy.fecha = this.dateUtils
            .convertLocalDateToServer(pago.fecha);
        return copy;
    }
}
