import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {
  
  clientes: any[]=[];
  constructor(firestore: AngularFirestore, private _clienteService: ClienteService, private toastr: ToastrService) { }
  
  ngOnInit(): void {
    this.getClientes();
  }
  getClientes(){
    
    this._clienteService.getClientes().subscribe(data=>{
      this.clientes=[];
      data.forEach((element:any) => {
        this.clientes.push({
          id:element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    })
  }
  eliminarClientes(id:string){
    this._clienteService.eliminarCliente(id).then(()=>{
      this.toastr.info("Cliente eliminado con éxito", "Cliente Eliminado", {
        timeOut: 2500,positionClass: 'toast-bottom-right'});
    }).catch(error => {
      console.log(error);
    })
  }

}
