import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { Superhero } from 'src/app/interfaces/hero';
import { CrudHeroService } from 'src/app/services/crud-hero.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ModalComponent } from '../../modal/modal.component';
import { HelpersService } from 'src/app/services/helpers.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-hero-item',
  templateUrl: './hero-item.component.html',
  styleUrls: ['./hero-item.component.scss']
})
export class HeroItemComponent implements OnInit, AfterViewInit {
  @Input() heroItem: Superhero;
  @ViewChild('containerItem', {static: false}) itemImg: ElementRef;
  public modalRef: BsModalRef;
  constructor(private helpersService: HelpersService, private renderer: Renderer2,
              private crudHeroService: CrudHeroService, private modalservice: BsModalService, private router: Router) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.getSuperHeroesList();
   }
private getSuperHeroesList(): void {
     const url = 'http://localhost:3000/' + this.heroItem.heroImage;
     this.renderer.setAttribute(this.itemImg.nativeElement, 'src', `${url}` );
  }

public deleteHeroItem(itemId): void {
  this.helpersService.okButtonModalChecker = true;
  this.modalRef = this.modalservice.show(ModalComponent, {
    initialState: {
       message: 'Confirm Superhero deleting...',
       deleteHeroSubmit: this.confirmDelete.bind(this),
       closeModal: this.cancelDeleteHero.bind(this)
    }
  });
}

public changeHeroItem(heroItem): void {
  this.crudHeroService.changeHero = heroItem;
  this.router.navigate(['new_Hero']);
}
private confirmDelete(): void {
  this.modalRef.hide();
  this.crudHeroService.deleteHero(this.heroItem._id);
  this.helpersService.okButtonModalChecker = false;
  this.helpersService.wrightNavigation = true;
}

private cancelDeleteHero(): void {
  this.modalRef.hide();
  this.helpersService.okButtonModalChecker = false;
  this.helpersService.wrightNavigation = true;
}
}

