import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertController} from '@ionic/angular';

import {ToastController } from '@ionic/angular';



@Component({
  selector: 'app-cliente-add-edit',
  templateUrl: './cliente-add-edit.page.html',
  styleUrls: ['./cliente-add-edit.page.scss'],

})



export class ClienteAddEditPage implements OnInit {

  //cliente = {nascimento: null, renda: null, tel: null,email: null, nome: null};

  clienteForm!: FormGroup;

  
  async presentAlert(header: string, subHeader: string, message: string, buttons: string[]) {
    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
      buttons
    });
    await alert.present();
  }

  async presentToast(message: string, duration: number, position: 'top' | 'bottom') {
    const toast = await this.toastCtrl.create({
      message,
      duration,
      position
    });
    toast.present();
  }

  hasErrors = false;
  errorsMessage: string[] | undefined;


  
  validationMessages = {
    nome: [
      { type: 'required', message: 'Nome é obrigatório' },
      { type: 'minlength', message: 'Nome deve ter ao menos 3 caracteres' },
      { type: 'maxlength', message: 'Nome não pode ter mais que 50 caracteres' }
    ],
    renda: [
      { type: 'min', message: 'Renda precisa ser positiva' }
    ]
  };
  datePicker: any;

  constructor(
    private formBuilder: FormBuilder, 
    private alertController: AlertController, 
    private toastCtrl: ToastController
    ) {
      
  }

  ngOnInit() {
    this.clienteForm = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      tel: ['', Validators.required],
      renda: ['0', Validators.compose([Validators.required, Validators.min(0)])],
      nascimento: ['', Validators.required]
    });
  }

  
  
  //nova declaração para nome
  public nome: string | undefined;

  //submit() {
  //  this.errorMessage = [];
  //  if (this.clienteForm.get('nome')!.hasError('required')) {
  //    this.errorMessage.push('Nome é obrigatório');
  //  }
  //  if (this.clienteForm.get('email')!.hasError('required')) {
  //    this.errorMessage.push('Email é obrigatório');
  //  }
  //  this.hasErrors = this.errorMessage.length > 0;
  //}

  async submit() {
    this.errorsMessage = [];
    if (this.clienteForm.get('nome')!.hasError('required') || this.clienteForm.get('nome')!.hasError('minLength')) {
      this.errorsMessage.push('Nome é obrigatório');
    }
    if (this.clienteForm.get('email')!.hasError('required') || this.clienteForm.get('email')!.hasError('email')) {
      this.errorsMessage.push('Email é obrigatório');
    }
    this.hasErrors = this.errorsMessage.length > 0;
    
    if (!this.hasErrors) {
      await this.presentAlert('Sucesso', 'Gravação bem sucedida', 'Os dados do cliente foram gravados', ['Ok']);
      await this.presentToast('Gravacao bem sucedida', 3000, 'top');
    }
    }




}

