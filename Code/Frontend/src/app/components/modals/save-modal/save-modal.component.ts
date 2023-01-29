import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-save-modal',
  templateUrl: './save-modal.component.html',
  styleUrls: ['./save-modal.component.sass']
})
export class SaveModalComponent {
  @Input() name;

	constructor(@Inject(MAT_DIALOG_DATA) public data) {
    console.log(data);
    
  }
  close() {

	}
}