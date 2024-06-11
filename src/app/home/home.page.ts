import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonAvatar, IonInput } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonInput, IonAvatar, IonIcon, IonButton, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  constructor(private router: Router) {}

  inputNickName: string = '';  

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

  numAvatar:number = 0
  initAvatar:string= this.listAvatars[0]

  ingresarApp(){
    this.router.navigate(['/menu']);
  }

  nextAvatar(){
    if (this.numAvatar < this.listAvatars.length - 1){
      this.numAvatar = this.numAvatar + 1
      this.initAvatar = this.listAvatars[this.numAvatar]
    }
  }

  backAvatar(){
    if (this.numAvatar > 0){
      this.numAvatar = this.numAvatar - 1
      this.initAvatar = this.listAvatars[this.numAvatar]
    }
  }

}
