import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  otpDetails:any=[];
  valSubmit = false;
    otpForm:FormGroup
  
    constructor(private formBuilder:FormBuilder) {
      this.otpForm = formBuilder.group({
        coln1:['',Validators.required],
        coln2:['',Validators.required],
        coln3:['',Validators.required],
        coln4:['',Validators.required],
        
      });
     }
  
    ngOnInit() {
    }
    otp(){
      // this.otpDetails.push(this.otpForm.value)
      // localStorage.setItem('REG_DETAILS',JSON.stringify(this.otpDetails));
      // console.log('Form',this.otpForm.value);
      this.valSubmit=true;
      if(this.otpForm.valid==true){
        this.otpDetails.push(this.otpForm.value)
        localStorage.setItem('OTP', JSON.stringify(this.otpDetails));
        this.clear();
        console.log(' OTP - ', this.otpForm.controls)
  
      }else{
        console.log('error message');
      }
  
  
    }
    clear(){
      this.otpForm.reset();
    }
}

  


