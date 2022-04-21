import {IEnvironment} from '../shared/interfaces/environment.interface';

export const environment: IEnvironment = {
  production: false,
  staging: true,
  apiEndpoint: 'http://127.0.0.1:8000/',
  languages: {
    en: 'en',
    de: 'de',
  },
  defaultLanguage: 'en',
  metaTagImage: 'storage/logo.png'
};
