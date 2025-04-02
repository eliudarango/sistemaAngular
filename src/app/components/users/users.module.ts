import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { UserCreateComponent } from './user-create/user-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserEditComponent } from './user-edit/user-edit.component'; 

@NgModule({
  declarations: [   
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [UserService],
})
export class UsersModule { }