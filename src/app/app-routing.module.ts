import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTableComponent } from './components/users/user-table/user-table.component'; 
import { UserCreateComponent } from './components/users/user-create/user-create.component'; 
import { UserEditComponent } from './components/users/user-edit/user-edit.component'; 



// Definición de las rutas de la aplicación
const routes: Routes = [
  { path: '', component: UserTableComponent },
  { path: 'users/create', component: UserCreateComponent }, 
  { path: 'users/edit/:id', component: UserEditComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
