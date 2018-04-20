import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  pets = [];
  message = "";
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this.getAllPets()
  }

  getAllPets(){
    let observable = this._httpService.getAllPets();
    observable.subscribe(data => {
      console.log('Got our pets!', data);
      if(data['message'] == "Success"){
        this.pets = data['data'];
      } else {
        console.log('error');
        this.message = data['error'];
      }
      
    });
  }

}
