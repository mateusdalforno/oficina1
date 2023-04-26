import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})


export class AppComponent {


  // Antes do construtor
private initPlugin!: boolean;



  constructor(
    private storage: Storage,
    private platform: Platform,
    private databaseService: DatabaseService,
    ) {
      this.initializeApp();
     }

  // Nosso método
  async initializeApp() {
    this.platform.ready().then(async () => {
      this.databaseService.initializePlugin().then(async (ret) => {
        try {
          const db = await this.databaseService.createConnection("oficina", false, "no-encryption", 1);
          this.initPlugin = ret;
        } catch (err) {
          console.log(`Error: ${err}`);
          this.initPlugin = false;
        }
        console.log('Status da inicialização do plugin: ' + this.initPlugin);
      });
    });
  }

  async ngOnInit() {
    await this.storage.create();
    }

    
}
