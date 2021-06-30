import { Component, OnChanges, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.css']
})
export class ChatViewComponent implements OnInit {
  /*
  public userData = {
    photoURL: environment.baseWebUrl+"/assets/img/default-image.png"
  };

  */

  public userData = null;

  chatForm = new FormGroup({
    message: new FormControl('', []),
  });
  
  constructor(public authService: AuthService, public afAuth: AngularFireAuth) { }

  ngOnInit() {
    //this.userData = JSON.parse(localStorage.getItem('user'));
    var currentUser;
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
          currentUser = user;
          localStorage.setItem('user',JSON.stringify(currentUser));
          if(localStorage.getItem('user') !== null){
            this.userData = JSON.parse(localStorage.getItem('user'));
          }
      }else{
        currentUser = {
          photoURL: environment.baseWebUrl+"/assets/img/default-image.png"
        };
        this.userData = currentUser;
      }
    });
    
  }

  sendMessage(){
    console.log(this.chatForm.value.message);
    this.chatForm.reset();
  }

  logout(){
    this.authService.SignOut();
  }

}
