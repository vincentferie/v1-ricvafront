import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';

import {NavigationItem} from '../../navigation';
import { NextConfig } from '../../../../../utils/config';
import { AppService } from 'projects/tools/src/lib/services/app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent implements OnInit, OnDestroy {
  @Input() item: NavigationItem;
  public nextConfig: any;
  public themeLayout: string;
  public appServiceSubscription: Subscription;
  public itemUrl: string[];

  constructor(
    private location: Location,
    private appService: AppService
  ) {
    this.nextConfig = NextConfig.config;
    this.themeLayout = this.nextConfig['layout'];
  }

  ngOnInit() {
    this.appServiceSubscription = this.appService.appUrl$.subscribe(appUrl => this.itemUrl = ['/', appUrl, ...this.item.url.split('/')]);
  }

  ngOnDestroy(){
    this.appServiceSubscription.unsubscribe();
  }

  closeOtherMenu(event) {
    if (this.nextConfig['layout'] === 'vertical') {
      const ele = event.target;
      if (ele !== null && ele !== undefined) {
        const parent = ele.parentElement;
        const up_parent = parent.parentElement.parentElement;
        const last_parent = up_parent.parentElement;
        const sections = document.querySelectorAll('.pcoded-hasmenu');
        for (let i = 0; i < sections.length; i++) {
          sections[i].classList.remove('active');
          sections[i].classList.remove('pcoded-trigger');
        }

        if (parent.classList.contains('pcoded-hasmenu')) {
          parent.classList.add('pcoded-trigger');
          parent.classList.add('active');
        } else if (up_parent.classList.contains('pcoded-hasmenu')) {
          up_parent.classList.add('pcoded-trigger');
          up_parent.classList.add('active');
        } else if (last_parent.classList.contains('pcoded-hasmenu')) {
          last_parent.classList.add('pcoded-trigger');
          last_parent.classList.add('active');
        }
      }
      if ((document.querySelector('app-navigation.pcoded-navbar').classList.contains('mob-open'))) {
        document.querySelector('app-navigation.pcoded-navbar').classList.remove('mob-open');
      }
    } else {
      setTimeout(() => {
        const sections = document.querySelectorAll('.pcoded-hasmenu');
        for (let i = 0; i < sections.length; i++) {
          sections[i].classList.remove('active');
          sections[i].classList.remove('pcoded-trigger');
        }

        let current_url = this.location.path();
        if (this.location['_baseHref']) {
          current_url = this.location['_baseHref'] + this.location.path();
        }
        const link = "a.nav-link[ href='" + current_url + "' ]";
        const ele = document.querySelector(link);
        if (ele !== null && ele !== undefined) {
          const parent = ele.parentElement;
          const up_parent = parent.parentElement.parentElement;
          const last_parent = up_parent.parentElement;
          if (parent.classList.contains('pcoded-hasmenu')) {
            parent.classList.add('active');
          } else if (up_parent.classList.contains('pcoded-hasmenu')) {
            up_parent.classList.add('active');
          } else if (last_parent.classList.contains('pcoded-hasmenu')) {
            last_parent.classList.add('active');
          }
        }
      }, 500);
    }
  }
}
