import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ComponentFixtureNoNgZone } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LinkDataService } from '../link-data.service';
import { Link } from '../link.model';



@Component({
  selector: 'app-add-link',
  templateUrl: './add-link.component.html',
  styleUrls: ['./add-link.component.css']
})
export class AddLinkComponent implements OnInit {
  public link!: FormGroup;
  public errorMessage: string ='';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _linkDataService: LinkDataService
  ){}


  ngOnInit(): void {
    this.link = this.fb.group({
      linkExtension: ['', Validators.required],
      destination: ['',Validators.required]
    });
  }

  onSubmit(){
    console.log(this.link.value.destination);
    console.log(this.link.value.linkExtension);

    this._linkDataService.addNewLink(new Link(this.link.value.linkExtension, this.link.value.destination))
    .subscribe(
      (val) => {
        if (val) {
          this.router.navigate(['/link/list']);
        } else {
          this.errorMessage = `Could not create Link`;
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        if (err.error instanceof Error) {
          this.errorMessage = `Error while trying to login user ${this.link?.value.linkExtension}: ${err.error.message}`;
        } else {
          this.errorMessage = `Error ${err.status} while trying to login user ${this.link?.value.destination}: ${err.error}`;
        }
      }
    );
  }


};
