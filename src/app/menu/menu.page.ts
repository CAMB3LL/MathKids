import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonAvatar,
  IonIcon,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AppStateService } from '../app-state.service'; // Importa el servicio de estado
import { Subscription } from 'rxjs';

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
    IonIcon,
  ],
})
export class MenuPage implements OnInit, OnDestroy {
  operacion: string | null | undefined;
  private livesSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private appStateService: AppStateService,
    private toastController: ToastController
  ) {}

  name: string = 'Invitado';
  avatarSel: string = '';
  level: number = 0;
  lives: number = 0;
  score: number = 0;

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color: 'warning',
      cssClass: 'custom-toast',
    });
    await toast.present();
  }

  ngOnInit() {
    this.name = this.appStateService.getState('nickname');
    this.avatarSel = this.appStateService.getState('avatar');
    this.level = this.appStateService.getState('level');
    this.score = this.appStateService.getState('score');

    this.livesSubscription = this.appStateService.state$.subscribe((state) => {
      this.lives = state.lives;
      this.level = state.level;
      this.score = state.score;
    });
  }

  ngOnDestroy() {
    if (this.livesSubscription) {
      this.livesSubscription.unsubscribe();
    }
  }

  ingresarDetalle(operacion: string) {
    const nivelOperacion: Record<string, number> = {
      suma: 0,
      resta: 1,
      multiplicacion: 2,
      division: 3,
    };

    if (!(operacion in nivelOperacion)) {
      this.presentToast('Operación no válida');
      return;
    }

    if (this.level < nivelOperacion[operacion]) {
      this.presentToast('Aun no tienes el nivel para ingresar a esta leccion');
    } else if (this.level > nivelOperacion[operacion]) {
      this.presentToast('Ya has realizado esta leccion');
    } else {
      this.router.navigate(['/detail', operacion]);
    }
  }

  Salir() {
    this.appStateService.setState('nickname', '');
    this.appStateService.setState('avatar', '');
    this.appStateService.setState('level', 0);
    this.appStateService.setState('lives', 3);
    this.router.navigate(['/home']);
  }
}
