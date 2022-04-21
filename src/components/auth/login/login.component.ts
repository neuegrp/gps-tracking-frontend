import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ROUTING_NAMES} from '../../../shared/constants/routing-names.const';
import {Router} from '@angular/router';
import {ResetPasswordComponent} from "../../../shared-components/auth/reset-password/reset-password.component";
import {CustomAuthService} from "../../../shared/services/custom-auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginFormGroup: FormGroup;
  public isLoginRequestCompleted = true;

  public constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private customAuthService: CustomAuthService,
      private dialog: MatDialog,
  ) { }

  public ngOnInit(): void {
    this.createLoginForm();
  }
  public loginHandle(): void {
    this.isLoginRequestCompleted = false;
    this.customAuthService.login(this.loginFormGroup.value).subscribe(
        () => {
          this.isLoginRequestCompleted = true;
          this.router.navigate([ROUTING_NAMES.home]);
        },
        //TODO - restore it
        // () => { this.isLoginRequestCompleted = true; }
        () => {
          //TODO - delete it
          localStorage.setItem('token', 'value');
          this.router.navigate([ROUTING_NAMES.home]);
        }
    );
  }
  public goToRegistrationPage(): void {
    this.router.navigate([ROUTING_NAMES.registration]);
  }
  public openResetPasswordDialog(): void {
    this.dialog.open(ResetPasswordComponent, {
      width: '460px',
    });
  }
  private createLoginForm(): void {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    });
  }
}
