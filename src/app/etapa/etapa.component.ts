import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

declare var bootstrap: any;
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

  ngOnInit(): void {
    this.etapaForm = new FormGroup({
      id: new FormControl(0),
      titulo: new FormControl('12', Validators.required),
      descripcion: new FormControl('12122', Validators.required),
      entregable: new FormControl('asdas00'),
      fecha_inicio: new FormControl('2024-01-01', Validators.required),
      fecha_fin: new FormControl('2024-05-10', Validators.required),
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

  public changeTitle(title: string ): void{
    this.titleModal = title;
    document.getElementById('modalButtonMain')!.click()
  }

  public editar(id: number): void {
    const etapaById = this.etapas?.filter( element => element.id == id)[0];
    this.etapaForm.patchValue(etapaById!);
    this.changeTitle('Editar etapa');
  }

  public eliminar(id: number): void{
    this.etapas = this.etapas?.filter( element => element.id != id);
    this.saveData();
  }  
}
