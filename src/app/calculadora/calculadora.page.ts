import { Component, OnInit, ViewChild, ElementRef, Renderer2} from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.page.html',
  styleUrls: ['./calculadora.page.scss'],
})

export class CalculadoraPage implements OnInit {

  @ViewChild('display')
  private display: ElementRef;

  nombreBoton = 'CE';
  colorBoton = 'warning';
  estadoBoton;

  constructor(public alertCtrl: AlertController, private renderer: Renderer2) {  }

  ngOnInit() {
  }

  escribir(num: string) {
    const Display = this.display.nativeElement;

    if ( Display.innerText === '0') {
      Display.innerText = '';
      Display.innerText = Display.innerText + num;
    } else {
      Display.innerText = Display.innerText + num;
    }

    if (Display.innerText.length >= 10) {
      this.renderer.addClass(Display, 'scroll');
    } else {
      this.renderer.removeClass(Display, 'scroll');
    }

  }

  operacion(op: string) {
    const Display = this.display.nativeElement;

    if (op === '+') {
      Display.innerText = Display.innerText + '+';
    } else if (op === '-') {
      Display.innerText = Display.innerText + '-';
    } else if (op === '*') {
      Display.innerText = Display.innerText + '*';
    } else if (op === '/') {
      Display.innerText = Display.innerText + '/';
    } else if (op === '=') {
      Display.innerText = this.resolver(Display.innerText);
    }
  }

  resolver(display: string) {

    let resultado = null;

    try {
      resultado = new Function('return ' + display)();
    } catch (error) {

      resultado = display;

      this.alertCtrl.create({
        header: '¡Error!',
        subHeader: 'Error de sintáxis',
        message: 'Por favor revise la operación ingresada',
        buttons: ['OK']
      }).then(a => {
        a.present();
      });
    }

    return resultado;
  }

  borrar() {
    const Display = this.display.nativeElement;

    if (this.nombreBoton === 'AC') {
      Display.innerText = '0';

    } else {
      if (Display.innerText.length > 1) {
        Display.innerText = Display.innerText.substring(0, Display.innerText.length - 1);
      } else {
        Display.innerText = '0';
      }
    }

  }

  cambioToggle($event) {

    if ($event) {
      this.colorBoton = 'danger';
      this.nombreBoton = 'AC';
    } else {
      this.colorBoton = 'warning';
      this.nombreBoton = 'CE';
    }

   }


}
