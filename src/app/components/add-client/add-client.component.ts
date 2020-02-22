import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  clientForm = new FormGroup({
    firstName: new FormControl("", [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    phone: new FormControl("", Validators.required),
    balance: new FormControl(0, Validators.pattern('[0-9]*'))
  })

  constructor(private toastr: ToastrService, 
              private router: Router,
              private clientService: ClientService) { }

  ngOnInit(): void {
  }


  persistClient(){
    if(this.clientForm.invalid){
      return;
    } 
    this.clientService.save(this.clientForm.value)
                      .then(()=> {
                        this.toastr.success("the client was added successfully", "Success") // , {positionClass: 'toast-bottom-left' } dans ()
                        this.router.navigateByUrl('/clients')
                      })
                      .catch(err => this.toastr.error(err.message, "Error")) 
  }
}
