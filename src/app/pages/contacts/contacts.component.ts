import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { Contacts } from './interface/contacts.interface';
import { ContactsService } from './services/contacts.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    NzInputModule,
    FormsModule,
    NzButtonModule,
    NzTableModule,
    NzModalModule,
    CommonModule,
    NzMessageModule,
    NzPopconfirmModule,
    NzDropDownModule,
    NzIconModule
  ],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
  value: string = "";
  listOfData: Contacts[] = [];
  listOfDataTemp: Contacts[] = [];
  isVisible: boolean = false;
  name: string = '';
  phone: string = '';
  isEditing: boolean = false;
  editingId: string | undefined ;

  constructor(
    private contactsService: ContactsService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.contactsService.getContacts().subscribe((contacts: Contacts[]) => {
      this.listOfData = contacts;
      this.listOfDataTemp = contacts;
    });
  }

  createContact(): void {
    const payload: Contacts = {
      name: this.name,
      phone: this.phone
    };

    this.contactsService.postContacts(payload).subscribe(_ => {
      this.message.success('Contacto guardado');
      this.getContacts();
    });
  }

  deleteContact(_id: string): void {
    this.contactsService.deleteContacts(_id).subscribe(_ => {
      this.message.success('Contacto eliminado');
      this.getContacts();
    });
  }

  updateContact(_id: string, payload:Contacts): void {
    this.contactsService.editContacts(payload,_id).subscribe(_ => {
      this.message.success('Contacto actualizado');
      this.getContacts();
    });
  }

  search(): void {
    this.listOfData = this.listOfDataTemp.filter((contact:Contacts)=> contact.name.toLowerCase().indexOf(this.value.toLowerCase().trim())>-1)
  }

  showModal(isEditing: boolean, _id?: string): void {
    this.isEditing = isEditing;
    if (!isEditing) {
      this.isVisible = true;
      this.resetForm();
    } else {
      this.isVisible = true;
      const infoContact = this.listOfData.find(contact => contact._id === _id);
      if (infoContact) {
        this.name = infoContact.name;
        this.phone = infoContact.phone;
        this.editingId = _id;
      }
    }
  }

  handleOk(): void {
    if (this.name !== '' && this.phone !== '') {
      if (this.isEditing) {
        const payload={
          name: this.name,
          phone:this.phone
        }
          this.updateContact(this.editingId || '', payload)
        
      } else {
        this.createContact();
      }
      this.resetForm();
      this.isVisible = false;
    }
  }

  resetForm(): void {
    this.name = '';
    this.phone = '';
    this.editingId = undefined;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.resetForm();
  }
}