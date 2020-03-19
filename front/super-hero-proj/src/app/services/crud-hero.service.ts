import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError, Observable } from 'rxjs';
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
  public loaderChecker = true;
  modalRef: BsModalRef;
  public pagination = {
    limit: 8,
    page: 1,
    pages: 1
  };
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

  public getSuperheroes(): void {
   this.loaderChecker = true;
   const url = this.url + `?limit=${this.pagination.limit}&page=${this.pagination.page}`;
//  const params = new HttpParams();
//  this.http.get<any>(url, {params, observe: 'response'})
// const keys = heroesData.headers.keys();
// this.headers = keys.map(key =>
//   `${key}: ${resp.headers.get(key)}`);
// console.log('keys', keys );
   this.http.get<Observable< Superhero[] >>(url)
    .subscribe(
      ( heroesData ): void => {
        this.loaderChecker = false;
        this.pagination.pages = heroesData[1];
        this.getSuperheroesList.next(heroesData[0]);
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
