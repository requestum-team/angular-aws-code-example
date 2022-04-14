import { Component, Input } from '@angular/core';

@Component({
  selector: 'protect-results',
  templateUrl: './protect-results.component.html',
  styleUrls: ['./protect-results.component.scss']
})
export class ProtectResultsComponent {
  @Input() ID: string;
  @Input() showText: boolean = true;
}
