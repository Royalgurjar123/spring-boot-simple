import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  form: any = {
    id: null,
    firstName: "",
    lastName: "",
    loginId: "",
    password: "",
    rolId: "",
    dob: "",
    preload: [],
    message: "",
  }

  inputerror: any = {};
  fileToUpload: any = null;



  constructor(private httpService: HttpServiceService, private route: ActivatedRoute, private httpCilent: HttpClient) {
    var self = this;
    httpService.getPathVariable(route, function (params: any) {
      self.form.id = params["id"];
    })


  }

  ngOnInit(): void {
    this.preload();
    if (this.form.id && this.form.id > 0) {
      this.display();
    }

  }

  preload() {
    var self = this;
    this.httpService.get('http://localhost:8080/User/preload', function (res: any) {
      self.form.preload = res.result;
    })
  }
  display() {
    var self = this;
    this.httpService.get('http://localhost:8080/User/get/' + this.form.id, function (res: any) {
      self.form = res.result.data;
      console.log(self.form)
    });
  }


  save() {
    var self = this;
    this.httpService.post('http://localhost:8080/User/save', this.form, function (res: any) {
      self.form.message = res.result.message;
      self.inputerror = res.result.inputerror;
      self.myFile();


    })

  }
  onFileSelect(event: any) {
    this.fileToUpload = event.target.files.item(0);
    console.log(this.fileToUpload);
  }

  myFile() {
    var self = this;
    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    return this.httpCilent.post("http://localhost:8080/User/profilePic/" + this.form.id, formData).subscribe(data => {
      console.log(this.fileToUpload);
    }, error => {
      console.log(error);
    });;
  }

}