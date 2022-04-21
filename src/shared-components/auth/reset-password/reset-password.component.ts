import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {AuthService, NotificationService} from "rushapp-angular-core";
import {ROUTING_NAMES} from "../../../shared/constants/routing-names.const";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public resetPasswordFormGroup: FormGroup;
  public isResetPasswordRequestCompleted = true;

  public constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
  ) { }

  public ngOnInit(): void {
    this.createLoginForm();
  }
  public resetPasswordHandle(): void {
    this.isResetPasswordRequestCompleted = false;
    this.authService.resetPassword(this.resetPasswordFormGroup.value).subscribe(
      (res) => {
        this.dialog.closeAll();
        this.isResetPasswordRequestCompleted = true;
        this.notificationService.success(res.message, 3000, true);
      },
      () => { this.isResetPasswordRequestCompleted = true; }
    );
  }
  public goToRegistrationPage(): void {
    this.router.navigate([ROUTING_NAMES.registration]);
    this.dialog.closeAll();
  }
  private createLoginForm(): void {
    this.resetPasswordFormGroup = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }
}
