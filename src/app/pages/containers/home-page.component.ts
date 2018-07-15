import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IResolvedData } from '../services/page-resolver.service';
import { AbstractSettingsConsumer } from '../../shared/services/events/settings-event.service';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'bc-home-page',
  template: `
    <div class="page-container">
      <bc-page-header [imageURL]="imageURL" [forceReflow]="forceReflow">
        <h1 class="heading-text">{{title}}</h1>
      </bc-page-header>
      <div>Some Content below the fold</div>
    </div>
  `,
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  imageURL: string;
  title: string;
  forceReflow: boolean;

  private settingsSubscription: ISubscription;

  constructor(
    private route: ActivatedRoute,
    private settingsConsumer: AbstractSettingsConsumer
  ) {
    this.route.data.subscribe((data: { resolvedData: IResolvedData }) => {
      this.imageURL = data.resolvedData.imageURL;
      this.title = data.resolvedData.title;
    });
    this.settingsSubscription = this.settingsConsumer.getUpdates()
      .subscribe(value => {
        this.forceReflow = value.forceReflow;
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.settingsSubscription) {
      this.settingsSubscription.unsubscribe();
    }
  }

}
