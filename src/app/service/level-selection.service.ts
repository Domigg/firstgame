import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LevelSelectionService {
  currentLevel: number;
  constructor() {
    this.currentLevel = 2;
   }
}
