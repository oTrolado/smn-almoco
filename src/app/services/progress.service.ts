import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  
  progressEmitter = new EventEmitter<boolean>();

  constructor() { }

  offProgress(){
    this.progressEmitter.emit(false);
  }

  onProgress(){
  	this.progressEmitter.emit(true);
  }
}
