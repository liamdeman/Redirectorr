import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LinkDataService } from '../link-data.service';
import { Link } from '../link.model';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css']
})
export class LinkListComponent implements OnInit {
  private _fetchLinks$!: Observable<Link[]>;
  public errorMessage!: string;

  constructor(private _linkDataService: LinkDataService ) {
   
   }

  get linksFromCurrentUser$(): Observable<Link[]>{
    return this._fetchLinks$;
    
  }


  ngOnInit(): void {
    this._fetchLinks$ = this._linkDataService.linksFromCurrentUser$.pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );
  }
}
