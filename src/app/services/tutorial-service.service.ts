import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class TutorialServiceService {

  constructor(private http: HttpClient) { }

  public obtenerTodosLosTutoriales(): Observable<any>{
    return this.http.get(`${baseUrl}/tutorial/listar/`);
  }

  public crearTutorial(formData: FormData):Observable<any>{
    return this.http.post(`${baseUrl}/tutorial/guardar/`, formData)
  }

  public eliminarTitulo(idTitulo:any):Observable<any>{
    return this.http.delete(`${baseUrl}/tutorial/eliminar/`+idTitulo)
  }

  public obtenerComentariosDeTutorial(idTutorial:any):Observable<any>{
    return this.http.get(`${baseUrl}/comentario/listarPorTutorial/`+idTutorial);
  }

  public obtenerComentariosDeTutorialDelUsuario(idUsuario:any,idTutorial:any):Observable<any>{
    return this.http.get(`${baseUrl}/comentario/listarPorTutorialYUsuario/`+idUsuario+"/"+idTutorial);
  }

  public agregarComentarioATutorial(comentario:any):Observable<any>{
    return this.http.post(`${baseUrl}/comentario/guardar/`, comentario)
  }

  public eliminarComentario(idComentario:any):Observable<any>{
    return this.http.delete(`${baseUrl}/comentario/eliminar/`+idComentario)
  }

  public editarComentario(comentario:any):Observable<any>{
    console.log(comentario)
    return this.http.put(`${baseUrl}/comentario/editar/`, comentario)
  }
}
