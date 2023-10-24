import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TutorialServiceService } from 'src/app/services/tutorial-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  fotos: any = [];
  tutoriales: any = [];
  user: any;
  tutorialForm!: FormGroup;

  constructor(
    public loginService: LoginService,
    public fg: FormBuilder,
    private tutorialService: TutorialServiceService,
    private router: Router, private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.tutorialForm = this.fg.group({
      titulo: [''],
      descripcion: [''],
    })

    this.user = this.loginService.getUser();
    this.tutorialService.obtenerTodosLosTutoriales().subscribe(value=>{
      console.log(value)
      this.tutoriales = value
    })
  }

  guardarTutorial(){

    try{
      const formularioDeDatos = new FormData();
      this.fotos.forEach((archivo: any) => {
        formularioDeDatos.append('foto', archivo) 
      })

      formularioDeDatos.append(
        'tutorial', new Blob([JSON
          .stringify(this.tutorialForm.value)], {
          type: 'application/json',
        }));


        this.tutorialService.crearTutorial(formularioDeDatos).subscribe(res =>{
          Swal.fire("Tutorial guardado", "Tutorial registrado con exito en el sistema", "success");
          setTimeout(() => {
            window.location.reload()
          }, 1000);
        }, err =>{

        })
    }catch(e){

    }

  }

  eliminarTitulo(idTitulo:any){
    Swal.fire({
      text: '¿Estás seguro de borrar el titulo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si'
    }).then((res)=>{
      this.tutorialService.eliminarTitulo(idTitulo).subscribe(res=>{

      })
      window.location.reload()
    })
  }

  obtenerFoto(event: any) {
    const foto = event.target.files[0];
    this.extraerBase64(foto).then((imagen: any) => {
      Swal.fire({
        title: 'Imagen seleccionada',
        imageUrl: imagen.base,
        imageWidth: 400,
        imageHeight: 250,
        width: 420,
        heightAuto: true,
        color: '#181818',
        imageAlt: 'Custom image',
        confirmButtonText: 'Vale',
        confirmButtonColor: '#0d6efd',
      })
    });
    this.fotos = [];
    this.fotos.push(foto);
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject): any | any => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
    } catch (e) {
      return null;
    }
  })
}
