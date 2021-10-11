import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LinkDataService } from '../link-data.service';
import { Link } from '../link.model';



@Component({
  selector: 'app-most-clicked-list',
  templateUrl: './most-clicked-list.component.html',
  styleUrls: ['./most-clicked-list.component.css']
})
export class MostClickedListComponent implements OnInit {
  private _fetchLinks$!: Observable<Link[]>;
  public domain: string = "";
  public errorMessage!: string;

  constructor(private _linkDataService: LinkDataService) { }

  get links$(): Observable<Link[]>{
    return this._fetchLinks$;
  }

  
  ngOnInit(): void {
    
    this._fetchLinks$ = this._linkDataService.links$.pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );
    this.domain = document.location.hostname;
  }

}
