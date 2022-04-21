import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ROUTING_NAMES} from '../shared/constants/routing-names.const';
import {LoginComponent} from "../components/auth/login/login.component";
import {AuthorizedGuard} from "../shared/guards/authorized.guard";
import {MapComponent} from "../components/map/map.component";
import {AuthGuard} from "../shared/guards/auth.guard";

const routes: Routes = [
  {
    path: ROUTING_NAMES.home,
    canActivate: [AuthGuard],
    component: MapComponent,
  },
  {
    path: ROUTING_NAMES.login,
    canActivate: [AuthorizedGuard],
    component: LoginComponent,
  },
  // {
  //   path: ROUTING_NAMES.registration,
  //   canActivate: [AuthorizedGuard],
  //   component: RegistrationComponent,
  // },
  // {
  //   path: ROUTING_NAMES.set_new_password,
  //   canActivate: [AuthorizedGuard],
  //   component: ChangeForgottenPasswordComponent,
  // },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      initialNavigation: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
