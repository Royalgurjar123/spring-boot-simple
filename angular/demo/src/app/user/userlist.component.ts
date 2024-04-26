import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  form: any = {
    searchParams: {},
    list: [],
    preload: [],
    pageNo: 0,
   deleteParams: {},

  }

  constructor(private httpService: HttpServiceService,private router: Router) {

  }

  ngOnInit(): void {
    this.preload();
    this.search();
  }

  preload() {
    var self = this;
    this.httpService.get('http://localhost:8080/User/preload', function (res: any) {
      self.form.preload = res.result;
    })
  }
  onCheckboxChange(userId: number) {
    console.log('Checkbox with ID', userId, 'is checked/unchecked');
    this.form.deleteParams.id = userId;
  }




  search() {
    console.log('dob =>', this.form.searchParams.dob)
    var self = this;
    this.httpService.post('http://localhost:8080/User/search/' + this.form.pageNo, this.form.searchParams, function (res: any) {
      self.form.list = res.result.data;
    })
  }
  edit(page: any) {
    this.router.navigateByUrl(page);
  }

  delete() {
    var self = this;
    this.httpService.get('http://localhost:8080/User/delete/' + this.form.deleteParams.id, function (res: any) {
      self.form.message = res.result.message;
      self.form.pageNo = 0;
      self.search();
    });

  }
  next() {
    this.form.pageNo++;
    console.log('pageNo => ', this.form.pageNo)
    this.search();
  }

  previous() {
    this.form.pageNo--;
    console.log('pageNo => ', this.form.pageNo)
    this.search();
  }




}