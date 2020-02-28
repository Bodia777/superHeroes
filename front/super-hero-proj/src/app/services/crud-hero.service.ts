import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Superhero } from 'src/app/interfaces/hero';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class CrudHeroService {
  public getSuperheroesList = new BehaviorSubject<Array<Superhero>> (null);
  private url = 'http://localhost:3000/';
  public finalData: any;
  modalRef: BsModalRef;
  constructor(private http: HttpClient, private modalservice: BsModalService) {
    this.getSuperheroes();
   }


  public postSuperhero(): void {
      console.log(this.finalData);
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

  private getSuperheroes() {
this.http.get<Array<Superhero>>(this.url)
.subscribe(
  (heroesData) => {
  this.getSuperheroesList.next(heroesData);
  },
  (error) => {
    console.log(error);
});
}
}
