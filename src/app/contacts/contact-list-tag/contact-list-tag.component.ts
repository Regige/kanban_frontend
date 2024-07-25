import { Component, Input } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-contact-list-tag',
  standalone: true,
  imports: [],
  templateUrl: './contact-list-tag.component.html',
  styleUrl: './contact-list-tag.component.scss'
})
export class ContactListTagComponent {

  @Input() logogram: string = '';
  @Input() name: string = '';
  @Input() email: string = '';
  @Input() color: string = '';
  @Input() id: number | undefined = -1;
  @Input() i: number = -1;

  constructor(public data: DataService) {}

}
