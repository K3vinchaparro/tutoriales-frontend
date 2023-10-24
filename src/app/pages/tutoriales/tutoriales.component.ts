import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login-service.service';
import { TutorialServiceService } from 'src/app/services/tutorial-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tutoriales',
  templateUrl: './tutoriales.component.html',
  styleUrls: ['./tutoriales.component.css']
})
export class TutorialesComponent implements OnInit {

  tutoriales: any = [];
  comentariosDeTutorial: any = [];
  comentariosDeUsuario: any = [];
  comentariosDeTutorialSinUsuario: any = [];
  user: any;
  tutorialAbierto: any
  modoVideo = false
  comentarioForm!: FormGroup;
  estaEditarComentario = false
  comentarioAEditar: any

  constructor(
    private tutorialService: TutorialServiceService,
    public loginService: LoginService,
    public fg: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    this.tutorialService.obtenerTodosLosTutoriales().subscribe(value => {
      this.tutoriales = value
    })

    this.comentarioForm = this.fg.group({
      comentario: [''],
    })


  }

  abrirTutorial(item: any) {
    this.tutorialAbierto = item
    this.tutorialService.obtenerComentariosDeTutorial(this.tutorialAbierto.idTutorial).subscribe(res => {
      this.comentariosDeTutorial = res
    })

    this.modoVideo = true;
  }

  guardarComentario() {
    const comentarioValue = this.comentarioForm.get('comentario')?.value;
    const comentario = {
      contenido: comentarioValue,
      tutorial: {
        idTutorial: this.tutorialAbierto.idTutorial
      },
      "usuario": {
        "idUsuario": this.user.idUsuario,
        "nombres": this.user.nombres,
        "rol": {
          "idRol": this.user.rol.idRol,
          "nombreRol": this.user.rol.nombreRol
        }
      }
    }

    this.tutorialService.agregarComentarioATutorial(comentario).subscribe(res => {
      Swal.fire("Comentario guardado", "Comentario registrado con exito en el sistema", "success");
      this.comentariosDeTutorial.push(comentario);
      this.comentarioForm.reset()
    })

  }

  eliminarComentario(idComentario: any) {
    this.tutorialService.eliminarComentario(idComentario).subscribe(res => {
      const index = this.comentariosDeTutorial.findIndex((comentario: { idComentario: any; }) => comentario.idComentario === idComentario);

      if (index !== -1) {
        this.comentariosDeTutorial.splice(index, 1);
      }
    });
  }

  editarComentario(){
    this.estaEditarComentario = true;
    const comentarioValue = this.comentarioForm.get('comentario')?.value;
    const comentario = {
      "idComentario" : this.comentarioAEditar.idComentario,
      "contenido" : comentarioValue,
    }

    this.tutorialService.editarComentario(comentario).subscribe(res=>{
      Swal.fire("Comentario editado", "Comentario editado con exito en el sistema", "success");
      this.tutorialService.obtenerComentariosDeTutorial(this.tutorialAbierto.idTutorial).subscribe(res=>{
        this.comentariosDeTutorial = res
      })
      this.estaEditarComentario = false;
      this.comentarioForm.reset()
    })
  }

  editar(comentario: any) {
    this.comentarioAEditar = comentario

    this.estaEditarComentario = true
    this.comentarioForm.setValue({
      comentario: comentario.contenido
    });
  }
  

}
