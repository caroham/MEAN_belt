import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  pet = {_id: "", skills: []};
  messages = [];

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
          this.messages.push(data['error']['message']);
        }
      });
    });
  }


  submit(){
    this.messages = [];
    console.log("in submit: ", this.pet);
    let observable = this._httpService.updatePet(this.pet._id, this.pet);
    observable.subscribe(data => {
      if(data['message'] == "Success") {
        console.log('success!', this.pet);
        this.details();
      } else {
        console.log('error, ', data['error']);
        if(data['error']['errors']['name']){
          this.messages.push(data['error']['errors']['name']['message']);
        }
        if(data['error']['errors']['type']) {
          this.messages.push(data['error']['errors']['type']['message']);
        }
        if(data['error']['errors']['desc']) {
          this.messages.push(data['error']['errors']['desc']['message']);
        }
        console.log("messages after ifs: ", this.messages);
      }
    });
  }



  details(){
    console.log("in details func, id: ", this.pet._id)
    this._router.navigate(['/details/'+this.pet._id]);
  }

}
