import { Component, Input, OnInit } from '@angular/core';
import { Clickdate } from '../clickdate.model';

@Component({
  selector: 'app-clickdate',
  templateUrl: './clickdate.component.html',
  styleUrls: ['./clickdate.component.css']
})
export class ClickdateComponent implements OnInit {
  @Input()
  clickDate!: Clickdate;

  constructor() {
   }

  ngOnInit(): void {
  }

}
