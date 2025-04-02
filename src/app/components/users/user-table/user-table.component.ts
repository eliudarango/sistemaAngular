import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../../../models/user';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterModule],
})
export class UserTableComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];

  constructor(private userService: UserService) {}
  // Método para inicializar el componente
  ngOnInit(): void {
    this.loadUsers();
  }
  // Método para cargar los usuarios
  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    );
  }
  // Metodo para eliminar un usuario
  deleteUser(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.userService.deleteUser(id).subscribe(
        () => {
          console.log('Usuario eliminado exitosamente');
          this.users = this.users.filter((user: any) => user.id !== id);
          alert('Usuario eliminado exitosamente');
        },
        (error) => {
          console.error('Error al eliminar usuario:', error);
          alert('Ocurrió un error al eliminar el usuario.');
        }
      );
    }
  }
}
