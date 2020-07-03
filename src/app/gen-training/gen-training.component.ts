import { Component, OnInit } from '@angular/core';

import { WatsonService } from '../servicies/watson/watson.service';

@Component({
  selector: 'app-gen-training',
  templateUrl: './gen-training.component.html',
  styleUrls: ['./gen-training.component.css']
})
export class GenTrainingComponent implements OnInit {
  queryRes: any;
  filenames: any;

  constructor(
    private watson: WatsonService
  ) { }

  ngOnInit(): void {
    this.filenames = [];
    this.watson.getQueryResults("Come effettua l'azienda l'analisi del contesto")
      .subscribe((data: any) => {
        data.results.forEach(element => {
          //console.log(element);
          this.filenames.push(element.title)
        });
        console.log(this.filenames)
      });


    this.queryRes=[
      "ciao",
      "pino"
    ]
  }

}
