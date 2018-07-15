import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectorRef, Component, Inject,
  Input, OnChanges, PLATFORM_ID, SimpleChanges
} from '@angular/core';

@Component({
  selector: 'bc-page-header',
  template: `
    <!-- relative w/h 100%, text-align center -->
    <header class="page-header" [style.background-color]="backgroundColor">
        <!-- absolute left/top 0px, w/h 100% -->
        <div class="cover"
            [ngStyle]="{
              'background-image': (revealImage && imageURL) ? 'url(' + imageURL  + ')' : ''
            }"
            [ngClass]="{
                'reveal-image' : revealImage
            }">
        </div>
        <!-- project the title. Inherits text-align center by default-->
        <ng-content></ng-content>
    </header>
  `,
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnChanges {

  @Input() backgroundColor = 'black';
  @Input() imageURL: string;
  @Input() forceReflow: boolean;

  revealImage = false;

  // UglifyJS strips out unused expressions in --prod mode e.g window.scrollY
  // This is a workaround: the assignment is not considered unused
  unusedExpressionVariable: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private changeDetectorRef: ChangeDetectorRef
  ) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    // ngOnInit not called for reused routing components, so
    // need to use ngOnChanges with a check for the particular property
    if (changes['imageURL']) {
      if (this.isBrowser) {
        this.updateImage();
      }
    }
  }

  updateImage() {
    this.revealImage = false;
    if (this.forceReflow) {
      // Apply data binding - removes reveal-image class
      this.changeDetectorRef.detectChanges();
      // Force a Recalculate Style so the 'reveal-image' style is applied
      // The div.cover element will then have { opactiy: 0 and visibility: hidden)
      this.forceRecalculateStle();
    }

    // Load the image into the browser cache first. When loaded,
    // apply the transition css class and background-image:url() at the
    // same time by setting revealImage=true
    if (this.imageURL) {
      const image: HTMLImageElement = document.createElement('img');
      let self = this;
      image.addEventListener('load', function handleImageLoad() {
        self.revealImage = true;
        image.removeEventListener('load', handleImageLoad);
      });
      image.src = this.imageURL; // begin loading image (to browser cache)
    }
  }

  private forceRecalculateStle() {
    return window.scrollY;
  }

  get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

}
