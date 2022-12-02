import { Funcionarios } from './../../models/Funcionarios';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departamentos } from 'src/app/models/Departamentos';


@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {
  departamentosApiUrl = 'https://localhost:7029/v1/departamento';
  constructor(private http: HttpClient) { }

getAll(): Observable<Departamentos[]> {
  return this.http.get<Departamentos[]>(`${this.departamentosApiUrl}/`)
}

getDepartamento(id: number): Observable<Funcionarios[]> {
  return this.http.get<Funcionarios[]>(`${this.departamentosApiUrl}/func/${id}`);

}
createDepartamento(element: Departamentos): Observable<Departamentos> {
  return this.http.post<Departamentos>(`${this.departamentosApiUrl}/`, element);
}

editDepartamento(id: number, element: Departamentos): Observable<Departamentos> {
  return this.http.put<Departamentos>(`${this.departamentosApiUrl}/${id}`, element)
}

deleteDepartamento(id: number): Observable<any> {
  return this.http.delete<any>(`${this.departamentosApiUrl}/${id}`);

}

}
