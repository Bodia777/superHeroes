import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  BsModalRef
} from 'ngx-bootstrap';
import { HelpersService } from 'src/app/services/helpers.service';
import { CrudHeroService } from 'src/app/services/crud-hero.service';




@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  public message: string;

  constructor(public modalRef: BsModalRef, public helpersService: HelpersService, private crudHeroService: CrudHeroService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.helpersService.wrightNavigationFunction();
  }

  public deleteHeroSubmit(): void {
    this.helpersService.okButtonModalChecker = false;
    this.crudHeroService.deleteHero();
  }
  public closeModal(): void {
    this.helpersService.okButtonModalChecker = false;
  }

}
