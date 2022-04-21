import {IEnvironment} from '../shared/interfaces/environment.interface';

export const environment: IEnvironment = {
  production: true,
  staging: false,
  apiEndpoint: 'https://api.gps-tracking.dev.neuecloud.de/',
  languages: {
    en: 'en',
    de: 'de',
  },
  defaultLanguage: 'en',
  metaTagImage: 'storage/logo.png'
};
