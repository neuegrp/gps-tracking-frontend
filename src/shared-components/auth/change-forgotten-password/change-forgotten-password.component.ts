import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ROUTING_NAMES} from '../../../shared/constants/routing-names.const';
import {AuthService, NotificationService, ServerValidationFormService} from "rushapp-angular-core";

@Component({
  selector: 'app-change-forgotten-password',
  templateUrl: './change-forgotten-password.component.html',
  styleUrls: ['./change-forgotten-password.component.scss']
})

export class ChangeForgottenPasswordComponent implements OnInit, OnDestroy {
  public changePasswordFormGroup: FormGroup;
  public isSaveNewPasswordRequestCompleted = true;
  private subsRouteQueryParams: Subscription;

  public constructor(
    public serverValidationForm: ServerValidationFormService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService,
  ) { }

  public ngOnInit(): void {
    this.createPasswordForm();
    this.subscribed();
  }
  public ngOnDestroy(): void {
    this.unsubscribed();
  }
  public saveNewPassword(): void {
    this.isSaveNewPasswordRequestCompleted = false;
    this.authService.setNewPassword(this.changePasswordFormGroup.value).subscribe(
      () => {
        this.isSaveNewPasswordRequestCompleted = true;
        this.router.navigate([ROUTING_NAMES.home]);
        this.notificationService.success('PASSWORD_HAS_BEEN_UPDATED', 3000, true);
      },
      () => { this.isSaveNewPasswordRequestCompleted = true; }
    );
  }
  private subscribed(): void {
    this.subsRouteQueryParams = this.route.queryParams.subscribe((params:any) => {
      if (!params.token) {
        this.router.navigate([ROUTING_NAMES.home]);
        this.notificationService.success('TOKEN_IS_EMPTY', 3000, true);
      } else {
        this.changePasswordFormGroup.controls['password_token'].setValue(params.token);
      }
    });
  }
  private unsubscribed(): void {
    if (this.subsRouteQueryParams) {
      this.subsRouteQueryParams.unsubscribe();
    }
  }
  private createPasswordForm(): void {
    this.changePasswordFormGroup = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]],
      password_token: ['', [Validators.required]]
    }, {validator: [this.checkPasswords]})
  }
  private checkPasswords(group: FormGroup): void {
    const pass = group.controls['password'];
    const confirmPass = group.controls['password_confirmation'];

    pass.value === confirmPass.value
      ? confirmPass.setErrors(null)
      : confirmPass.setErrors({ notSame: true })
  }
}
