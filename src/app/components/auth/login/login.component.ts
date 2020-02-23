import { AuthService } from './../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required)
  })

  constructor(private toastr: ToastrService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  login(){
    this.authService.login(this.authForm.value)
                    .then(() => {
                      this.toastr.success("Glad to see you back", "Success",{
                        positionClass: 'toast-top-center'
                      })
                      this.router.navigate(['/clients'])
                    })
                    .catch(err => this.toastr.error(err.message, "Error",{
                      positionClass: 'toast-bottom-left'
                    }))
  }

}
