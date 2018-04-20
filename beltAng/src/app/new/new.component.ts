import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newPet = {name: "", type: "", desc: "", skills: [{skill: ""}, {skill: ""}, {skill: ""}]};
  skill1 = "";
  skill2 = "";
  skill3 = "";
  messages = [];
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
  }

  submit(){
    this.messages = [];
    console.log( "in submit! data: ", this.newPet, this.skill1, this.skill2, this.skill3);
    if(this.skill1 != ""){
      this.newPet.skills[0].skill = this.skill1;
    }
    if(this.skill2 != ""){
      this.newPet.skills[1].skill = this.skill2;
    }
    if(this.skill3 != ""){
      this.newPet.skills[2].skill = this.skill3;
      // this.newPet.skills.push({skill: this.skill3});
    }
    console.log("new pet dict after skill check: ", this.newPet);

    let observable = this._httpService.addPet(this.newPet);
    observable.subscribe(data => {
      console.log('new pet data: ', data);
      if(data['message'] == "Success"){
        console.log('success!');
        this.goHome();
      } else {
        console.log("errors :(",  data['error']['errors']);
        if(data['error']['errors']['name']['kind']=="unique") {
          this.messages.push("Pet name must be unique");
        }
        else if (data['error']['errors']['name']){
          this.messages.push(data['error']['errors']['name']['message']);
        }
        if(data['error']['errors']['type']) {
          this.messages.push(data['error']['errors']['type']['message']);
        }
        if(data['error']['errors']['desc']) {
          this.messages.push(data['error']['errors']['desc']['message']);
        }

        console.log("after ifs, messages: ", this.messages);
      }
    });
  }

  goHome() {
    this._router.navigate(['/']);
  }
}
