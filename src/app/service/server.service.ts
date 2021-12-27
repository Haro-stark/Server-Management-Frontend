import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Status } from '../enum/status.enum';
import { CustomResponse } from '../interface/custom-response';
import { Server } from '../interface/server';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  

  constructor(private http: HttpClient) { }
  private readonly apiUrl = 'http://localhost:8080';
  // Following is the typical way called as  'procedural appraoch'.
  // This is also a right way but we prefer to do with 'reative approach'because we use rxJS in angular
  // Thus, we will not use it here.
  /*
  getServers(): Observable<CustomResponse>{
    return this.http.get<CustomResponse>(`http://localhost:8080/server/list`);
  }
  */
  

  // if you want to define an observable you can put the $ symbol after the variable name.
  servers$ =  <Observable<never>>
    this.http.get<CustomResponse>(`${this.apiUrl}/server/list`)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );

    save$ = (server: Server) => <Observable<never>>
    this.http.post<CustomResponse>(`${this.apiUrl}/server/list`, server)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );

    ipAddress$ = (ipAddress: string) =>  <Observable<never>>
    this.http.get<CustomResponse>(`${this.apiUrl}/server/ping/${ipAddress}`)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );

    delete$ = (serverId: number) => <Observable<never>>
    this.http.delete<CustomResponse>(`${this.apiUrl}/server/delete/${serverId}`)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );

  
  
    filter$ = (status: Status, response: CustomResponse) => <Observable<CustomResponse>>
    new Observable<CustomResponse>(
      suscriber => {
        console.log(response);
        suscriber.next(
          status === Status.ALL ? {...response, message: `Servers filter with status ${status}`}
            : 
          {
            ...response,
            message : response.data.servers.filter(server => server.status).length>0 ?
             `Servers filtered by ${status === Status.SERVER_UP ? 
                  'SERVER UP' : 'SERVER DOWN' } status` : `No server of ${status} status found`
            ,
            data: {
              servers: response.data.servers
              .filter(server=> server.status===status)
            }
          }
        );
        suscriber.complete();
      }
    )
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );


    
    handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(`An error occured - Error Code ${error.status}`);
  }
}
