import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'; 
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-user-edit',
  standalone: true,
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  imports: [ReactiveFormsModule, CommonModule,MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,]
})
export class UserEditComponent implements OnInit {
  userForm: FormGroup;
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }
// Método para inicializar el componente
  ngOnInit(): void {
    // Obtener el ID del usuario desde la URL
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe(
        (user) => {
          this.userForm.patchValue(user); // Rellenar el formulario con los datos del usuario
        },
        (error) => {
          console.error('Error al obtener el usuario:', error);
          alert('No se pudo cargar el usuario.');
        }
      );
    }
  }
// Método para validar el formulario
  onSubmit(): void {
    if (this.userForm.valid && this.userId) {
      this.userService.updateUser(this.userId, this.userForm.value).subscribe(
        (response) => {
          console.log('Usuario actualizado exitosamente:', response);
          alert('Usuario actualizado exitosamente');
          this.router.navigate(['/users']); // Redirigir a la lista de usuarios
        },
        (error) => {
          console.error('Error al actualizar usuario:', error);
          alert('Ocurrió un error al actualizar el usuario.');
        }
      );
    }
  }
}
