import { AfterViewInit, Component, OnInit } from '@angular/core';
import { VerificationAbstractComponent } from '@misc/abstracts/verification.abstract.component';

@Component({
  selector: 'quick-verification',
  templateUrl: './quick-verification.component.html',
  styleUrls: ['../home.component.scss', './quick-verification.component.scss']
})
export class QuickVerificationComponent extends VerificationAbstractComponent implements OnInit, AfterViewInit {
  get shouldDisableButton(): boolean {
    return !this.form.id.value && !this.form.document.value;
  }
}
