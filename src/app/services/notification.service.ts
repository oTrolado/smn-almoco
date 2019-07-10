import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  listar(user) {
    return this.http.get('http://gaia-smn.herokuapp.com/notification/' + user);
  }

  ler(notifications) {
    return this.http.put('http://gaia-smn.herokuapp.com/notification/',  notifications);
  }

  apagar(notifications) {
    return this.http.delete('http://gaia-smn.herokuapp.com/notification/' + notifications);
  }
}
