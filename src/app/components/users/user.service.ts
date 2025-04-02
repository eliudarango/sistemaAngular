import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // URL de la API
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}
  // Metodo para obtener todos los usuarios
  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error de conexión:', error);
        return throwError(() => new Error());
      })
    );
  }
  // Metodo para crear un usuario
  createUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user).pipe(
      catchError((error) => {
        console.error('Error al crear usuario:', error);
        return throwError(() => new Error('Error al crear usuario'));
      })
    );
  }
  // Metodo para obtener un usuario por ID
  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?id=${id}`).pipe(
      catchError((error) => {
        console.error('Error al obtener usuario por ID:', error);
        return throwError(() => new Error('Error al obtener usuario por ID'));
      })
    );
  }
  // Metodo para actualizar un usuario
  updateUser(id: string, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}?id=${id}`, user).pipe(
      catchError((error) => {
        console.error('Error al actualizar usuario:', error);
        return throwError(() => new Error('Error al actualizar usuario'));
      })
    );
  }
  // Metodo para eliminar un usuario
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}?id=${id}`).pipe(
      catchError((error) => {
        console.error('Error al eliminar usuario:', error);
        return throwError(() => new Error('Error al eliminar usuario'));
      })
    );
  }
}
