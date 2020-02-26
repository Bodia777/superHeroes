import { Component, OnInit, Input } from '@angular/core';
import { Superhero } from 'src/app/interfaces/hero';

@Component({
  selector: 'app-hero-item',
  templateUrl: './hero-item.component.html',
  styleUrls: ['./hero-item.component.scss']
})
export class HeroItemComponent implements OnInit {
  @Input() heroItem: Superhero;

  constructor() { }

  ngOnInit(): void { }
}
