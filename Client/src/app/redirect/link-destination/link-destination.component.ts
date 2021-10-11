import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { LinkDataService } from '../../link/link-data.service';
import { Link } from '../../link/link.model';

@Component({
  selector: 'app-link-destination',
  templateUrl: './link-destination.component.html',
  styleUrls: ['./link-destination.component.css']
})
export class LinkDestinationComponent implements OnInit {
  public link!: Link;
  
  constructor(
    private route: ActivatedRoute,
    private _linkDataService: LinkDataService
  ) {}


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this._linkDataService.addClickDate(id+"");
    this._linkDataService
      .getLink$(id+"")
      .subscribe((x) => (window.location.href = x.destination));
    }

}
