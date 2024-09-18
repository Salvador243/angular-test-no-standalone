import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent {  
  public showDatos = true;
  public showPlan = false;

  public changeTab(): void {
    this.showDatos = !this.showDatos;
    this.showPlan = !this.showPlan;
  }
}
