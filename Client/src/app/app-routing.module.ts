import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinkDestinationComponent } from './redirect/link-destination/link-destination.component';
import { MostClickedListComponent } from './link/most-clicked-list/most-clicked-list.component';

const appRoutes: Routes = [
  
  
  { path: ':id', component: LinkDestinationComponent},{ 
    path: 'link',
    loadChildren: () => import ('./link/link.module').then(mode => mode.LinkModule)
  },
  { 
    path: 'account',
    loadChildren: () => import ('./user/user.module').then(mode => mode.UserModule)
  },
  {
    path: "**",
    component: MostClickedListComponent
  }
  
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
