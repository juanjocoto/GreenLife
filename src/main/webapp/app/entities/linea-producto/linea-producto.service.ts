import { HttpClient, HttpResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { LineaProducto } from './linea-producto.model';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<LineaProducto>;

@Injectable()
export class LineaProductoService {

    private resourceUrl = SERVER_API_URL + 'api/linea-productos';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/linea-productos';

    constructor(private http: HttpClient) { }

    create(lineaProducto: LineaProducto): Observable<EntityResponseType> {
        const copy = this.convert(lineaProducto);
        return this.http.post<LineaProducto>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    createMany(lineasProducto: LineaProducto[]): Observable<HttpResponse<LineaProducto[]>> {
        const copy = lineasProducto.map((linea) => this.convert(linea));
        // linea-productos-bulk
        return this.http.post<LineaProducto[]>(this.resourceUrl + '/bulk', copy, { observe: 'response' })
            .map((res: HttpResponse<LineaProducto[]>) => this.convertArrayResponse(res));
    }

    updateMany(lineasProducto: LineaProducto[]): Observable<HttpResponse<LineaProducto[]>> {
        const copy = lineasProducto.map((linea) => this.convert(linea));
        // linea-productos-bulk
        return this.http.put<LineaProducto[]>(this.resourceUrl + '/bulk', copy, { observe: 'response' })
            .map((res: HttpResponse<LineaProducto[]>) => this.convertArrayResponse(res));
    }

    update(lineaProducto: LineaProducto): Observable<EntityResponseType> {
        const copy = this.convert(lineaProducto);
        return this.http.put<LineaProducto>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<LineaProducto>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findByPedidoId(pedidoId: number): Observable<HttpResponse<LineaProducto[]>> {
        return this.http.get<LineaProducto[]>(`${this.resourceUrl}/pedido/${pedidoId}`, { observe: 'response' })
            .map((res: HttpResponse<LineaProducto[]>) => this.convertArrayResponse(res));
    }

    query(req?: any): Observable<HttpResponse<LineaProducto[]>> {
        const options = createRequestOption(req);
        return this.http.get<LineaProducto[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<LineaProducto[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    deleteMany(lineasProducto: LineaProducto[]): Observable<HttpResponse<any>> {
        if (lineasProducto.length < 1) {
            throw new Error('no lineas');
        }
        let idsString = '';

        for (const linea of lineasProducto) {
            idsString += `${linea.id}-`;
        }

        idsString = idsString.slice(0, -1);

        return this.http.delete<any>(`${this.resourceUrl}/${idsString}/bulk`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<LineaProducto[]>> {
        const options = createRequestOption(req);
        return this.http.get<LineaProducto[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<LineaProducto[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: LineaProducto = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<LineaProducto[]>): HttpResponse<LineaProducto[]> {
        const jsonResponse: LineaProducto[] = res.body;
        const body: LineaProducto[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to LineaProducto.
     */
    private convertItemFromServer(lineaProducto: LineaProducto): LineaProducto {
        const copy: LineaProducto = Object.assign({}, lineaProducto);
        return copy;
    }

    /**
     * Convert a LineaProducto to a JSON which can be sent to the server.
     */
    private convert(lineaProducto: LineaProducto): LineaProducto {
        const copy: LineaProducto = Object.assign({}, lineaProducto);
        return copy;
    }
}
