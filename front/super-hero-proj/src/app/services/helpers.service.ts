import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {
  public wrightNavigation = false;
  constructor() { }
  public wrightNavigationFunction(): void {
    this.wrightNavigation = true;
  }
}
