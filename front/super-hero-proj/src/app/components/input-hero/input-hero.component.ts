import { Component, OnInit, Renderer2, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudHeroService } from 'src/app/services/crud-hero.service';
import { Superhero } from 'src/app/interfaces/hero';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input-hero',
  templateUrl: './input-hero.component.html',
  styleUrls: ['./input-hero.component.scss']
})
export class InputHeroComponent implements OnInit, OnDestroy {
  public createHeroForm: FormGroup;
  public superheroImages: File;
  private formData = new FormData();
  @ViewChild('imgHero', {static: true}) addImg: ElementRef;

  constructor(private router: Router, public crudHeroService: CrudHeroService, private fb: FormBuilder, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.createHero();
  }
  ngOnDestroy(): void {
    this.createHeroForm.reset();
    this.renderer.setAttribute(this.addImg.nativeElement, 'src', '/assets/img/Space.jpg');
  }
  private createHero(): void {
    if (!this.crudHeroService.changeHero) {
    this.createHeroForm = this.fb.group({
      superheroNickname: [],
      superheroRealname: [],
      superheroOriginDescription: [],
      superPowers: [],
      catchPhrase: [],
    });
  } else {
    this.createHeroForm = this.fb.group({
      superheroNickname: [this.crudHeroService.changeHero.superheroNickname],
      superheroRealname: [this.crudHeroService.changeHero.superheroRealname],
      superheroOriginDescription: [this.crudHeroService.changeHero.superheroOriginDescription],
      superPowers: [this.crudHeroService.changeHero.superPowers],
      catchPhrase: [this.crudHeroService.changeHero.catchPhrase],
      _id: [this.crudHeroService.changeHero._id]
    });
    const url = 'http://localhost:3000/' + this.crudHeroService.changeHero.heroImage;
    this.renderer.setAttribute(this.addImg.nativeElement, 'src', `${url}`);
  }
}
 public addHeroImg(event) {
    const uploadFile = event.target.files[0] || event.srcElement;
    this.superheroImages = uploadFile;
    const heroURL = URL.createObjectURL(event.target.files[0]);
    this.renderer.setAttribute(this.addImg.nativeElement, 'src', `${heroURL}`);
  }

public onsubmitHeroForm() {
  if (this.createHeroForm.valid) {
    const newSuperhero: Superhero = this.createHeroForm.value;
    if (this.superheroImages) {
    this.formData.append('newSuperhero', JSON.stringify(newSuperhero));
    this.formData.append('heroImg', this.superheroImages);
    this.crudHeroService.finalData = this.formData;
    } else {
      this.crudHeroService.finalData = newSuperhero;
    }
    this.crudHeroService.postSuperhero();
    this.createHeroForm.reset();
    this.renderer.setAttribute(this.addImg.nativeElement, 'src', '/assets/img/Space.jpg');
    this.router.navigate(['superhero_list']);
    }
  }

  cancellChangeHero() {
    this.crudHeroService.changeHero = null;
    this.router.navigate(['superhero_list']);
  }

  changeHero() {
    if (this.createHeroForm.valid) {
      const newSuperhero: Superhero = this.createHeroForm.value;
      if (this.superheroImages) {
      this.formData.append('newSuperhero', JSON.stringify(newSuperhero));
      this.formData.append('heroImg', this.superheroImages);
      this.crudHeroService.finalData = this.formData;
      } else {
        this.crudHeroService.finalData = newSuperhero;
      }
      this.crudHeroService.changeSuperhero();
      this.router.navigate(['superhero_list']);
      }
  }
}
