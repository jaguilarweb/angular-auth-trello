import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  faBell,
  faInfoCircle,
  faClose,
  faAngleDown
} from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '@services/auth.service';
import { TokenService } from '@services/token.service';
//import { User } from '@models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;

  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;

  user$ = this.authService.user$;

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService
  ) {}

/*   ngOnInit(): void {
    this.authService.getProfile()
    .subscribe(user => {
      this.user = user;
    });
  } */

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isValidToken(){
    console.log(this.tokenService.isValidToken());
  }
}
