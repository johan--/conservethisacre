import { Component, ElementRef, Inject, Input, OnInit, Output, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'conserve-panorama-preview',
  templateUrl: './panorama-preview.component.html',
  styleUrls: ['./panorama-preview.component.scss']
})
export class PanoramaPreviewComponent implements OnInit {
  @ViewChild('preview') previewRef: ElementRef;

  @Input() url;
  @Output() close = new Subject<void>();

  constructor(@Inject(PLATFORM_ID) private platformId) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const viewer = window['pannellum'].viewer(this.previewRef.nativeElement, {
        'type': 'equirectangular',
        'panorama': this.url,
        'autoLoad' : true
      });

      console.log(viewer);
    }
  }
}
