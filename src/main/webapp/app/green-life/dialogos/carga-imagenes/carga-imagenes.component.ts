import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material';
import { SERVER_API_URL } from '../../../app.constants';
import { SnackBarService } from './../../shared/services/snack-bar.service';

@Component({
  selector: 'jhi-carga-imagenes',
  templateUrl: './carga-imagenes.component.html',
  styleUrls: ['carga-imagenes.component.scss']
})
export class CargaImagenesComponent implements OnInit {

  imageBase64: string;
  apiPath = `${SERVER_API_URL}/api/images`;
  @ViewChild('iframe') uploadIframe: ElementRef;
  @ViewChild('form') form: ElementRef;
  imageForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CargaImagenesComponent>,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit() {
    this.imageForm = this.fb.group({
      image: ['', [Validators.required]]
    });
    console.log(this.uploadIframe);
  }

  subirImage(event: Event) {
    const iframe = this.uploadIframe.nativeElement as HTMLIFrameElement;
    iframe.onload = (iframeEvent) => {
      iframe.onload = undefined;

      console.log(iframeEvent);

      const preEleemnt = <HTMLPreElement>iframe.contentDocument.querySelector('pre');
      if (preEleemnt && preEleemnt.innerHTML !== '') {
        const text = iframe.contentDocument.querySelector('pre').innerHTML;
        const result: { status: string, message: string, imageName: string } = JSON.parse(text);

        if (result.status === 'ok') {
          this.dialogRef.close(result.imageName);
          this.snackBarService.show('La imagen se almacenó con exito');
        } else {
          // this.showSnackBar(`No se pudo almacenar la imagen ${this.fileToUpload}`);
          // this.fileToUpload = undefined;
        }
      } else {
        // this.showSnackBar(`No se pudo almacenar la imagen ${this.fileToUpload}`);
        // this.fileToUpload = undefined;
      }
    };
    (<HTMLFormElement>this.form.nativeElement).submit();
  }

  imagenCargada(event: Event) {
    console.log(event);
    const element = event.target as HTMLInputElement;
    const file = element.files[0];
    this.getBase64(file).then((base64Decoded: string) => {
      this.imageBase64 = base64Decoded;
    });
  }

  private getBase64(file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        console.error('Error: ', error);
      };
    });
  }

}
