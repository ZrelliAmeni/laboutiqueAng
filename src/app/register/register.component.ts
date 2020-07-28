import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  Name = ""
  pseudo=""
  Ville=""
  Num = ""
  password=""
  confirmePassword=""

  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit() {
  }



  signup(){


    if(this.pseudo && this.Name && this.password && this.confirmePassword && this.Ville && this.Num ){
      if(this.password == this.confirmePassword){


        let data={
          Pseudo:this.pseudo,
          Name:this.Name,
          Password:this.password,
          Role : "User",
          Ville : this.Ville,
          Num : Number(this.Num),
        }


        let headerss = new HttpHeaders ();
        headerss.append('ContentType', 'application/json');




        this.http.post('http://localhost:8000/Register',
          data, { headers :  headerss })
          .subscribe(res  => {
            let reso : any = res
            if(reso.success){
              this.router.navigate(['/login']);
          }
           else{console.log("same eamil or pseudo")}

          }, (err) => {
            console.log(err)

          });




      }else{console.log("completer tous les champs")}

    }else{console.log("completer tous les champs")}


  }

}

