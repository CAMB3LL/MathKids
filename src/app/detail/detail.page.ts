import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { SumaComponent } from '../components/suma/suma.component';
import { RestaComponent } from '../components/resta/resta.component';
import { MultiplicacionComponent } from '../components/multiplicacion/multiplicacion.component';
import { DivisionComponent } from '../components/division/division.component';
import { AppStateService } from '../app-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonButton,
    IonToolbar,
    CommonModule,
    FormsModule,
    SumaComponent,
    RestaComponent,
    MultiplicacionComponent,
    DivisionComponent,
    IonAvatar,
  ],
})
export class DetailPage implements OnInit, OnDestroy {
  operacion: string | null | undefined;
  private livesSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appStateService: AppStateService
  ) {}

  name: string = '';
  avatarSel: string = '';
  lives: number = 0;
  level: number = 0;
  score: number = 0;

  ngOnInit() {
    this.operacion = this.route.snapshot.paramMap.get('operacion');
    this.name = this.appStateService.getState('nickname');
    this.avatarSel = this.appStateService.getState('avatar');
    this.level = this.appStateService.getState('level');
    this.score = this.appStateService.getState('score');

    // Subscribe to state changes
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

  onGameFinished(event: any) {
    console.log('Juego terminado: ', event);
  }
}
