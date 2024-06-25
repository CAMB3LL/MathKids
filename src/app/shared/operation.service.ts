import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { AppStateService } from '../app-state.service';

@Injectable({
  providedIn: 'root',
})
export class OperationService {
  private gameFinishedSubject = new Subject<'WIN' | 'LOST'>();
  gameFinished$ = this.gameFinishedSubject.asObservable();

  questions: { a: number; b: number }[] = [];
  currentQuestionIndex = 0;
  answer: number | null = null;

  constructor(
    private appStateService: AppStateService,
    private toastController: ToastController
  ) {
    this.generateQuestions();
  }

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

  generateQuestions() {
    this.questions = Array.from({ length: 2 }, () => ({
      a: Math.floor(Math.random() * 10),
      b: Math.floor(Math.random() * 10),
    }));
  }

  checkAnswer(
    calculateCorrectAnswer: (question: { a: number; b: number }) => number
  ) {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    const correctAnswer = calculateCorrectAnswer(currentQuestion);

    if (this.answer === correctAnswer) {
      const currentScore = this.appStateService.getState('score');
      this.appStateService.setState('score', currentScore + 1);
      this.nextQuestion();
    } else {
      this.appStateService.setState(
        'lives',
        this.appStateService.getState('lives') - 1
      );
      this.presentToast('Respuesta incorrecta');

      if (this.appStateService.getState('lives') <= 0) {
        this.gameFinishedSubject.next('LOST');
        return;
      }
    }

    if (this.currentQuestionIndex >= this.questions.length) {
      const currentLevel = this.appStateService.getState('level');
      this.appStateService.setState('level', currentLevel + 1);
      this.gameFinishedSubject.next('WIN');
    }
  }

  nextQuestion() {
    this.answer = null;
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex >= this.questions.length) {
      this.gameFinishedSubject.next('WIN');
    }
  }

  restartGame() {
    this.currentQuestionIndex = 0;
    this.generateQuestions();
  }
}
