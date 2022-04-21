import {Component, Inject, OnInit, PLATFORM_ID,} from '@angular/core';
import {CanonicalLinkService, LanguageService} from "rushapp-angular-core";
import {NavigationEnd, Router} from "@angular/router";
import {isPlatformBrowser} from "@angular/common";
import {filter} from "rxjs";
declare var gtag: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private canonicalLinkService: CanonicalLinkService,
    private languageService: LanguageService,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {
    this.languageService.setAvailableLanguages();
    this.languageService.setInitialLanguage();
  }

  public ngOnInit(): void {
    this.canonicalLinkService.setCanonicalURL();
    this.addGtagScript();
  }

  private addGtagScript(): void {
    if (isPlatformBrowser(this.platformId)) {
      const navEndEvent$ = this.router.events.pipe(
        filter(e => e instanceof NavigationEnd)
      );
      navEndEvent$.subscribe((e: NavigationEnd | any) => {
        gtag('config', 'UA-11111111-1', {page_path: e.urlAfterRedirects});
      });
    }
  }
}
