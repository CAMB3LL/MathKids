import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonAvatar,
  IonInput,
  IonIcon,
  ToastController,
} from '@ionic/angular/standalone';
import { AppStateService } from '../app-state.service'; // Importa el servicio de estado

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonInput,
    IonAvatar,
    IonIcon,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    FormsModule,
  ],
})
export class HomePage {
  constructor(
    private router: Router,
    private toastController: ToastController,
    private appStateService: AppStateService
  ) {}

  listAvatars: string[] = [
    '../../assets/img/av1.png',
    '../../assets/img/av2.png',
    '../../assets/img/av3.png',
    '../../assets/img/av4.png',
    '../../assets/img/av5.png',
    '../../assets/img/av6.png',
    '../../assets/img/av7.png',
    '../../assets/img/av8.png',
  ];

  inputNickName: string = '';
  numAvatar: number = 0;
  initAvatar: string = this.listAvatars[0];

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'danger',
    });
    await toast.present();
  }

  ingresarApp() {
    if (this.inputNickName.trim().length === 0) {
      this.presentToast('Por favor ingresa un NickName');
      return;
    }

    this.appStateService.setState('nickname', this.inputNickName);
    this.appStateService.setState('avatar', this.initAvatar);

    this.router.navigate(['/menu']);
  }

  nextAvatar() {
    if (this.numAvatar < this.listAvatars.length - 1) {
      this.numAvatar = this.numAvatar + 1;
      this.initAvatar = this.listAvatars[this.numAvatar];
    } else {
      this.numAvatar = 0;
      this.initAvatar = this.listAvatars[this.numAvatar];
    }
  }

  backAvatar() {
    if (this.numAvatar > 0) {
      this.numAvatar = this.numAvatar - 1;
      this.initAvatar = this.listAvatars[this.numAvatar];
    } else {
      this.numAvatar = this.listAvatars.length - 1;
      this.initAvatar = this.listAvatars[this.numAvatar];
    }
  }
}
