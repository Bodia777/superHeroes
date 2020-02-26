import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';




@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  public message: string;

  constructor(public modalRef: BsModalRef) { }

  ngOnInit(): void {
  }

}
