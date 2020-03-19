import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { CrudHeroService } from 'src/app/services/crud-hero.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit, OnDestroy {
 public limitControl = 8;
 public page = 1;
 public heroList = [];
 private unsubscribed = new Subject();
 @ViewChild('pagination', {static: true}) pagination: ElementRef;
 @ViewChild('container', {static:  true}) container: ElementRef;
 @ViewChild('previousPage', {static:  true}) previousPage: ElementRef;
 @ViewChild('firstPage', {static:  true}) firstPage: ElementRef;
 @ViewChild('nextPage', {static:  true}) nextPage: ElementRef;
 @ViewChild('lastPage', {static:  true}) lastPage: ElementRef;

  constructor(
     public crudHeroService: CrudHeroService,
     public renderer: Renderer2
  ) { }

 ngOnInit(): void {
  this.getSuperHeroList();
  if (this.page === 1 ) {
    this.renderer.setAttribute(this.previousPage.nativeElement, 'disabled', 'true');
    this.renderer.setAttribute(this.firstPage.nativeElement, 'disabled', 'true');
  } else {
    this.renderer.setAttribute(this.previousPage.nativeElement, 'disabled', 'false');
    this.renderer.setAttribute(this.firstPage.nativeElement, 'disabled', 'false');
  }
  if (this.page === this.crudHeroService.pagination.pages) {
    this.renderer.setAttribute(this.nextPage.nativeElement, 'disabled', 'true');
    this.renderer.setAttribute(this.lastPage.nativeElement, 'disabled', 'true');
  } else {
    this.renderer.setAttribute(this.nextPage.nativeElement, 'disabled', 'false');
    this.renderer.setAttribute(this.lastPage.nativeElement, 'disabled', 'false');
  }
}

  ngOnDestroy(): void {
    this.unsubscribed.next();
    this.unsubscribed.complete();
  }


 public paginationFormChange(): void {
   this.crudHeroService.pagination.limit = this.limitControl;
   this.crudHeroService.getSuperheroes();
   this.getSuperHeroList();
 }

private getSuperHeroList(): void {
  this.crudHeroService.getSuperheroesList
  .pipe(takeUntil(this.unsubscribed))
  .subscribe(
    (list) => {
    const promisePaginationStyleRenderer = new Promise((res, rej) => {
    this.heroList = list;
    res('result');
  });
    promisePaginationStyleRenderer.then((result) => {
      setTimeout(() => {
        if (document.body.clientHeight > window.innerHeight) {
          this.renderer.setStyle(this.pagination.nativeElement, 'position', 'static');
        } else {
          this.renderer.setStyle(this.pagination.nativeElement, 'position', 'fixed');
      }
    });
  });
  }
  );
}

public nextPageFunction(): void {
  if (this.page === this.crudHeroService.pagination.pages) {
    this.renderer.setAttribute(this.nextPage.nativeElement, 'disabled', 'true');
    this.renderer.setAttribute(this.lastPage.nativeElement, 'disabled', 'true');
  } else {
    this.page += 1;
    this.crudHeroService.pagination.page = this.page;
    this.crudHeroService.getSuperheroes();
    this.getSuperHeroList();
  }
  if (this.page > 1) {
    this.renderer.setAttribute(this.previousPage.nativeElement, 'disabled', 'false');
    this.renderer.setAttribute(this.firstPage.nativeElement, 'disabled', 'false');
  }
}

public previousPageFunction(): void {
  if (this.page > 1 ) {
  this.page -= 1;
  this.crudHeroService.pagination.page = this.page;
  this.crudHeroService.getSuperheroes();
  this.getSuperHeroList();
  } else {
    this.renderer.setAttribute(this.previousPage.nativeElement, 'disabled', 'true');
    this.renderer.setAttribute(this.firstPage.nativeElement, 'disabled', 'true');
  }
}

public firstPageFunction(): void {
  if (this.page > 1 ) {
    this.page = 1;
    this.crudHeroService.pagination.page = this.page;
    this.crudHeroService.getSuperheroes();
    this.getSuperHeroList();
    this.renderer.setAttribute(this.previousPage.nativeElement, 'disabled', 'true');
    this.renderer.setAttribute(this.firstPage.nativeElement, 'disabled', 'true');
  } else {
      this.renderer.setAttribute(this.previousPage.nativeElement, 'disabled', 'true');
      this.renderer.setAttribute(this.firstPage.nativeElement, 'disabled', 'true');
  }
}

public lastPageFunction(): void {
 if (this.page !== this.crudHeroService.pagination.pages) {
   this.page = this.crudHeroService.pagination.pages;
   this.crudHeroService.pagination.page = this.page;
   this.crudHeroService.getSuperheroes();
   this.getSuperHeroList();
  }
 this.renderer.setAttribute(this.nextPage.nativeElement, 'disabled', 'true');
 this.renderer.setAttribute(this.lastPage.nativeElement, 'disabled', 'true');
 if (this.page > 1) {
    this.renderer.setAttribute(this.previousPage.nativeElement, 'disabled', 'false');
    this.renderer.setAttribute(this.firstPage.nativeElement, 'disabled', 'false');
  }
}
}
