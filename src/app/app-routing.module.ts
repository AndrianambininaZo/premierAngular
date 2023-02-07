import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CustomersComponent } from './customers/customers.component';
import { AuthenticationGuard } from './gaurd/authentication.guard';
import { LoginComponent } from './login/login.component';
import { ProduitComponent } from './produit/produit.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"",component:LoginComponent},
  {path:"admin",component:AdminComponent,canActivate:[AuthenticationGuard],
  children:[
    
  {path:"produit",component:ProduitComponent},
  {path:"customers",component:CustomersComponent}

  ]},
  {path:"test",component:TestComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
