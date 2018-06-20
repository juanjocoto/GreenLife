import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Fotografia } from './fotografia.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Fotografia>;

@Injectable()
export class FotografiaService {

    private resourceUrl =  SERVER_API_URL + 'api/fotografias';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/fotografias';

    constructor(private http: HttpClient) { }

    create(fotografia: Fotografia): Observable<EntityResponseType> {
        const copy = this.convert(fotografia);
        return this.http.post<Fotografia>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(fotografia: Fotografia): Observable<EntityResponseType> {
        const copy = this.convert(fotografia);
        return this.http.put<Fotografia>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Fotografia>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Fotografia[]>> {
        const options = createRequestOption(req);
        return this.http.get<Fotografia[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Fotografia[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Fotografia[]>> {
        const options = createRequestOption(req);
        return this.http.get<Fotografia[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Fotografia[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Fotografia = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Fotografia[]>): HttpResponse<Fotografia[]> {
        const jsonResponse: Fotografia[] = res.body;
        const body: Fotografia[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Fotografia.
     */
    private convertItemFromServer(fotografia: Fotografia): Fotografia {
        const copy: Fotografia = Object.assign({}, fotografia);
        return copy;
    }

    /**
     * Convert a Fotografia to a JSON which can be sent to the server.
     */
    private convert(fotografia: Fotografia): Fotografia {
        const copy: Fotografia = Object.assign({}, fotografia);
        return copy;
    }
}
