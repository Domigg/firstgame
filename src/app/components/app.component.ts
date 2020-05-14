import { Component, HostListener } from '@angular/core';
import { Key } from 'protractor';
import { CharacterService } from '../service/character.service';
import { Level1Service } from '../service/level1.service';
import { async } from '@angular/core/testing';
import { AudioService } from '../service/audio.service';
import { LevelSelectionService } from '../service/level-selection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  t: any[];
  keydown: boolean[];
  deathCount: number;
  checkpoint: number;
  flashEvent: Event;
  isPlayTime: boolean;
  isFocus: boolean;
  isAudio: boolean;
  isPlayable: boolean;

  constructor(public characterService: CharacterService,
              public level1Service: Level1Service,
              public audioService: AudioService,
              public levelSelectionService: LevelSelectionService ) {
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

  width = window.innerWidth;
  height = window.innerHeight;

}
