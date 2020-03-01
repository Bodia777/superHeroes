import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  BsModalRef
} from 'ngx-bootstrap';
import { HelpersService } from 'src/app/services/helpers.service';




@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  public message: string;

  constructor(public modalRef: BsModalRef, private helpersService: HelpersService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.helpersService.wrightNavigationFunction();
  }

  public closeModal(): void {
    // this.modalRef.hide();
    console.log('ura');
  }
}
