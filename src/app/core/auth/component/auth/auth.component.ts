import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AuthService } from '../../service/auth.service';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { SESSION } from '../../../../shared/constants/session.constants';
import { Router } from '@angular/router';



@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    NzInputModule,
    FormsModule,
    NzIconModule,
    NzDividerModule,
    NzFormModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzMessageModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  passwordVisible = false;
  password?: string;
  email?: string;

  constructor(
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router
  ) {
  }

  login() {
    const id = this.message.loading('Cargando..', { nzDuration: 0 }).messageId;
    const data = {
      email: this.email,
      password: this.password
    }

    this.authService.loginUser(data).subscribe({
      next: (response) => {
        this.message.remove(id);
        this.message.success('Inicio exitoso')
        console.log(response.token);
        if (response.token !== undefined) {
          localStorage.setItem(SESSION.localStorage, JSON.stringify(response));
          this.router.navigate(['/welcome'])
        } else {
          console.error('El token de respuesta es undefined');
        }
        
      },
      error: (error: any) => {
        console.log(error);

        this.message.remove(id);
        this.message.error(error.error.message);
      }
    })
  }

}
