import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {environment} from "../environments/environment";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
// MAIN_COMPONENTS
import { AppComponent } from './app.component';
import { LoginComponent } from '../components/auth/login/login.component';
import { RegistrationComponent } from '../components/auth/registration/registration.component';
import {MapComponent} from "../components/map/map.component";
// SHARED_SERVICES
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {HeaderRequestInterceptor, TokenInterceptor} from "rushapp-angular-core";
// SHARED_COMPONENTS
import {LanguageSwitchingComponent} from "../shared-components/language-switching/language-switching.component";
import {ProgressSpinnerComponent} from "../shared-components/progress-spinner/progress-spinner.component";
import {AlertDialogComponent} from "../shared-components/dialogs/alert-dialog/alert-dialog.component";
import {ChangePasswordComponent} from "../shared-components/auth/change-password/change-password.component";
import {PdfModalDialogComponent} from "../shared-components/dialogs/pdf-modal-dialog/pdf-modal-dialog.component";
import {ResetPasswordComponent} from "../shared-components/auth/reset-password/reset-password.component";
import {ChangeForgottenPasswordComponent} from "../shared-components/auth/change-forgotten-password/change-forgotten-password.component";
//ANGULAR_MATERIAL
import {MatToolbarComponent} from "../shared-components/mat-toolbar/mat-toolbar.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatCardModule} from "@angular/material/card";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatRadioModule} from "@angular/material/radio";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatBadgeModule} from "@angular/material/badge";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatChipsModule} from "@angular/material/chips";
import {MatListModule} from "@angular/material/list";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

const MAIN_COMPONENTS = [
  AppComponent,
  LoginComponent,
  RegistrationComponent,
  ResetPasswordComponent,
  MapComponent,
];
const SHARED_COMPONENTS = [
  LanguageSwitchingComponent,
  ProgressSpinnerComponent,
  AlertDialogComponent,
  ChangePasswordComponent,
  PdfModalDialogComponent,
  ChangeForgottenPasswordComponent,
  MatToolbarComponent,
];
const SHARED_SERVICES = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi : true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderRequestInterceptor,
    multi : true
  },
];
const ANGULAR_MATERIAL_MODULES = [
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatCheckboxModule,
  MatMenuModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatAutocompleteModule,
  MatCardModule,
  MatTooltipModule,
  MatRadioModule,
  MatSnackBarModule,
  MatBadgeModule,
  MatToolbarModule,
  MatChipsModule,
  MatListModule,
  MatSlideToggleModule,
];

@NgModule({
  declarations: [
    AppComponent,
    ...MAIN_COMPONENTS,
    ...SHARED_COMPONENTS,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ...ANGULAR_MATERIAL_MODULES,
  ],
    providers: [
    {provide: 'defaultLanguage', useValue: environment.defaultLanguage},
    {provide: 'languages', useValue: environment.languages},
    {provide: 'apiEndpoint', useValue: environment.apiEndpoint},
    {provide: 'metaTagImage', useValue: environment.metaTagImage},
    ...SHARED_SERVICES
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
