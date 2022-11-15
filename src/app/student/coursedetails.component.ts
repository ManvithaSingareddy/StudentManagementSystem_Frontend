import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { course } from 'src/course';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-coursedetails',
  templateUrl: './coursedetails.component.html',
  styleUrls: ['./coursedetails.component.css']
})
export class CoursedetailsComponent implements OnInit {
  id?:number;
  cou1:course;

  constructor(private activatedRoute:ActivatedRoute,private http:HttpClient,public ser:StudentService) { }

  ngOnInit(): void {
    let idparam=this.activatedRoute.snapshot.paramMap.get('id');
    this.id=idparam?+idparam:0;
    this.ser.getCourseDetails(this.id).subscribe(
      data=>{
        this.cou1=data;
      }
    );
  }

}
