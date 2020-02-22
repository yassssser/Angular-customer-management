import { ToastrService } from 'ngx-toastr';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {

  clients: Client[] = []
  constructor(private toastr: ToastrService, private clientService: ClientService) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.clientService._getAll().subscribe((res : Client[]) => this.clients = res)
  }

  destroyClient(id: string){

     Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.clientService.delete(id)
        .then(() => this.toastr.warning("the client was deleted successfully", "Success", {
          positionClass : 'toast-top-center'
        }))
        .catch(err => this.toastr.success(err.message, "Error") )

      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: 'Cancelled!',
          text: 'Your imaginary file is safe :)',
          icon: 'error',
          timer: 1500
        })
      }
    })
  }
}
