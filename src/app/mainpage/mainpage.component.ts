import { Component, OnInit } from '@angular/core';
import {HttpserviceService} from "../service/httpservice.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {HttpClient} from "@angular/common/http";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css'],
  providers:[ConfirmationService,MessageService,DatePipe]
})
export class MainpageComponent implements OnInit {

  constructor(private http:HttpserviceService,private datePipe:DatePipe,private httpClient:HttpClient,private confirmationService: ConfirmationService,
              private message:MessageService) { }
  users:string|undefined
  sessionUser:any;
  updateNo: string| undefined;
  updateCourse: string| undefined;
  updateDep: string| undefined;
  selectedData: any;
  username: string|undefined;
  pwd: string|undefined;
  emailList:Array<string>=[];
  mobileList:Array<string>=[];
  displayUpdate:boolean=false;
  products:any[]=[];
  entrollmentNumber:string|undefined;

  ngOnInit(): void {
    this.sessionUser=this.http.user;
    this.users=this.sessionUser.userDetail.applicantName;
    this.emailList=this.http.emailList;
    this.mobileList=this.http.mobileList;
    this.products=this.http.product;
  }

  update(selected: any){
    this.selectedData=selected;
    console.log("check selected data :",this.selectedData);
    this.displayUpdate=!this.displayUpdate;
  }

  updateDetails() {
    if(this.updateCourse&& this.updateNo&&this.updateDep){
      if( !this.mobileList.includes(this.updateNo)){
        this.httpClient.patch("https://jzetqnccfd.execute-api.us-west-1.amazonaws.com/updateStudent",{
          "mobile_number":this.updateNo ,
          "department": this.updateDep,
          "name": this.selectedData.name,
          "course": this.updateCourse,
          "studentEmail":this.selectedData.studentEmail
        }).subscribe(as=>{
          this.productdetails();
          this.ngOnInit();
          this.updateCourse=undefined
          this.updateNo=undefined
          this.updateDep=undefined
          this.message.add({severity:'info', summary: 'Info', detail: 'Student Details are updated'})
          this.displayUpdate=!this.displayUpdate;
        })
      }else {
        console.log("already save")
        this.message.add({severity:'error', summary: 'Error', detail: 'Entered details are duplicated'})
      }
    }else {
      console.log("enter all the details")
      this.message.add({severity:'error', summary: 'Error', detail: 'Please fill all fields'})
    }

  }

  productdetails(){
     this.http.getAllstudent().subscribe(a => {
      this.products = a;
      this.products.forEach(s=>{
        this.emailList.push(s.studentEmail);
        this.mobileList.push(s.mobile_number);
      })

      this.http.product=this.products;
      this.http.emailList=this.emailList;
      this.http.mobileList=this.mobileList;
      console.log("checking emailList :", this.emailList, "moblie ", this.mobileList);
      console.log("checking stud :", this.products);
    })
  }

  deleteuser(email:any){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to issue book ('+email+')',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.httpClient.delete("https://jzetqnccfd.execute-api.us-west-1.amazonaws.com/delete/"+email).subscribe(a=>{
            if(a==1){
              this.message.add({severity:'error', summary: 'Error', detail: 'Request student details are deleted'})
            }
            this.productdetails();
            this.ngOnInit();
          }
        )
      }
    });
  }

}
