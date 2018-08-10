import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ResenaCliente } from './resena-cliente.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ResenaCliente>;

@Injectable()
export class ResenaClienteService {

    private resourceUrl =  SERVER_API_URL + 'api/resena-clientes';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/resena-clientes';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(resenaCliente: ResenaCliente): Observable<EntityResponseType> {
        const copy = this.convert(resenaCliente);
        return this.http.post<ResenaCliente>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(resenaCliente: ResenaCliente): Observable<EntityResponseType> {
        const copy = this.convert(resenaCliente);
        return this.http.put<ResenaCliente>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ResenaCliente>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ResenaCliente[]>> {
        const options = createRequestOption(req);
        return this.http.get<ResenaCliente[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ResenaCliente[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ResenaCliente[]>> {
        const options = createRequestOption(req);
        return this.http.get<ResenaCliente[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ResenaCliente[]>) => this.convertArrayResponse(res));
    }

    findByUsuario(id: number): Observable<HttpResponse<ResenaCliente[]>> {
        return this.http.get<ResenaCliente[]>(`${this.resourceUrl}/usuario/${id}`, { observe: 'response'})
            .map((res: HttpResponse<ResenaCliente[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ResenaCliente = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ResenaCliente[]>): HttpResponse<ResenaCliente[]> {
        const jsonResponse: ResenaCliente[] = res.body;
        const body: ResenaCliente[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ResenaCliente.
     */
    private convertItemFromServer(resenaCliente: ResenaCliente): ResenaCliente {
        const copy: ResenaCliente = Object.assign({}, resenaCliente);
        copy.fechaCreacion = this.dateUtils
            .convertLocalDateFromServer(resenaCliente.fechaCreacion);
        return copy;
    }

    /**
     * Convert a ResenaCliente to a JSON which can be sent to the server.
     */
    private convert(resenaCliente: ResenaCliente): ResenaCliente {
        const copy: ResenaCliente = Object.assign({}, resenaCliente);
        copy.fechaCreacion = this.dateUtils
            .convertLocalDateToServer(resenaCliente.fechaCreacion);
        return copy;
    }
}
