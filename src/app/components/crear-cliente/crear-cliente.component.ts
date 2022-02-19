import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  crearCliente: FormGroup;
  guardado = false;
  
  constructor(private fb:FormBuilder) 
  {
    this.crearCliente= this.fb.group({
      nombre:['', [Validators.required, Validators.minLength(5)]],
      direccion:['', [Validators.required, Validators.minLength(10)]],
      telefono:['', [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9]*')]]
    })

   }
  
  ngOnInit(): void {}
   
  agregarCliente(){
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
    console.log(cliente);
  }
  

}
