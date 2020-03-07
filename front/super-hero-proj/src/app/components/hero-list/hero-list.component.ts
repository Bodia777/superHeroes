import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrudHeroService } from 'src/app/services/crud-hero.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit, OnDestroy {
 public heroList = [];
 private unsubscribed = new Subject();

  constructor(public crudHeroService: CrudHeroService) { }

  ngOnInit(): void {
    this.crudHeroService.getSuperheroesList
    .pipe(takeUntil(this.unsubscribed))
    .subscribe((list) => {
      this.heroList = list;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribed.next();
    this.unsubscribed.complete();
  }
}
