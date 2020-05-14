import { Component, HostListener } from '@angular/core';
import { Key } from 'protractor';
import { Level1Service } from 'src/app/service/level1.service';
import { async } from '@angular/core/testing';
import { AudioService } from 'src/app/service/audio.service';
import { CharacterService } from 'src/app/service/character.service';
import { LevelSelectionService } from 'src/app/service/level-selection.service';

@Component({
  selector: 'app-ghost-level',
  templateUrl: './ghost-level.component.html',
  styleUrls: ['./ghost-level.component.scss']
})
export class GhostLevelComponent {

  t: any[];
  keydown: boolean[];
  deathCount: number;
  checkpoint: number;
  flashEvent: Event;
  isPlayTime: boolean;
  isFocus: boolean;
  isAudio: boolean;
  isPlayable: boolean;
  // activeInput: string;
  constructor(public characterService: CharacterService,
              public level1Service: Level1Service,
              public audioService: AudioService,
              public levelSelectionService: LevelSelectionService) {
    characterService.xPos = this.width / 2 - 13;
    characterService.yPos = this.height / 2 + 199;
    characterService.xPosGhost = this.width / 2 - 238;
    characterService.yPosGhost = this.height / 2 - 23;
    characterService.image = 'assets\\image\\linkup.png';
    characterService.imageGhost = 'assets\\image\\linkright.png';
    this.keydown = [];
    this.t = [];
    this.keydown['KeyW'] = false;
    this.keydown['KeyA'] = false;
    this.keydown['KeyS'] = false;
    this.keydown['KeyD'] = false;
    this.checkpoint = 0;
    this.deathCount = 0;
    this.isPlayTime = true;
    this.isFocus = false;
    this.isAudio = true;
    this.isPlayable = true;
  }

  title = 'puzzle-game';
  width = window.innerWidth;
  height = window.innerHeight;

  ngAfterViewInit() {
    document.getElementById('hintrect').addEventListener('click', this.level1Service.toggleHint, false);
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.levelSelectionService.currentLevel === 2) {
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
    if (this.levelSelectionService.currentLevel === 2) {
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
    }
    if (this.level1Service.isGreyPoppin && !this.level1Service.hasKey) {
      this.greyKeyPoppin();
    } else if (this.level1Service.stage === 1 && document.getElementById('hinttext').innerHTML !== 'Ghost visible!') {
      document.getElementById('ghost').setAttribute('opacity', '0%');
      document.getElementById('ghostcarpet').setAttribute('opacity', '0%');
    } else if (this.level1Service.isGoldKeyPoppin && !this.level1Service.hasKey) {
      this.getGoldKey();
    } else if (this.level1Service.stage === 11) {
      this.switchGreyChest();
    } else if (this.level1Service.stage === 14) {
      this.whiteFlash();
    } else if (this.level1Service.isCompleted) {
      this.levelcompleted();
    }
    if ( this.characterService.yPos < innerHeight / 2 + 9 && this.characterService.yPos > innerHeight / 2 - 54
      && this.characterService.xPos < innerWidth / 2 + 15 && this.characterService.xPos > innerWidth / 2 - 39) {
     document.getElementById('ghost').setAttribute('opacity', '60%');
     document.getElementById('exclamation').setAttribute('opacity', '100%');
    } else if ( this.level1Service.stage !== 0) {
      if (document.getElementById('hinttext').innerHTML !== 'Ghost visible!') {
        document.getElementById('ghost').setAttribute('opacity', '0%');
      }
      document.getElementById('exclamation').setAttribute('opacity', '0%');
    }
    this.t[event.code] = setTimeout(this.move.bind(this), 6, event);
    document.getElementById('deathCount').innerHTML = 'Death count : ' + this.deathCount;
  }

  resetLevel(): void {
    this.characterService.xPos = this.width / 2 - 13;
    this.characterService.yPos = this.height / 2 + 199;
    this.characterService.xPosGhost = this.width / 2 - 230;
    this.characterService.yPosGhost = this.height / 2 - 30;
    this.level1Service.stage = 0;
    this.level1Service.hasKey = false;
    this.deathCount++;
    document.getElementById('greykeypop').setAttribute('height', '0');
    document.getElementById('greykey').setAttribute('height', '30');
    document.getElementById('key').setAttribute('visibility', 'hidden');
    document.getElementById('greychestfront').setAttribute('visibility', 'visible');
    document.getElementById('ghost').setAttribute('opacity', '60%');
    document.getElementById('ghostcarpet').setAttribute('opacity', '40%');
  }

  whiteFlash(): void {
    document.getElementById('checkpoint').setAttribute('width', '600');
    document.getElementById('checkpoint').setAttribute('height', '600');

    this.checkpoint = 1;
    document.getElementById('flashElem').setAttribute('repeatCount', 'indefinite');
    this.audioService.playPuzzleJingle();
    setTimeout(() => {document.getElementById('checkpoint').setAttribute('width', '0');
                      document.getElementById('checkpoint').setAttribute('height', '0');
                      document.getElementById('flashElem').setAttribute('repeatCount', '0'); }, 300);
    const carpets = document.getElementsByClassName('carpet');
    for (let i = 0; i < carpets.length; i++) {
      carpets[i].setAttribute('visibility', 'hidden');
    }
    const circle = document.getElementsByClassName('circle');
    for (let i = 0; i < circle.length; i++) {
      circle[i].setAttribute('visibility', 'hidden');
    }
    document.getElementById('greychestback').setAttribute('visibility', 'hidden');
    document.getElementById('greychestfront').setAttribute('visibility', 'hidden');

  }

  greyKeyPoppin(): void {
    this.isPlayTime = false;
    this.level1Service.isGreyPoppin = false;
    this.isPlayable = false;
    this.characterService.deplacement = 0;
    this.characterService.image = 'assets\\image\\linkleft.png';
    document.getElementById('greykeypopanimate').setAttribute('to', '30');
    document.getElementById('greykeyanimate').setAttribute('to', '35');
    document.getElementById('greykeyanimate').setAttribute('repeatCount', 'indefinite');
    setTimeout(() => {document.getElementById('greykey').setAttribute('height', '0');
                      document.getElementById('greykeyanimate').setAttribute('repeatCount', '0');
                      document.getElementById('greykeypopanimate').setAttribute('repeatCount', 'indefinite'); }, 700);
    setTimeout(() => {document.getElementById('greykeypop').setAttribute('height', '30');
                      document.getElementById('greykeypopanimate').setAttribute('repeatCount', '0');
                      this.isPlayable = true;
                      this.characterService.deplacement = 1;
                      }, 999);
  }

  getGoldKey(): void {
    this.level1Service.isGoldKeyPoppin = false;
    this.level1Service.hasKey = true;
    document.getElementById('key').setAttribute('visibility', 'visible');
    document.getElementById('greykeypop').setAttribute('height', '0');
    this.audioService.playObjectJingle();
    this.switchGreyChest();
  }

  switchGreyChest(): void {
    if (document.getElementById('greychestfront').getAttribute('visibility') === 'hidden') {
      document.getElementById('greychestfront').setAttribute('visibility', 'visible');
    } else {
      document.getElementById('greychestfront').setAttribute('visibility', 'hidden');
    }
  }

  levelcompleted(): void {
    document.getElementById('deathCount').setAttribute('fill', 'green');
    document.getElementById('Level').setAttribute('fill', 'green');
    document.getElementById('Level').innerHTML = 'Level 1 complete!';
    document.getElementById('key').setAttribute('visibility', 'hidden');
    document.getElementById('chest').setAttribute('href', 'assets\\image\\openchest.png');
    this.characterService.image = 'assets\\image\\linkup.png';
    this.characterService.imageGhost = 'assets\\image\\linkright.png';
    this.isPlayable = false;
    this.characterService.deplacement = 0;
    this.audioService.playLevelCompleteJingle();
  }

  ghostDisappear(): void {
      document.getElementById('ghost').setAttribute('opacity', '0%');
  }
}
