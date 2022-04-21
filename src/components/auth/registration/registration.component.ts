import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ROUTING_NAMES} from '../../../shared/constants/routing-names.const';
import {ServerValidationFormService} from "rushapp-angular-core";
import {CustomAuthService} from "../../../shared/services/custom-auth.service";
declare var gtag: any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public registerFormGroup: FormGroup;
  public isRegistrationRequestCompleted = true;

  public constructor(
      public serverValidationForm: ServerValidationFormService,
      private router: Router,
      private formBuilder: FormBuilder,
      private customAuthService: CustomAuthService,
  ) { }

  public ngOnInit(): void {
    this.createRegisterForm();
  }
  public registrationHandle(): void {
    this.isRegistrationRequestCompleted = false;
    this.customAuthService.register(this.registerFormGroup.value).subscribe(
        () => {
          this.isRegistrationRequestCompleted = true;
          this.gtagRegistrationSuccessful();
          this.router.navigate([ROUTING_NAMES.home]);
        },
        (res) => {
          this.isRegistrationRequestCompleted = true;
          if (res.status === 422) {
            this.serverValidationForm.showErrors(res.error.errors, this.registerFormGroup.controls);
          }
        }
    );
  }
  public goToLoginPage(): void {
    this.router.navigate([ROUTING_NAMES.login]);
  }
  private createRegisterForm(): void {
    this.registerFormGroup = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      password_confirmation: [''],
      usage_policy: [false, [Validators.requiredTrue]],
    }, {validator: [this.checkPasswords, this.checkUsagePolicy]});
  }
  private checkPasswords(group: FormGroup): void {
    const pass = group.controls['password'];
    const confirmPass = group.controls['password_confirmation'];

    pass.value === confirmPass.value
        ? confirmPass.setErrors(null)
        : confirmPass.setErrors({ notSame: true });
  }
  private checkUsagePolicy(group: FormGroup): void {
    const usagePolicy = group.controls['usage_policy'];

    usagePolicy.value
        ? usagePolicy.setErrors(null)
        : usagePolicy.setErrors({ notUsagePolicy: true });
  }
  private gtagRegistrationSuccessful(): void {
    gtag('event', 'TRACK_REGISTRATION_SUCCESSFUL', {
      event_category: 'registration',
      event_action: 'form submission',
      event_label: 'registration successful',
    });
  }
}
