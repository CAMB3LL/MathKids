import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonAvatar } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonAvatar, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MenuPage implements OnInit {

  id:number = 0;
  name:string = 'Invitado';
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
      this.id = parseInt( params.get('param1') || 'default1', 10);
      this.name =  params.get('param2') || 'default2';
      this.avatarSel = this.listAvatars[this.id];
    });
  }

  Salir(){
    this.router.navigate(['/home']);
  }

}
