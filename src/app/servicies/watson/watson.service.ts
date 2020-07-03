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
    this.apiUrl = "https://eu-de.functions.cloud.ibm.com/api/v1/web/a460e7f1-f116-4da3-bd5f-80a00b00c435/Watson/DiscoveryNLQ.json"
  }

  getQueryResults (query){
    return this.http.get(this.apiUrl, {
      params: {
        query: query
      }
    });
  }
}
