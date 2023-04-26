import { Component, OnInit, ViewChild } from '@angular/core';
import { PecasService } from '../../../services/pecas.service';
import { Peca } from '../../../models/peca.model';
import { ToastService } from '../../../services/toast.service';
import { IonList } from '@ionic/angular';
import { Guid } from 'guid-typescript';

@Component({
  templateUrl: './pecas-listagem.page.html'
})

export class PecasListagemPage implements OnInit {
  public pecas: any;
  
  // pecas-listagem.page.ts
  //alterar esta linha já existente 
  @ViewChild('slidingList') slidingList!: IonList;

  //incluir o trecho de código 
  async removerPeca(peca: Peca) {
    await this.pecasService.removeById(this.idAsString(peca.id));
    this.pecas = await this.pecasService.getAll();
    this.toastService.presentToast('Peça removida', 3000, 'top');
    await this.slidingList.closeSlidingItems();
  }


  constructor(
    private pecasService: PecasService,
    private toastService: ToastService) {

  }
  
  idAsString(id: Guid): string {
    const convertedId = JSON.parse(JSON.stringify(id));
    return convertedId.value;
  }
  
  ngOnInit(): void { }

  ionViewWillEnter() {
    this.pecasService.getAll().then(pecas => {
      this.pecas = pecas;
    });
  }

 
  

}


