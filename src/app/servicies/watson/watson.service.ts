import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WatsonService {
  apiUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.apiUrl = "https://eu-de.functions.cloud.ibm.com/api/v1/web/a460e7f1-f116-4da3-bd5f-80a00b00c435"
  }

  getQueryResults (query){
    return this.http.get( this.apiUrl + "/Watson/DiscoveryNLQ.json", {
      params: {
        query: query
      }
    });
  }

  sendToCOS(data) {
    return this.http.get(this.apiUrl + "/Watson/WriteCOS.json", {
      params: { file: JSON.stringify(data)}
    });
  }
}
