import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { Superhero } from 'src/app/interfaces/hero';
@Component({
  selector: 'app-hero-item',
  templateUrl: './hero-item.component.html',
  styleUrls: ['./hero-item.component.scss']
})
export class HeroItemComponent implements OnInit, AfterViewInit {
  @Input() heroItem: Superhero;
  @ViewChild('containerItem', {static: false}) itemImg: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.getSuperHeroesList();
   }
private getSuperHeroesList() {
     const url = 'http://localhost:3000/' + this.heroItem.heroImage;
     this.renderer.setAttribute(this.itemImg.nativeElement, 'src', `${url}` );
  }
}
