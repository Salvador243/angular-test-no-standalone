import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface Etapas {
  id: number;
  titulo: string;
  descripcion: string;
  entregable: string;
  fecha_inicio: string;
  fecha_fin: string;
}

@Component({
  selector: 'app-etapa',
  templateUrl: './etapa.component.html',
  styleUrl: './etapa.component.scss'
})
export class EtapaComponent implements OnInit{
  public etapas?: Etapas[];
  public etapaForm!: FormGroup;
  private lastID: number = 0;
  public titleModal: string = '';
  public textButton: string = '';

  ngOnInit(): void {
    this.etapaForm = new FormGroup({
      id: new FormControl(null),
      titulo: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      entregable: new FormControl(''),
      fecha_inicio: new FormControl('', Validators.required),
      fecha_fin: new FormControl('', Validators.required),
    });
    this.loadData();
  }

  public resetForm(): void {
    this.etapaForm.reset();
  }

  private loadData () : void {
    this.etapas = JSON.parse(localStorage.getItem('etapas')!);
    this.etapas!.forEach(element => {
      this.lastID = (element.id > this.lastID) ? element.id : this.lastID; 
    });
  }

  public onSubmit(): void {
    if (this.etapaForm.valid) {
      const nuevaEtapa = this.etapaForm.value;
      const existID = this.etapaForm.value.id;

      if (existID) {
        const index = this.etapas?.findIndex(element => element.id == existID);
  
        if (index !== undefined && index !== -1) {
          this.etapas![index] = {
            ...nuevaEtapa,
            id: existID
          };
        }
      } else {
        this.lastID += 1;
        this.etapas?.push({
          ...nuevaEtapa,
          id: this.lastID,
        });
      }
      this.saveData();
      this.resetForm();
    } else {
      alert('Faltan campos obligatorios');
    }
  }

  public saveData(): void {
    localStorage.setItem('etapas', JSON.stringify(this.etapas));
  }

  public changeTitle(title: string, button: string): void{
    this.titleModal = title;
    this.textButton = button;
    document.getElementById('modalButtonMain')!.click()
  }

  public editar(id: number): void {
    const etapaById = this.etapas?.filter( element => element.id == id)[0];
    this.etapaForm.patchValue(etapaById!);
    this.changeTitle('Editar etapa', 'Modificar');
  }

  public eliminar(id: number): void{
    this.etapas = this.etapas?.filter( element => element.id != id);
    this.saveData();
  }  
}
