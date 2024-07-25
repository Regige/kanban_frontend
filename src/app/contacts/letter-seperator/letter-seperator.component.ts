import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-letter-seperator',
  standalone: true,
  imports: [],
  templateUrl: './letter-seperator.component.html',
  styleUrl: './letter-seperator.component.scss'
})
export class LetterSeperatorComponent {

  @Input() letter: string = '';

}
