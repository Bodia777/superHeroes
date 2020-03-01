import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {
  public wrightNavigation = false;
  public okButtonModalChecker = false;

  constructor() { }
  public wrightNavigationFunction(): void {
    this.wrightNavigation = true;
  }
}
