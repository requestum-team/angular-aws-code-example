import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'cropped-text',
  templateUrl: './cropped-text.component.html',
  styleUrls: ['./cropped-text.component.scss']
})
export class CroppedTextComponent implements OnChanges, AfterViewInit {
  @ViewChild('viewedText') viewedText: ElementRef<HTMLSpanElement>;
  @ViewChild('croppedText') croppedText: ElementRef<HTMLSpanElement>;
  @Input() text: string = '';
  shouldShowTooltip = false;

  constructor(private _cdr: ChangeDetectorRef) {}

  ngOnChanges({ text }: SimpleChanges): void {
    if (text?.currentValue || text?.previousValue) {
      this._cdr.detectChanges();
    }
  }

  ngAfterViewInit(): void {
    this.shouldShowTooltip = (this.croppedText?.nativeElement?.offsetWidth ?? 0) < (this.viewedText?.nativeElement?.offsetWidth ?? 0);
    this._cdr.detectChanges();
  }
}
