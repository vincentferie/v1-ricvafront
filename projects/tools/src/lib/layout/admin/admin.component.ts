import { Component, NgZone, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { ToastrService } from '../../services/toastr.service';
import { NextConfig } from '../../utils';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public nextConfig: any;
  public navCollapsed: boolean;
  public navCollapsedMob: boolean;
  public windowWidth: number;
  public position: Observable<string>;

  constructor(
    private zone: NgZone,
    private location: Location,
    private toastrService: ToastrService
  ) {
    this.nextConfig = NextConfig.config;
    let currentURL = this.location.path();
    const baseHerf = this.location['_baseHref'];
    if (baseHerf) {
      currentURL = baseHerf + this.location.path();
    }

    this.windowWidth = window.innerWidth;

    if ((currentURL === baseHerf + '/layout/collapse-menu'
      || currentURL === baseHerf + '/layout/box')
      && (this.windowWidth >= 992 && this.windowWidth <= 1024)) {
      this.nextConfig.collapseMenu = true;
    }

    this.navCollapsed = (this.windowWidth >= 992) ? this.nextConfig.collapseMenu : false;
    this.navCollapsedMob = false;

    this.position = this.toastrService.position;
  }

  ngOnInit() {
    if (this.windowWidth < 992) {
      this.nextConfig.layout = 'vertical';
      setTimeout(() => {
        document.querySelector('.pcoded-navbar').classList.add('menupos-static');
        (document.querySelector('#nav-ps-next') as HTMLElement).style.maxHeight = '100%'; // 100% amit
      }, 500);
    }
  }

  navMobClick() {
    if (this.windowWidth < 992) {
      if (this.navCollapsedMob && !(document.querySelector('app-navigation.pcoded-navbar').classList.contains('mob-open'))) {
        this.navCollapsedMob = !this.navCollapsedMob;
        setTimeout(() => {
          this.navCollapsedMob = !this.navCollapsedMob;
        }, 100);
      } else {
        this.navCollapsedMob = !this.navCollapsedMob;
      }
    }
  }
}
