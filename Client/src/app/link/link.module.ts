import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickdateComponent } from './clickdate/clickdate.component';
import { LinkComponent } from './link/link.component';
import { MaterialModule } from '../material/material.module';
import { LinkListComponent } from './link-list/link-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AddLinkComponent } from './add-link/add-link.component';
import { LinkDestinationComponent } from '../redirect/link-destination/link-destination.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../user/auth.gaurd';
import { MostClickedListComponent } from './most-clicked-list/most-clicked-list.component';

const routes = [
  {
     path: 'list',
     canActivate: [ AuthGuard ],
     component: LinkListComponent
    },
  { 
    path: 'add',
   canActivate: [ AuthGuard ],
  component: AddLinkComponent
  },
  {
    path: 'mostClickedList',
    component: MostClickedListComponent
  }
];


@NgModule({
  declarations: [ClickdateComponent, LinkComponent, LinkListComponent, AddLinkComponent, LinkDestinationComponent, MostClickedListComponent],
  imports: [
    CommonModule, MaterialModule, HttpClientModule, ReactiveFormsModule, RouterModule.forChild(routes)
  ],
  exports: [LinkListComponent, AddLinkComponent, MostClickedListComponent]
})
export class LinkModule { }
