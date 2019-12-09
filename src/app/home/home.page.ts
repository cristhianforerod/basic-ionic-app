import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  items = [
    {
      src: '../../assets/img/calculator.png',
      route: '/calculadora',
      name: 'Calculadora'
    },
    {
      src: '../../assets/img/man.png',
      route : '/perfil',
      name : 'Perfil'
    }
  ];

  constructor() {}

}
