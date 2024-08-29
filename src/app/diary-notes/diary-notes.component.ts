import { Component, ViewContainerRef, Input } from '@angular/core';
import { NgFor, KeyValuePipe } from '@angular/common';
import { TextComponentComponent } from '../text-component/text-component.component';
import { RouterLink, RouterOutlet } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { OutputData } from '@editorjs/editorjs';

@Component({
  selector: 'app-diary-notes',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    ButtonModule,
    TextComponentComponent,
    NgFor,
    KeyValuePipe
  ],
  templateUrl: './diary-notes.component.html',
  styleUrl: './diary-notes.component.scss'
})
export class DiaryNotesComponent {

  @Input() button_visibility: string = 'button_invisible';
  dataCheck: Map<string, OutputData> = new Map(Object.entries(JSON.parse(localStorage.getItem('test') || '{}')));


  loadContent() {
    console.log(this.dataCheck);
    // this.items.push({id: this.items.length+1, text: "Hi!!"});
  }

  changeNote(noteTime: any) {
    console.log(noteTime);
    this.button_visibility = 'button_visible'

  }

  deleteNote(noteTime: any) {
    console.log(noteTime);
    this.dataCheck.delete(noteTime.key);
    localStorage.setItem('test', JSON.stringify(Object.fromEntries(this.dataCheck)));
  }
}
