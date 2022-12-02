import { Observable, pipe } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Funcionarios } from 'src/app/models/Funcionarios';

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {

  departamentoFuncUrl = 'https://localhost:7029/v1/departamento/func';
  funcionariosApiUrl = 'https://localhost:7029/v1/funcionario';
  putApiUrl = 'https://localhost:7029/v1/funcionario/'
  
  constructor(private http: HttpClient) { }

  getAll(): Observable<Funcionarios[]> {
    return this.http.get<Funcionarios[]>(`${this.funcionariosApiUrl}/`)
  }

  getDepartamento(id: number): Observable<Funcionarios[]>{
    return this.http.get<Funcionarios[]>(`${this.departamentoFuncUrl}/${id}`);
  }

  createFuncionario(element: Funcionarios): Observable<Funcionarios> {
    return this.http.post<Funcionarios>(`${this.funcionariosApiUrl}/`, element);
  }
 
  editFuncionario(id:number, element: Funcionarios): Observable<Funcionarios> {
    return this.http.put<any>(`${this.funcionariosApiUrl}/${id}`, element);
  }
  // updateFuncionario(element: Funcionarios) {
  //   return this.http.put(`${this.departamentoFuncUrl}/${element}`);
  // }

  deleteFuncionario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.funcionariosApiUrl}/${id}`);
  
  }

}
