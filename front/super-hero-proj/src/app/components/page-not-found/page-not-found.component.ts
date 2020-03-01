import { Component, OnInit, DoCheck } from '@angular/core';
import { BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import { ModalComponent } from '../modal/modal.component';
import { Router } from '@angular/router';
import { HelpersService } from 'src/app/services/helpers.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit, DoCheck {
  modalRef: BsModalRef;

  constructor(private modalservice: BsModalService, private router: Router, private helpersService: HelpersService) {}

  ngOnInit(): void {
    this.modalRef = this.modalservice.show(
      ModalComponent, {
        initialState: {
          message: 'Page not found',
        }
      });
  }

  ngDoCheck(): void {
    if (this.helpersService.wrightNavigation) {
      this.closeModalFunction();
    }
  }

  private closeModalFunction(): void {
    this.router.navigate(['new_Hero']);
  }
}
