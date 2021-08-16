import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {UsersService} from "../../services/users.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent {
  users: any;

  constructor(private authService: AuthService, private router: Router, private usersService: UsersService) {}

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getUsers(): void {
    this.usersService.getUsers().subscribe(data => this.users = data);
    console.log('users', this.users);
  }
}
