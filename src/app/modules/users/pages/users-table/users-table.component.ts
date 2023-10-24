import { Component, OnInit } from '@angular/core';

import { DataSourceUser } from './data-source';
import { UsersService } from '@services/users.service';
import { User } from '@models/user.model';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html'
})
export class UsersTableComponent implements OnInit  {

  dataSource = new DataSourceUser();
  columns: string[] = ['id', 'avatar', 'name', 'email'];
  user: User | null = null;

  constructor(
    private userService: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userService.getUser()
    .subscribe(users => {
      this.dataSource.init(users);
    })
    this.authService.user$
    .subscribe(user =>{
      this.user = user;
    })

  }

}
