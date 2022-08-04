import { Component, OnInit } from '@angular/core';
import { ProjectService } from './add-project/project-service/project.service';

// interface Project{
//   _id:string
//   name:string;
//   detail:string;
//   image:string;
//   __v:number
// }

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})

export class ProjectPageComponent implements OnInit {

  constructor(private service : ProjectService) { }
  data:any = [] //จำใจใช้any
  ngOnInit(): void {
    const data$ = this.service.getAllProject()
    data$.subscribe((res)=>{
      console.log(res)
      this.data = res
    })
  }
}
