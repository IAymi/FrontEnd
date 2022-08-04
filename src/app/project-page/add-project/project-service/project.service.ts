import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

interface Form {
  nameForm:string;
  detailForm:string;
  imageForm:File
}


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  REST_API:string = 'http://localhost:3000/api';

  constructor(private http:HttpClient) { }

  createProject(projectForm:Form){
    const projectData = new FormData();
    projectData.append('name',projectForm.nameForm)
    projectData.append('detail',projectForm.detailForm)
    projectData.append('imageFile',projectForm.imageForm)
    
    projectData.forEach((value,key) => {
      console.log(key+" "+value)
    });
    
    let API_URL = `${this.REST_API}/projects`
    
    this.http.post(API_URL,projectData).subscribe((res)=>console.log(res))
  
  }

  getAllProject(){
    let API_URL = `${this.REST_API}/projects`
    return this.http.get(API_URL)
  }
}
