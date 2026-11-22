import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private popup = Swal.mixin({
    customClass: {
      popup: 'custom-popup',
      confirmButton: 'custom-btn'
    },
    buttonsStyling: false
  });

  success(message: string, title: string = 'Success!') {
    Swal.fire({
      icon: 'success',
      title,
      text: message,
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false
    });
  }

  error(message: string, title: string = 'Oops!') {
    Swal.fire({
      icon: 'error',
      title,
      text: message,
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false
    });
  }

  warning(
    message: string,
    title: string = 'Warning!'
  ) {
    Swal.fire({
      icon: 'warning',
      title,
      text: message,
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false
    });
  }

  info(message: string, title: string = 'Info') {
    Swal.fire({
      icon: 'info',
      title,
      text: message,
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false
    });
  }

  confirm(
    title: string,
    text: string,
    confirmButtonText: string = 'Yes',
    cancelButtonText: string = 'Cancel'
  ): Promise<SweetAlertResult> {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      width: '400px',
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText,
      reverseButtons: true,
      focusCancel: true,
      buttonsStyling: false,
      customClass: {
        popup: 'modern-confirm-popup',
        icon: 'modern-confirm-icon',
        title: 'modern-confirm-title',
        htmlContainer: 'modern-confirm-text',
        actions: 'modern-confirm-actions',
        confirmButton: 'modern-confirm-btn',
        cancelButton: 'modern-cancel-btn'
      }
    });
  }
}