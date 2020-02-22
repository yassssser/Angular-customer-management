import { ToastrService } from 'ngx-toastr';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  clientForm = new FormGroup({
    firstName: new FormControl("", [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    phone: new FormControl("", Validators.required),
    balance: new FormControl(0, Validators.pattern('[0-9]*'))
  })
  
  id: string =""

  constructor(private route: ActivatedRoute,
             private clientService: ClientService,
             private router: Router,
             private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id
      this.clientService.getOne(params.id).subscribe((res: Client) => this.clientForm.patchValue(res))
    })
  }

  updateClient(){
      let data = {
         ...this.clientForm.value,
          id: this.id
        }
      this.clientService.update(data)
                        .then(() => {
                          this.toastr.info("the client was updated successfully", "Success", {
                            positionClass : 'toast-bottom-left'
                          })
                          this.router.navigate(['/clients'])
                        })
                        .catch(err => this.toastr.error(err.message, "Error"))
  }
}
