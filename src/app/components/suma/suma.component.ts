import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { OperationService } from '../../shared/operation.service';

@Component({
  selector: 'app-suma',
  templateUrl: './suma.component.html',
  styleUrls: ['./suma.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class SumaComponent {
  constructor(
    public operationService: OperationService,
    private router: Router
  ) {
    this.operationService.restartGame();
    this.operationService.gameFinished$.subscribe((result: 'WIN' | 'LOST') => {
      this.onGameFinished(result);
    });
  }

  calculateCorrectAnswer(question: { a: number; b: number }): number {
    return question.a + question.b;
  }

  checkAnswer() {
    this.operationService.checkAnswer(this.calculateCorrectAnswer.bind(this));
  }

  onGameFinished(result: 'WIN' | 'LOST') {
    this.router.navigate(['/result', result]);
  }
}
