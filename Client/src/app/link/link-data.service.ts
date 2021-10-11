import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, pipe, BehaviorSubject } from 'rxjs';
import { Link, LinkJson } from './link.model';
import {catchError, delay, map, switchMap, tap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LinkDataService {
  private _reloadLinks$ = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) { }


    getLink$(id: string): Observable<Link> {     
      return this.http
      .get<LinkJson>(`${environment.apiUrl}/Links/` + id)
      .pipe(catchError(this.handleError),
      map((Link.fromJSON)));
    }


        get linksFromCurrentUser$() : Observable<Link[]> {
      return this._reloadLinks$.pipe(
        switchMap(() => this.fetchLinksFromCurrentUser$())
      ); 
      }

    
    fetchLinksFromCurrentUser$() : Observable<Link[]> {    
   
    return this.http.get(`${environment.apiUrl}/Links/FromCurrentUser`).pipe(
      catchError(this.handleError),
      map((list: any): Link[] => list.map(Link.fromJSON))
    );
  }

    

    get links$() : Observable<Link[]> {
      return this._reloadLinks$.pipe(
        switchMap(() => this.fetchLinks$())
      ); 
      }

    
  fetchLinks$() : Observable<Link[]> {    
   
    return this.http.get(`${environment.apiUrl}/Links`).pipe(
      catchError(this.handleError),
      map((list: any): Link[] => list.map(Link.fromJSON))
    );
  }


    addNewLink(link: Link){
      console.log(link.toJSON());
      return this.http
        .post<LinkJson>(`${environment.apiUrl}/Links/`, link.toJSON())
        .pipe( catchError((x) => this.handleError(x)), map(Link.fromJSON))
        .pipe(
          catchError((err) => {
            return throwError(err);
          }),
          tap((link: Link) => {
            this._reloadLinks$.next(true);
          })
          
        );
        }

    addClickDate(id: string){
     
      return this.http
        .post(`${environment.apiUrl}/links/`+id+ '/clickdates' , null)
        .pipe( catchError((x) => this.handleError(x)))
        .subscribe();
    }

    deleteLink(link: Link){
      return this.http
      .delete(`${environment.apiUrl}/Links/${link.linkExtension}`)
      .pipe(tap(console.log), catchError(this.handleError))
      .pipe(
        catchError((err) => {
          return throwError(err);
        }),
        tap((link: Link) => {
          this._reloadLinks$.next(true);
        })
        
      )
      .subscribe();
      
    }

    handleError(err: any): Observable<never> {
      let errorMessage: string;
      if (err.error instanceof ErrorEvent) {
        errorMessage = `An error occurred: ${err.error.message}`;
      } else if (err instanceof HttpErrorResponse) {
        errorMessage = `'${err.status} ${err.statusText}' when accessing '${err.url}'`;
      } else {
        errorMessage = err;
      }
      console.error(err);
      return throwError(errorMessage);
    }
}
