import { Component, Input, OnInit } from '@angular/core';
import { LinkDataService } from '../link-data.service';
import { Link } from '../link.model';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {
  @Input()
  public link!: Link;
  public domain: string = "";

  constructor(private _linkDataService: LinkDataService) {}

  ngOnInit(): void {
    this.domain = document.location.hostname;
  }

  deleteLink(){
    this._linkDataService.deleteLink(this.link)
  }

}
