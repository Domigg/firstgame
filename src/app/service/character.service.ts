import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  xPos: number;
  yPos: number;
  image: string;
  deplacement: number;
  xPosGhost: number;
  yPosGhost: number;
  imageGhost: string;

  constructor() {
    this.deplacement = 1;
   }

  moveUp(): void {
    this.yPos -= this.deplacement;
    this.xPosGhost += this.deplacement;
  }

  moveDown(): void {
    this.yPos += this.deplacement;
    this.xPosGhost -= this.deplacement;
  }

  moveLeft(): void {
    this.xPos -= this.deplacement;
    this.yPosGhost -= this.deplacement;
  }

  moveRight(): void {
    this.xPos += this.deplacement;
    this.yPosGhost += this.deplacement;
  }
}
