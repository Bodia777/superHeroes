import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Superhero } from 'src/app/interfaces/hero';
import { HttpClient } from '@angular/common/http';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class CrudHeroService {
  public getSuperheroesList = new BehaviorSubject<Array<Superhero>> (null);
  public finalData: FormData | {};
  public changeHero: Superhero;
  public loaderChecker = false;
  modalRef: BsModalRef;
  private url = 'http://localhost:3000/heroes/';


  constructor(private http: HttpClient, private modalservice: BsModalService) {
    this.getSuperheroes();
   }


  public postSuperhero(): void {
    this.loaderChecker = true;
    this.http.post(this.url, this.finalData, {observe: 'response'})
       .pipe(catchError((err) => {
         this.modalRef = this.modalservice.show(ModalComponent, {
           initialState: {
              message: err.error.message,
              data: {}
           }
         });
         this.getSuperheroes();
         return throwError(err);
       }))
      .subscribe((data) => {
        this.getSuperheroes();
      });
}

  private getSuperheroes(): void {
   this.loaderChecker = true;
   this.http.get<Array<Superhero>>(this.url)
    .subscribe(
      (heroesData) => {
        this.loaderChecker = false;
        this.getSuperheroesList.next(heroesData);
      },
      (error) => {
        this.loaderChecker = false;
        this.modalRef = this.modalservice.show(ModalComponent, {
          initialState: {
             message: error.message,
             data: {}
          }
        });
   });
  }

public deleteHero(heroItemId): void {
  this.loaderChecker = true;
  const deleteUrl = this.url + heroItemId;
  this.http.delete(deleteUrl, {observe: 'response'})
  .subscribe((res) => {
    this.getSuperheroes();
  });
}

public changeSuperhero(): void {
  this.loaderChecker = true;
  const changeUrl = this.url + this.changeHero._id;
  this.changeHero = null;
  this.http.put(changeUrl, this.finalData, {observe: 'response'})
     .pipe(catchError((err) => {
       this.modalRef = this.modalservice.show(ModalComponent, {
         initialState: {
            message: err.error.message,
            data: {}
         }
       });
       this.getSuperheroes();
       return throwError(err);
     }))
    .subscribe((data) => {
      this.getSuperheroes();
    });
}

}
