import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { JhiDateUtils } from 'ng-jhipster';
import { Local } from './local.model';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared';
import {Comercio} from "../comercio/comercio.model";

export type EntityResponseType = HttpResponse<Local>;

@Injectable()
export class LocalService {

    private resourceUrl = SERVER_API_URL + 'api/locals';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/locals';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(local: Local): Observable<EntityResponseType> {
        const copy = this.convert(local);
        return this.http.post<Local>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(local: Local): Observable<EntityResponseType> {
        const copy = this.convert(local);
        return this.http.put<Local>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Local>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    getAll(): Observable<HttpResponse<Local[]>> {
        return this.http.get<Local[]>(this.resourceUrl, { observe: 'response' })
            .map((res: HttpResponse<Local[]>) => this.convertArrayResponse(res));
    }

    getByDistance(lat: number, lng: number, distance: number): Observable<HttpResponse<Local[]>> {
        const params = new HttpParams()
            .set('lat', lat.toString())
            .set('lng', lng.toString())
            .set('distance', distance.toString());
        return this.http.get<Local[]>(`${this.resourceUrl}/distance`, { observe: 'response', params })
            .map((res: HttpResponse<Local[]>) => this.convertArrayResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Local[]>> {
        const options = createRequestOption(req);
        return this.http.get<Local[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Local[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<Local[]>> {
        const options = createRequestOption(req);
        return this.http.get<Local[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Local[]>) => this.convertArrayResponse(res));
    }

    findByComercio(id: number): Observable<HttpResponse<Local[]>> {
        return this.http.get<Local[]>(`${this.resourceUrl}/comercios/${id}`, { observe: 'response' })
            .map((res: HttpResponse<Local[]>) => this.convertArrayResponse(res));
    }

    findByNombre(nombre: string): Observable<EntityResponseType> {
        return this.http.get<Local>(`${this.resourceUrl}/nombre/${nombre}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Local = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<Local[]>): HttpResponse<Local[]> {
        const jsonResponse: Local[] = res.body;
        const body: Local[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to Local.
     */
    private convertItemFromServer(local: Local): Local {
        const copy: Local = Object.assign({}, local);
        copy.fechaCreacion = this.dateUtils
            .convertLocalDateFromServer(local.fechaCreacion);
        return copy;
    }

    /**
     * Convert a Local to a JSON which can be sent to the server.
     */
    private convert(local: Local): Local {
        const copy: Local = Object.assign({}, local);
        copy.fechaCreacion = this.dateUtils
            .convertLocalDateToServer(local.fechaCreacion);
        return copy;
    }
}
