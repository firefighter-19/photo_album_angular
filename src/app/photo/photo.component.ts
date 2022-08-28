import { IPhoto } from './../api/api.types';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { CurvyPath } from 'svg-dom-arrows';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoComponent implements AfterViewInit {
  @Input()
  photo!: IPhoto;
  @ViewChild('end') end!: ElementRef;
  constructor() {}
  ngAfterViewInit(): void {
    const options = {
      start: {
        element:
          this.end.nativeElement.parentElement.parentElement.parentElement
            .parentElement.firstChild, //TODO find another way to solve it. IMPORTANT -> ElementRef variant doesn't work 'https://stackoverflow.com/questions/64409768/elementref-for-viewchild-of-ancestor-undefined'
        position: {
          top: 0.5,
          left: 1,
        },
      },
      end: {
        element: this.end.nativeElement,
        position: {
          top: 0.5,
          left: 0,
        },
      },
      style: 'stroke:black;stroke-width:4;fill:transparent',
      appendTo: document.body,
    };
    new CurvyPath(options);
  }
}
