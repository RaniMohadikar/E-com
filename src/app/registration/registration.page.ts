import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  

 
  regDetails:any=[];
  valSubmit = false;
    regForm:FormGroup
  
    constructor(private formBuilder:FormBuilder) {
      this.regForm = formBuilder.group({
        fullName:['',Validators.required],
        email:['',[Validators.required,Validators.email]],
        passWord:['',Validators.required]
      });
     }
  
    ngOnInit() {
    }
    reg(){
      // this.regDetails.push(this.regForm.value)
      // localStorage.setItem('REG_DETAILS',JSON.stringify(this.regDetails));
      // console.log('Form',this.regForm.value);
      this.valSubmit=true;
      if(this.regForm.valid==true){
        this.regDetails.push(this.regForm.value)
        localStorage.setItem('REGDETAILS', JSON.stringify(this.regDetails));
        this.clear();
        console.log(' reg details - ', this.regForm.controls)
  
      }else{
        console.log('error message');
      }
  
  
    }
    clear(){
      this.regForm.reset();
    }
}
