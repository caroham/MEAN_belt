import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  getAllPets(){
    return this._http.get('/pets');
  }

  getOnePet(id){
    return this._http.get('/pets/' + id);
  }

  addPet(pet) {
    return this._http.post('/pets', pet);
  }

  updateLike(petId, like) {
    return this._http.put("/update/"+ petId + "/likes", like);
  }

  updatePet(id, pet){
    return this._http.put('/pets/'+ id, pet);
  }

  delete(id){
    return this._http.delete('/pets/' + id);
  }
}
