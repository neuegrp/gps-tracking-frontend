import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "rushapp-angular-core";
import {ROUTING_NAMES} from "../../shared/constants/routing-names.const";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-mat-toolbar',
  templateUrl: './mat-toolbar.component.html',
  styleUrls: ['./mat-toolbar.component.scss']
})
export class MatToolbarComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private translateService: TranslateService,
  ) { }

  public isUserAuth(): boolean {
    return this.authService.isLoggedIn();
  }
  public goToLoginPage(): void {
    this.router.navigate([ROUTING_NAMES.login]);
  }
  public goToRegistrationPage(): void {
    this.router.navigate([ROUTING_NAMES.registration]);
  }
  public logout(): void {
    if (confirm(
      this.translateService.instant('ARE_YOU_SURE_THAT_YOU_WANT_TO_GO_OUT?')
    )) {
      //TODO change it
      // this.authService.backendLogout();
      this.authService.frontendLogout();
      this.goToLoginPage();
    }
  }
}
