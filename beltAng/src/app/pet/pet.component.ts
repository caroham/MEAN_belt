import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent implements OnInit {
  pet = {_id: ""};
  message = "";
  likePressed = false;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this.getOnePet()
  }

  getOnePet(){
    this._route.params.subscribe((params: Params) => {
      console.log(params['id']);
      let observable = this._httpService.getOnePet(params['id']);
      observable.subscribe(data => {
        if(data['message'] == "Success") {
          console.log('got the pet', data);
          this.pet = data['data'];
        } else {
          this.message = data['error']['message']
        }
      });
    });
  }

  like() {
    if(this.likePressed == false) {
      console.log('in like, pet id: ', this.pet._id);
      let like = {like: 1};
      let observable = this._httpService.updateLike(this.pet._id, like);
      observable.subscribe(data => {
        if(data['message'] == "Success") {
          console.log("success");
          this.getOnePet();
          this.likePressed = true;
        } else {
          this.message = data['error']['message']
        }
      });
    }
  }

  delete() {
    console.log('in delete, pet id: ', this.pet._id);
    let observable = this._httpService.delete(this.pet._id);
    observable.subscribe(data => {
      if(data['message'] == "Success") {
        console.log("success");
        this.goHome();
      } else {
        this.message = data['error']['message']
      }
    });
  }

  goHome() {
    this._router.navigate(['/']);
  }

}
