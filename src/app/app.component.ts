import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractSettingsManager } from './shared/services/events/settings-event.service';
import { MatCheckboxChange } from '@angular/material';

@Component({
  selector: 'bc-root',
  templateUrl: './app.component.html',
  styles: [`
    button.load {
      position: fixed;
      top: 20px;
      left: 20px;
      z-index: 1;
    }
    button.reuse {
      position: fixed;
      top: 20px;
      left: 150px;
      z-index: 1;
    }
    .reflow {
      position: fixed;
      top: 68px;
      left: 22px;
      z-index: 1;
    }

  `]
})
export class AppComponent implements OnInit {

  title = 'bc';
  reflowChecked; // bind the intiial value to template

  constructor(
    private router: Router,
    private settingsEventBroadcaster: AbstractSettingsManager
  ) {

  }

  ngOnInit(): void {
    this.reflowChecked = true;
    this.settingsEventBroadcaster.initSettings({forceReflow: true});
  }

  loadNewPage(event: MouseEvent) {
    const currentURL = this.router.url;
    let url = '';
    if (currentURL.substr(1) === 'page1') {
      url = 'page2';
    } else {
      url = 'page1';
    }

    this.router.navigateByUrl(url);
  }

  loadReusedRoute(event: MouseEvent) {
    const currentURL = this.router.url;
    let url = '';
    if (currentURL.substr(1) !== 'reuse/stars') {
      url = 'reuse/stars';
    } else {
      url = 'reuse/galaxies';
    }
    this.router.navigateByUrl(url);
  }

  toggleReflow(event: MatCheckboxChange) {
    let value = event.checked;
    this.settingsEventBroadcaster.forcedReflow = value;
  }
}
