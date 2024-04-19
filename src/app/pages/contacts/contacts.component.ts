import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { Contacts } from './interface/contacts.interface';
import { ContactsService } from './services/contacts.service';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    NzInputModule,
    FormsModule,
    NzButtonModule,
    NzTableModule,
    NzModalModule,
    CommonModule
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})

export class ContactsComponent {
  value: string = ""
  listOfData: Contacts[] = [];
  isVisible: boolean=false
  name: string = ''
  phone: string = ''

  constructor(
    private ContactsService: ContactsService
  ){}

  ngOnInit(): void {
    this.getContacts()
  }

  getContacts(){
    this.ContactsService.getContacts().subscribe((contacts:Contacts[])=>{

    })
  }
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    const data = {
      name: this.name,
      phone: this.phone
    }
    console.log(data);
    this.name=''
    this.phone=''
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
