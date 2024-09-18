import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  public registros = [{
    'id': 1,
    'titulo' : 'Etapa 1',
    'descripcion' : 'Lorem ipsun',
    'entregable' : 'repositorio',
    'fecha_inicio' : '2024-01-04',
    'fecha_fin' : '2024-01-10',
  }];

  ngOnInit(): void {
    localStorage.setItem('etapas', JSON.stringify(this.registros));
  }
  
}
