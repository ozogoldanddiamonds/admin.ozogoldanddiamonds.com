import { Component, OnInit } from '@angular/core';
import { PopupData } from '../Models/common-popup';
import { AlertService } from '../Services/alert.service';

@Component({
  selector: 'app-common-popup',
  templateUrl: './common-popup.component.html',
  styleUrls: ['./common-popup.component.css']
})
export class CommonPopupComponent implements OnInit {

  isOpen = false;

  popupData!: PopupData;

  constructor(
    private alertService: AlertService
  ) { }

 ngOnInit(): void {

  this.alertService.popupState$.subscribe(data => {

    if(data){

      this.popupData = data;

      this.isOpen = true;

      if(data.autoClose){

        setTimeout(()=>{

          this.close();

        }, data.duration || 3000);

      }

    }else{

      this.isOpen = false;

    }

  });

}

  close(): void {

    this.isOpen = false;

    if (this.popupData?.callback && this.popupData.type !== 'confirm') {

      this.popupData.callback();

    }

    this.alertService.close();

  }

  confirm(): void {

    this.isOpen = false;

    this.popupData.callback?.();

    this.alertService.close();

  }

  cancel(): void {

    this.isOpen = false;

    this.popupData.cancelCallback?.();

    this.alertService.close();

  }
//   if (data.autoClose) {

//   setTimeout(() => {

//     this.close();

//   }, data.duration || 3000);

// }

}