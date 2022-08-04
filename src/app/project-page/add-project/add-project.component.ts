import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { ProjectService } from './project-service/project.service';



@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})



export class AddProjectComponent implements OnInit {

  constructor(
    private service : ProjectService) 
    
  {}
  
  
  projectForm!: FormGroup;

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      nameForm : new FormControl(),
      detailForm : new FormControl(),
      imageForm : new FormControl()
  })
  }

  checkInput(){
    console.log(this.projectForm?.value)
    console.log(this.projectForm)
  }

  addProject(){
    this.service.createProject(this.projectForm.value)
  }



  
  selectedFile!: string;

  fileSelected(event:Event){ //ไม่ค่อยเข้าใจ TT

    const fileList = (event.target as HTMLInputElement).files;

    if(fileList !== null){
      const file = fileList[0]
      this.projectForm.patchValue({imageForm:file})
      const allowedMimeTypes = ["image/png" , "image/jpeg","image/jpg"];
      if(file && allowedMimeTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = () => {
          this.selectedFile = reader.result as string
        }
        reader.readAsDataURL(file);
      }
    }
      
    
    
    
    
  }
}
