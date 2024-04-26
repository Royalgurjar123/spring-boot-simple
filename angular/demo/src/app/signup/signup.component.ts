import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  form: any = {
    data: {},
    message: "",
    preload: []


  }
  inputerror: any = {}

  constructor(private httpClient: HttpClient,private httpService: HttpServiceService) {

  }
  ngOnInit(): void {
    this.preload();
  }

  preload() {
    var self = this;
    this.httpService.get('http://localhost:8080/User/preload', function (res: any) {
      self.form.preload = res.result;
    })
  }



  signUp() {
    var self = this;
    this.httpClient.post('http://localhost:8080/Auth/signUp', this.form.data).subscribe((res: any) => {
      self.form.message = res.result.message;
    })

  }

}