import { Component, OnInit, HostListener } from '@angular/core';
import { CharacterService } from 'src/app/service/character.service';
import { LevelSelectionService } from 'src/app/service/level-selection.service';
import { Level1Service } from 'src/app/service/level1.service';

@Component({
  selector: 'app-snow-level',
  templateUrl: './snow-level.component.html',
  styleUrls: ['./snow-level.component.scss']
})
export class SnowLevelComponent implements OnInit {

  keydown: boolean[];
  isPlayable: boolean;
  t: any[];
  deathCount: number;

  constructor(public characterService: CharacterService,
              public levelSelectionService: LevelSelectionService,
              public level1Service: Level1Service) {
    characterService.xPos = this.width / 2 - 13;
    characterService.yPos = this.height / 2 + 199;
    characterService.xPosGhost = this.width / 2 - 238;
    characterService.yPosGhost = this.height / 2 - 23;
    characterService.image = 'assets\\image\\linkup.png';
    this.keydown = [];
    this.t = [];
    this.keydown['KeyW'] = false;
    this.keydown['KeyA'] = false;
    this.keydown['KeyS'] = false;
    this.keydown['KeyD'] = false;
    this.deathCount = 0;
    this.isPlayable = true;
  }
  width = window.innerWidth;
  height = window.innerHeight;

  ngOnInit() {
    document.getElementById('next').addEventListener('click', this.nextLevel, false);
  }

  nextLevel(): void {
    console.log(true);
    console.log(this.levelSelectionService.currentLevel);
    this.levelSelectionService.currentLevel = 2;
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.levelSelectionService.currentLevel === 1) {
      // if (!this.isFocus) {
      //   this.isFocus = true;
      //   this.audioService.playSong();
      // }
      if (event.code === 'KeyW' || event.code === 'KeyA' || event.code === 'KeyS' || event.code === 'KeyD'
        || event.code === 'ArrowUp' || event.code === 'ArrowLeft' || event.code === 'ArrowRight' || event.code === 'ArrowDown') {
        if (!this.keydown[event.code]) {
          this.clearAllTimeout();
          if (this.isPlayable) {
            this.move(event);
            this.keydown[event.code] = true;
            switch (event.code) {
              case 'KeyW' :
              case 'ArrowUp': this.characterService.image = 'assets\\image\\movingup.gif';
                              this.characterService.imageGhost = 'assets\\image\\movingright.gif';
                              break;
              case 'KeyA' :
              case 'ArrowLeft': this.characterService.image = 'assets\\image\\movingleft.gif';
                                this.characterService.imageGhost = 'assets\\image\\movingup.gif';
                                break;
              case 'KeyS' :
              case 'ArrowDown': this.characterService.image = 'assets\\image\\movingdown.gif';
                                this.characterService.imageGhost = 'assets\\image\\movingleft.gif';
                                break;
              case 'KeyD' :
              case 'ArrowRight': this.characterService.image = 'assets\\image\\movingright.gif';
                                 this.characterService.imageGhost = 'assets\\image\\movingdown.gif';
                                 break;
            }
          }
        }
      }
    }
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    if (this.levelSelectionService.currentLevel === 1) {
      if (this.keydown[event.code]) {
        clearTimeout(this.t[event.code]);
        this.keydown[event.code] = false;
        switch (event.code) {
          case 'KeyW' :
            case 'ArrowUp':  this.characterService.image = 'assets\\image\\linkup.png';
                             this.characterService.imageGhost = 'assets\\image\\linkright.png';
                             break;
          case 'KeyA' :
          case 'ArrowLeft': this.characterService.image = 'assets\\image\\linkleft.png';
                            this.characterService.imageGhost = 'assets\\image\\linkup.png';
                            break;
          case 'KeyS' :
          case 'ArrowDown': this.characterService.image = 'assets\\image\\linkdown.png';
                            this.characterService.imageGhost = 'assets\\image\\linkleft.png';
                            break;
          case 'KeyD' :
          case 'ArrowRight': this.characterService.image = 'assets\\image\\linkright.png';
                             this.characterService.imageGhost = 'assets\\image\\linkdown.png';
                             break;
        }
      }
    }
  }

  clearAllTimeout(): void {
    if (this.keydown['KeyW']) {
      this.keydown['KeyW'] = false;
      clearTimeout(this.t['KeyW']);
    }
    if (this.keydown['KeyA']) {
      this.keydown['KeyA'] = false;
      clearTimeout(this.t['KeyA']);
    }
    if (this.keydown['KeyS']) {
      this.keydown['KeyS'] = false;
      clearTimeout(this.t['KeyS']);
    }
    if (this.keydown['KeyD']) {
      this.keydown['KeyD'] = false;
      clearTimeout(this.t['KeyD']);
    }
  }

  move(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp' :
      case 'w' : this.characterService.moveUp();
                 if (this.level1Service.isIllegalMove(this.characterService.xPos, this.characterService.yPos)) {
                  this.characterService.moveDown();
                 }
                 break;
      case 'ArrowDown' :
      case 's' : this.characterService.moveDown();
                 if (this.level1Service.isIllegalMove(this.characterService.xPos, this.characterService.yPos)) {
                  this.characterService.moveUp();
                 }
                 break;
      case 'ArrowLeft' :
      case 'a' : this.characterService.moveLeft();
                 if (this.level1Service.isIllegalMove(this.characterService.xPos, this.characterService.yPos)) {
                  this.characterService.moveRight();
                 }
                 break;
      case 'ArrowRight' :
      case 'd' : this.characterService.moveRight();
                 if (this.level1Service.isIllegalMove(this.characterService.xPos, this.characterService.yPos)) {
                  this.characterService.moveLeft();
                 }
                 break;
    }
    if (this.level1Service.isKillingMove(this.characterService.xPos, this.characterService.yPos)) {
      this.resetLevel();
    } else if (this.level1Service.isCompleted) {
      this.levelcompleted();
    }
    this.t[event.code] = setTimeout(this.move.bind(this), 6, event);
  }

  resetLevel() {
    document.getElementById('deathCount').innerHTML = 'Death count : ' + this.deathCount;
  }

  levelcompleted() {
    
  }
}
