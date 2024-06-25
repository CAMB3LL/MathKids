import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

type StateDto = {
  nickname: string;
  avatar: string;
  level: number;
  lives: number;
  score: number;
};

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private state: StateDto = {
    nickname: '',
    avatar: '',
    level: 0,
    lives: 3,
    score: 0,
  };

  // Subject for state changes
  private stateSubject = new BehaviorSubject<StateDto>(this.state);

  state$: Observable<StateDto> = this.stateSubject.asObservable();

  setState<K extends keyof StateDto>(key: K, value: StateDto[K]): void {
    this.state[key] = value;
    this.stateSubject.next({ ...this.state });
  }

  getState<K extends keyof StateDto>(key: K): StateDto[K] {
    return this.state[key];
  }
}
