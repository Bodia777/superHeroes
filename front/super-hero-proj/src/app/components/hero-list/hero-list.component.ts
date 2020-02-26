import { Component, OnInit } from '@angular/core';
import { CrudHeroService } from 'src/app/services/crud-hero.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit {
 public heroList = [];

  constructor(private crudHeroService: CrudHeroService) { }

  ngOnInit(): void {
    this.crudHeroService.getSuperheroesList.subscribe((list) => {
      this.heroList = list;
      console.log(this.heroList);
    });
  }
}
