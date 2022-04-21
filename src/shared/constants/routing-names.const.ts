import {IRoutingName} from '../interfaces/routing-name.interface';

const MAIN_ROUTES = {
  home: '',
  login: 'login',
  registration: 'registration',
  set_new_password: 'set-new-password',
};

export const ROUTING_NAMES: IRoutingName = {
  ...MAIN_ROUTES,
};
