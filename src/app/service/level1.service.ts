import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Level1Service {

  stage: number;
  isCompleted: boolean;
  isGreyPoppin: boolean;
  isGoldKeyPoppin: boolean;
  hasKey: boolean;

  constructor() {
    this.stage = 0;
    this.isCompleted = false;
    this.isGreyPoppin = false;
    this.isGoldKeyPoppin = false;
    this.hasKey = false;
   }

  public isIllegalMove(x: number, y: number): boolean {
    if (y > innerHeight / 2 + 214) {
      return true;
    }
    if (y > innerHeight / 2 + 164 || y < innerHeight / 2 - 221) {
      if (x < innerWidth / 2 - 48 || x > innerWidth / 2 + 27) {
        return true;
      }
    } else {
      if (x < innerWidth / 2 - 203 || x > innerWidth / 2 + 177) {
        return true;
      }
    }
    if (x <= innerWidth / 2 - 48 || x >= innerWidth / 2 + 27) {
      if (y > innerHeight / 2 + 169 || y < innerHeight / 2 - 216) {
        return true;
      }
    }
    return false;
  }

  public isKillingMove(x: number, y: number): boolean {
    switch (this.stage) {
      case 0 : if (y < innerHeight / 2  + 176) {
                this.stage = 1;
                return false;
               }
               break;
      case 1 : if (y < innerHeight / 2  - 114 && x < innerWidth / 2 - 39) {
                 this.stage = 2;
                 return false;
               }
               if (x > innerWidth / 2 + 15 || y < innerHeight / 2  - 166 || x < innerWidth / 2 - 39) {
                 return true;
               }
               break;
      case 2 : if (x > innerWidth / 2 - 39) {
                this.stage = 1;
                return false;
               }
               if (y > innerHeight / 2  - 114 && x < innerWidth / 2 - 104) {
                this.stage = 3;
                return false;
               }
               if (y > innerHeight / 2  - 114 || y < innerHeight / 2  - 166 || x < innerWidth / 2 - 149) {
                return true;
               }
               break;
      case 3 : if (y < innerHeight / 2  - 114) {
                this.stage = 2;
                return false;
               }
               if (y > innerHeight / 2 - 47 && x > innerWidth / 2 - 104) {
                 this.stage = 4;
                 return false;
               }
               if (x > innerWidth / 2 - 104 || x < innerWidth / 2 - 149 || y > innerHeight / 2) {
                return true;
               }
               break;
      case 4 : if (x < innerWidth / 2 - 104) {
                this.stage = 3;
                return false;
               }
               if (x > innerWidth / 2 + 84) {
                this.stage = 5;
                return false;
               }
               if (y < innerHeight / 2 - 47 || y > innerHeight / 2 || x > innerWidth / 2 + 125) {
                 return true;
               }
               break;
      case 5 : if (x < innerWidth / 2 + 84) {
                this.stage = 4;
                return false;
               }
               if (y > innerHeight / 2 + 25) {
                this.stage = 11;
               }
               if (y < innerHeight / 2 - 112) {
                this.stage = 13;
               }
               if (x < innerWidth / 2 + 84 && y > innerHeight / 2 + 71) {
                this.stage = 6;
                return false;
               }
               if (y > innerHeight / 2 + 110 || x > innerWidth / 2 + 125 || x < innerWidth / 2 + 84) {
                return true;
              }
               break;
      case 6 : if (x > innerWidth / 2 + 84) {
                this.stage = 5;
                return false;
               }
               if (x < innerWidth / 2 + 65) {
                this.isGreyPoppin = true;
                this.stage = 8;
                return false;
               }
               if (y > innerHeight / 2 + 110 || y < innerHeight / 2 + 71) {
                return true;
               }
               break;
      case 8 : if (x < innerWidth / 2 + 60) {
                this.isGoldKeyPoppin = true;
                this.stage = 10;
                return false;
               }
               if (y < innerHeight / 2 + 71 || y > innerHeight / 2 + 115 || x > innerWidth / 2 + 127) {
                return true;
               }
               break;
      case 9 : this.stage = 10;
               break;
      case 10 : if (x > innerWidth / 2 + 84) {
                  this.stage = 5;
                  return false;
                }
                if (x < innerWidth / 2 + 19 || x > innerWidth / 2 + 132  || y < innerHeight / 2 + 60 || y > innerHeight / 2 + 118) {
                  return true;
                }
                break;
      case 11 : if (y < innerHeight / 2 + 25) {
                  this.stage = 5;
                }
                if (y > innerHeight / 2 + 25) {
                  this.stage = 12;
                }
                break;
      case 12 : if (y < innerHeight / 2) {
                  this.stage = 4;
                  return false;
                }
                if (x < innerWidth / 2 + 84 && y > innerHeight / 2 + 71) {
                  this.stage = 6;
                  return false;
                }
                if (y < innerHeight / 2 + 25) {
                  this.stage = 11;
                }
                if (y > innerHeight / 2 + 110 || x > innerWidth / 2 + 125 || x < innerWidth / 2 + 84) {
                  return true;
                }
                break;
      case 13 : if (y > innerHeight / 2 - 112 && x > innerWidth / 2 + 84) {
                  this.stage = 5;
                  return false;
                }
                if (this.hasKey && x < innerWidth / 2 + 55 ) {
                  this.stage = 14;
                  return false;
                }
                if (y < innerHeight / 2 - 166 || y > innerHeight / 2 - 112 || x > innerWidth / 2 + 125 || x < innerWidth / 2 + 35) {
                  return true;
                }
                break;
      case 14 : this.stage = 15;
                break;
      case 15 : if ( y < innerHeight / 2 - 220) {
                  this.isCompleted = true;
                }
                break;
    }
    return false;
  }

  toggleHint(): void {
    if (document.getElementById('hinttext').innerHTML === 'Request Small Hint') {
      document.getElementById('hint').setAttribute('opacity', '100%');
      document.getElementById('hinttext').innerHTML = 'Request Hint 2';
    } else if (document.getElementById('hinttext').innerHTML === 'Request Hint 2') {
      document.getElementById('hint2').setAttribute('opacity', '100%');
      document.getElementById('hinttext').innerHTML = 'Request Super Hint';
      document.getElementById('hintrect').setAttribute('width', '175');
    } else if (document.getElementById('hinttext').innerHTML === 'Request Super Hint') {
      document.getElementById('ghost').setAttribute('opacity', '60%');
      document.getElementById('hinttext').innerHTML = 'Ghost visible!';
      document.getElementById('hintrect').setAttribute('opacity', '0%');
      document.getElementById('hintrect').setAttribute('width', '0');
    }
  }
}
