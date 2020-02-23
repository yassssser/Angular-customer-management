import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  authForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required)
  })

  constructor(private toastr: ToastrService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  register(){
    this.authService.register(this.authForm.value)
                    .then(() => {
                      this.toastr.success("Welcome to your new account", "Success",{
                        positionClass: 'toast-top-center'
                      })
                      this.router.navigate(['/clients'])
                    })
                    .catch(err => this.toastr.error(err.message, "Error",{
                      positionClass: 'toast-bottom-left'
                    }))
  }

}
