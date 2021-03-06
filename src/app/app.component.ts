import { HostListener, Component } from '@angular/core';
import { WatsonService } from './servicies/watson/watson.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  elements: any;
  collection_names: any;
  collection: string;

  constructor(
    private watson: WatsonService
  ) { }

  ngOnInit(): void {
    this.elements = [];
    this.collection_names = [];
    this.watson.getCollectionNames()
      .subscribe((data: any) => {
        this.collection_names = data.collection_names;
      });
    this.collection = "";
    this.addElement();
    this.setSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setSize();
  }

  setSize(){
    if (this.collection != '') {
      document.getElementById('scroll').style.maxHeight = (window.innerHeight - document.getElementById('fixedBottom').clientHeight) + 'px';
    }
    else {
      document.getElementById('scroll').style.maxHeight = "100%";
    }
  }

  showBar(scrollToLast){
    this.setSize();
    setTimeout( () => {
      let querysize = document.getElementById('scroll').clientHeight;
      let fixed = 0;
      if (this.collection != '')  fixed = document.getElementById('fixedBottom').clientHeight;
      let pagesize = window.innerHeight - fixed;
      if (pagesize <= querysize) {
        document.getElementById('scroll').style.overflowY = "auto";
        if (scrollToLast == true) document.getElementById('scroll').scrollTop = document.getElementById('scroll').scrollHeight;
      }
    }, 200);
  }

  getFilename(event, element) {
    if (event.type != "click" && (event.type != "keyup" || event.code != "Enter")) return (false);
    element.query = (<HTMLInputElement>document.getElementById(`query-${element.num}`)).value;
    console.log(element);
    element.filenames = [];
    element.error = undefined;
    element.state = "searching";

    if (element.query != ""){
      this.watson.getQueryResults(element.query, this.collection)
        .subscribe((data: any) => {
          element.state = "ended";
          data.results.forEach(data => {
            element.filenames.push(data.extracted_metadata.filename);
          });
          this.showBar(false);
        }
      );
    }
    else {
        element.error="Non si possono avere domande vuote";
        element.state = "ended";
        this.showBar(false);
    }
  }

  addElement(){
    this.elements.push({
      query:"",
      num: this.elements.length,
      filenames:[],
      show: true,
      state: "wait",
      error: undefined
    });
    this.showBar(true);
  }

  createJSON(){
    let data = { collection : [] };
    this.elements.forEach((element, indexQ) => {
      let tmp = [];
      if (element.show = true){
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
      }
    });
    return (data);
  }

  hideErrorQuery(){
    this.elements.forEach((element) => {
      if (element.query == "" || element.filenames.length > 0) element.show = false;
    });
  }

  sendToCOS(){
    this.hideErrorQuery();
    let file = this.createJSON();
    console.log(file);
    if (file.collection.length > 0){
      this.watson.sendToCOS(file,this.collection)
        .subscribe((data: any) => {
          alert(`Il file è stato salvato come ${data.filename}`);
        }
      );
    }
    else {
      alert("Non ci sono delle domande valide");
    }
  }

  setCollection(collection){
    this.collection = collection;
  }
}
