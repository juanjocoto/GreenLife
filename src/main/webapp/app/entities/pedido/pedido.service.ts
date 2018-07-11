import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Pedido } from './pedido.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Pedido>;

@Injectable()
export class PedidoService {

    private resourceUrl =  SERVER_API_URL + 'api/pedidos';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/pedidos';

    constructor(private http: HttpClient) { }

    create(pedido: Pedido): Observable<EntityResponseType> {
        const copy = this.convert(pedido);
        return this.http.post<Pedido>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(pedido: Pedido): Observable<EntityResponseType> {
        const copy = this.convert(pedido);
        return this.http.put<Pedido>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Pedido>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Pedido[]>> {
        const options = createRequestOption(req);
        return this.http.get<Pedido[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Pedido[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Pedido[]>> {
        const options = createRequestOption(req);
        return this.http.get<Pedido[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Pedido[]>) => this.convertArrayResponse(res));
    }

    findByLocal(id: number): Observable<HttpResponse<Pedido[]>> {
        return this.http.get<Pedido[]>(`${this.resourceUrl}/local/${id}`, { observe: 'response'})
            .map((res: HttpResponse<Pedido[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Pedido = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Pedido[]>): HttpResponse<Pedido[]> {
        const jsonResponse: Pedido[] = res.body;
        const body: Pedido[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Pedido.
     */
    private convertItemFromServer(pedido: Pedido): Pedido {
        const copy: Pedido = Object.assign({}, pedido);
        return copy;
    }

    /**
     * Convert a Pedido to a JSON which can be sent to the server.
     */
    private convert(pedido: Pedido): Pedido {
        const copy: Pedido = Object.assign({}, pedido);
        return copy;
    }
}
