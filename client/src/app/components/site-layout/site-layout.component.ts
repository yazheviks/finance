import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent {

  constructor(private authService: AuthService, private router: Router, private usersService: UsersService) {}

  logOut(): void {
    console.log('here');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getUsers(): void {
    this.usersService.getUsers();
    console.log('here');
  }
}
