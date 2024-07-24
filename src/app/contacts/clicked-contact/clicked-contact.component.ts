import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-clicked-contact',
  standalone: true,
  imports: [],
  templateUrl: './clicked-contact.component.html',
  styleUrl: './clicked-contact.component.scss'
})
export class ClickedContactComponent {

  @Input() contact: any;


}
