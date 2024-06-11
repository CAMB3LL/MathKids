import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonAvatar,
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [
    IonAvatar,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class MenuPage implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  id: number = 0;
  name: string = 'Invitado';
  avatarSel: string = '';
  listAvatars: string[] = [
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
    '../../assets/img/zombie.png',
  ];

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = parseInt(params.get('id') || 'default1', 10);
      this.name = params.get('name') || 'default2';
      this.avatarSel = this.listAvatars[this.id];
    });
  }

  ingresarDetalle(operacion: string) {
    this.router.navigate(['/detail', operacion]);
  }

  Salir() {
    this.router.navigate(['/home']);
  }
}
