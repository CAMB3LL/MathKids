import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonAvatar,
  IonIcon,
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { AppStateService } from '../app-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
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
export class ResultPage implements OnInit, OnDestroy {
  operacion: string | null | undefined;
  private livesSubscription: Subscription | undefined;

  result: 'WIN' | 'LOST' = 'LOST';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appStateService: AppStateService
  ) {}

  name: string = 'Invitado';
  avatarSel: string = '';
  level: number = 0;
  lives: number = 0;
  score: number = 0;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.result = params.get('result') as 'WIN' | 'LOST';
    });

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

  goBack() {
    this.router.navigate(['/menu']);
  }

  Salir() {
    this.appStateService.setState('nickname', '');
    this.appStateService.setState('avatar', '');
    this.appStateService.setState('level', 0);
    this.appStateService.setState('lives', 3);
    this.appStateService.setState('score', 0);
    this.router.navigate(['/home']);
  }
}
