import { Component, ViewContainerRef, Input, OnInit, AfterViewInit } from '@angular/core';
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
export class DiaryNotesComponent implements OnInit {

  @Input() button_visibility: string = 'button_invisible';
  dataCheck!: Map<string, OutputData>;

  ngOnInit() : void {
    const sortCheck: Map<string, OutputData> = new Map(Object.entries(JSON.parse(localStorage.getItem('test') || '{}')));
    const arraySortCheck = Array.from(sortCheck, ([name, value]) => ({name, value}));
    const newMap  = (arraySortCheck).sort((value1, value2) => {
      if (value1.value.time! > value2.value.time!) {
        return 1;
      }
      if (value1.value.time! < value2.value.time!) {
        return -1;
      }
      return 0;
    })
    let sortAfter = new Map<string, OutputData>();
    let noteUuid: string;
    newMap.forEach(elem => {
      sortAfter.set(elem.name, elem.value)
    })

    this.dataCheck = sortAfter;

    localStorage.setItem('test', JSON.stringify(Object.fromEntries(sortAfter)));
    console.log(localStorage.getItem('test'));
  }


  loadContent() {
    console.log(this.dataCheck);
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
