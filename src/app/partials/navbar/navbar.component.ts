import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser = null

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.authService.userAuthenticated().subscribe(user => this.currentUser = user)
  }

  logout(){
    this.authService.logout()
                    .then(() => {
                      this.toastr.info("Hope to See u soon", "Info",{
                        positionClass: 'toast-top-center'
                      })
                      this.router.navigateByUrl('/login')
                    })
                    .catch(err => this.toastr.warning(err.message, "Warning",{
                      positionClass: 'toast-bottom-left'
                    }))
  }
}
