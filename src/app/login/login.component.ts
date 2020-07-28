import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  pseudo=""
  password=""

  constructor(
    private http: HttpClient,
    private router: Router,) {

  }

  ngOnInit() {

    localStorage.removeItem("Role");
    localStorage.removeItem("user");
    localStorage.removeItem("logged");




  }


  Login(){


    if(this.pseudo && this.password){

      let data={
        pseudo:this.pseudo,
        password:this.password
      }


      let headerss = new HttpHeaders ();
      headerss.append('ContentType', 'application/json');




      this.http.post('http://localhost:8000/Login',
        data, { headers :  headerss })
        .subscribe(res  => {

          let reso : any = res
          if(reso.success){
            localStorage.setItem("role",reso.user.role)
            localStorage.setItem("user",JSON.stringify(reso.user))
            localStorage.setItem("logged","true")
            var Command = [];
            localStorage.setItem( 'Commandes', JSON.stringify(Command));
            console.log(reso.user.status)
            if(reso.user.role=='user' && reso.user.status)
              //this.router.navigate(['/Accueil'])
                console.log("saluut1")


            else if (reso.user.role=='Admin')
            {console.log("saluut")
              // this.router.navigate(['/list_users'])

            }

          }
          else{this.Notification('Mot de passe ou Pseudo erroné','danger')
            $.hideAll()}

        }, (err) => {



        });




    }}



  Notification(message,color){

    $.notify({
      icon: "notifications",
      message: message,
      autoHide:500

    },{
      type: color,
      placement: {
        from: 'top',
        align: 'center'
      },
      hideAfter:500,
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });

  }




}

