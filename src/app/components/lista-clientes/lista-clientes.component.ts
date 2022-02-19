import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {
  clientes: Observable<any[]>;
  constructor(firestore: AngularFirestore) 
  { 
    this.clientes = firestore.collection('clientes').valueChanges();
  }
  
  ngOnInit(): void {
  }

}
