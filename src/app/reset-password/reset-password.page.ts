import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from './../_helper/must-match.validator';



@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  passwordDetails:any=[];
  valSubmit = false;
    passwordForm:FormGroup
  
    constructor(private formBuilder:FormBuilder) {
      this.passwordForm = formBuilder.group({
        password:['',[Validators.required,Validators.minLength(6),Validators.maxLength(12)]],
        confirmPassword:['',[Validators.required,] ],
        
        acceptTerms: [false, Validators.requiredTrue]
      
      }, {
        validator: MustMatch('password', 'confirmPassword') 
      });
     }
     get f() { return this.passwordForm.controls; }

  
    ngOnInit() {
    }
    conbtn(){
      // this.passwordDetails.push(this.passwordForm.value)
      // localStorage.setItem('REG_DETAILS',JSON.stringify(this.passwordDetails));
      // console.log('Form',this.passwordForm.value);
      this.valSubmit=true;
      if(this.passwordForm.valid==true){
        this.passwordDetails.push(this.passwordForm.value)
        localStorage.setItem('conBtn', JSON.stringify(this.passwordDetails));
        this.clear();
        console.log(' Password - ', this.passwordForm.controls)
  
      }else{
        console.log('error message');
      }
  
  
    }
    clear(){
      this.passwordForm.reset();
    }

}
