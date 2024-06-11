import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonAvatar } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
  standalone: true,
  imports: [IonAvatar, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class GamePage implements OnInit {

  id:number = 0;
  name:string = 'Invitado';
  oper:string = 'sum';
  avatarSel:string= '';
  listAvatars:string[] = [
    '../../assets/img/batman.png',
    '../../assets/img/aguacate.png',
    '../../assets/img/alien.png',
    '../../assets/img/cactus.png',
    '../../assets/img/cafe.png',
    '../../assets/img/niño.png',
    '../../assets/img/niño2.png',
    '../../assets/img/niño3.png',
    '../../assets/img/nativo.png',
    '../../assets/img/niña.png',
    '../../assets/img/niña2.png',
    '../../assets/img/oveja.png',
    '../../assets/img/perezoso.png',
    '../../assets/img/zombie.png'
  ]

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = parseInt( params.get('id') || 'default1', 10);
      this.name =  params.get('name') || 'default2';
      this.oper =  params.get('oper') || 'default3';
      this.avatarSel = this.listAvatars[this.id];
    });
  }
  
}
