import { Component, OnInit } from '@angular/core';
import { course } from 'src/course';
import { student } from 'src/student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  course:course[]=[];
  
  stu:student

  constructor(public service:StudentService) { }

  ngOnInit(): void {
    this.stu=new student();
  }

  getStudents():void{
    this.service.getStudent().subscribe(
      data=>{
        this.course=data;
      }
    )
  }
  

}
