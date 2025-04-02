import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'; 


@Component({
  selector: 'app-user-create',
  standalone: true,
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  imports: [ReactiveFormsModule, CommonModule,MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,]
})
export class UserCreateComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }
// Método para validar el formulario
  onSubmit(): void {
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value).subscribe(
        (response) => {
          console.log('Usuario creado exitosamente:', response);
          this.userForm.reset(); // Limpia el formulario después de enviarlo
          alert('Usuario creado exitosamente');
        },
        (error) => {
          console.error('Error al crear usuario:', error);
          alert('Ocurrió un error al crear el usuario');
        }
      );
    }
  }
}
