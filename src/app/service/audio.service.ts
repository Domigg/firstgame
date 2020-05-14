import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  songVolume: number;
  midVolume: number;
  lowVolume: number;
  isAudio: boolean;
  constructor() {
    this.songVolume = 0.05;
    this.midVolume = 1;
    this.lowVolume = 0.4;
    this.isAudio = true;
   }

   playSong() {
    const audio = new Audio();
    audio.src = 'assets\\audio\\sky.wav';
    audio.setAttribute('id', 'song');
    audio.volume = this.songVolume;
    audio.load();
    audio.play();
    setTimeout(this.playSong, 68000);
  }

  playPuzzleJingle() {
    const audio = new Audio();
    audio.setAttribute('class', 'myaudio');
    audio.src = 'assets\\audio\\whooshflash.mp3';
    audio.volume = this.midVolume;
    audio.load();
    audio.play();
  }

  playObjectJingle() {
    const audio = new Audio();
    audio.setAttribute('class', 'myaudio');
    audio.src = 'assets\\audio\\tripplebell.mp3';
    audio.volume = this.lowVolume;
    audio.load();
    audio.play();
  }

  playLevelCompleteJingle() {
    const audio = new Audio();
    audio.setAttribute('class', 'myaudio');
    // audio.src = 'assets\\audio\\puzzlejingle.mp3';
    audio.volume = 0.02;
    audio.load();
    audio.play();
  }

  toggleAudio(): void {
    console.log(true);
    if (this.isAudio) {
      const audio = document.getElementById('song') as HTMLMediaElement;
      audio.muted = true;
      this.isAudio = false;

    } else {
      this.isAudio = true;
      const audio = document.getElementById('song') as HTMLMediaElement;
      audio.muted = false;
    }
  }

}
