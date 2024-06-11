import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';

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
  ],
})
export class DetailPage implements OnInit {
  operacion: string | null | undefined;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.operacion = this.route.snapshot.paramMap.get('operacion');
  }

  goBack() {
    this.router.navigate(['/menu']);
  }
}
