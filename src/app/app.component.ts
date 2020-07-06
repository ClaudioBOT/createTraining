import { Component } from '@angular/core';
import { WatsonService } from './servicies/watson/watson.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  elements: any;
  filenames: any;
  query: string;

  constructor(
    private watson: WatsonService
  ) { }

  ngOnInit(): void {
    this.elements = [0];
    this.filenames = [];

    // da cancellare
    this.filenames = [
      ["LGO-01 LGO - Linee Guida Organizzative ISO9001_2015 - Revisione 1.PDF","Anagrafica processo MIGL - MIsurazioni, analisi e Miglioramento.pdf","RS-2021 Riesame del Sistema Qualità - Anno 2019_1_12.pdf"]
    ]

  }

  getFilename(query) {
    console.log("query");
    let tmp = [];
    this.watson.getQueryResults(query)
      .subscribe((data: any) => {
        data.results.forEach(element => {
          //console.log(element);
          tmp.push(element.extracted_metadata.filename)
        });
        this.filenames.push(tmp);
        console.log(this.filenames);
      }
    );
  }
}
