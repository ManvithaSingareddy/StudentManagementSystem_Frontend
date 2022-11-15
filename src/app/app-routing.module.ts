import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursedetailsComponent } from './student/coursedetails.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  {
    path:'getStudents',
    component:StudentComponent
  },
  {
    path:'coursedetails/:id',
    component: CoursedetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
