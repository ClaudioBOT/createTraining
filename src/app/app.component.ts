import { HostListener, Component } from '@angular/core';
import { WatsonService } from './servicies/watson/watson.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  elements: any;

  constructor(
    private watson: WatsonService
  ) { }

  ngOnInit(): void {
    this.elements = [];
    this.addElement();
    this.setSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setSize();
  }

  setSize(){
    document.getElementById('scroll').style.maxHeight = (window.innerHeight - document.getElementById('fixedBottom').clientHeight) + 'px';
  }

  showBar(scrollToLast){
    setTimeout( () => {
      let querysize = document.getElementById('scroll').clientHeight;
      let pagesize = window.innerHeight - document.getElementById('fixedBottom').clientHeight;
      if (pagesize <= querysize) {
        document.getElementById('scroll').style.overflowY = "auto";
        if (scrollToLast == true) document.getElementById('scroll').scrollTop = document.getElementById('scroll').scrollHeight;
      }
    }, 200);
  }

  getFilename(element) {
    element.query = (<HTMLInputElement>document.getElementById(`query-${element.num}`)).value;
    console.log(element);
    element.filenames = [];

    this.watson.getQueryResults(element.query)
      .subscribe((data: any) => {
        data.results.forEach(data => {
          element.filenames.push(data.extracted_metadata.filename);
        });
        this.showBar(false);
      }
    );
  }

  addElement(){
    this.elements.push({
      query:"",
      num: this.elements.length,
      filenames:[]
    });
    this.showBar(true);
  }

  createJSON(){
    let data = { collection : [] };
    this.elements.forEach((element, indexQ) => {
      let tmp = [];
      element.filenames.forEach((filename, indexF) => {
        //console.log(document.getElementById(`check-${indexQ}-${indexF}`).checked);
        if ((<HTMLInputElement>document.getElementById(`check-${indexQ}-${indexF}`)).checked == true){ // (<HTMLInputElement> severve perchè semnnò typesafe stampa errore, quando in realt non c'è
          tmp.push(filename);
        }
      });
      data.collection.push({
          query: element.query,
          expected_result: tmp
      });
    });
    return (data);
  }

  sendToCOS(){
    let file = this.createJSON();
    console.log(file);
    this.watson.sendToCOS(file)
      .subscribe((data: any) => {
        console.log(data)
        /*
        data.results.forEach(data => {
          console.log(data);
        });
        */
      }
    );
  }
}
