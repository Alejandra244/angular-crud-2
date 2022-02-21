import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  crearCliente: FormGroup;
  guardado = false;
  loading=false;
  id: string | null="";
  titulo="Registrar Cliente";
  
  
  constructor(private fb:FormBuilder, private _clienteService:ClienteService, 
    private router:Router, private toastr: ToastrService,
    private aRout:ActivatedRoute) 
  {
    this.crearCliente= this.fb.group({
      nombre:['', [Validators.required, Validators.minLength(5)]],
      direccion:['', [Validators.required, Validators.minLength(10)]],
      telefono:['', [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9]*')]]
    })
    this.id= this.aRout.snapshot.paramMap.get("id");
    
   }
  
  ngOnInit(): void {
    this.editarCliente();
  }
   
  agregarCliente(){
    if(this.id!= null)
    {
      this.loading=true;
      const cliente:any={
        nombre : this.crearCliente.value.nombre,
        direccion: this.crearCliente.value.direccion, 
        telefono: this.crearCliente.value.telefono
      }
      this._clienteService.actualizarCliente(this.id,cliente ).then(()=>{
        this.loading=false;
        this.toastr.success("Cliente actualizado con éxito", "Cliente Actualizado", {timeOut: 2000,positionClass: 'toast-bottom-right'});
        this.router.navigate(["/lista-clientes"])
      })
      
    }

    else{
      this.guardado=true;
    if(this.crearCliente.invalid)
    {
      return;
    }
    const cliente:any={
      nombre : this.crearCliente.value.nombre,
      direccion: this.crearCliente.value.direccion, 
      telefono: this.crearCliente.value.telefono
    }
    this.loading=true;
    this._clienteService.agregarCliente(cliente).then(()=>{
      this.toastr.success("Nuevo cliente registrado con éxito", "Cliente Registrado", {timeOut: 2000,positionClass: 'toast-bottom-right'});
      this.router.navigate(["/lista-clientes"])
    }).catch(error => {
      console.log(error);
      this.loading=false;
    })
    }  
  }
  editarCliente(){
    if(this.id!=null)
    {
      this.loading=true;
      this._clienteService.getCliente(this.id).subscribe(data=>{
        this.loading=false;
        this.titulo="Editar Cliente";
        //data.payload.doc.data()
        this.crearCliente.setValue({
          nombre: data.payload.data()["nombre"],
          direccion: data.payload.data()["direccion"],
          telefono: data.payload.data()["telefono"]
        })
      })
    }
  }

}
