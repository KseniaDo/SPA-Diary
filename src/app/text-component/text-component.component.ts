import { AfterViewInit, Component, Input, ViewChild, ElementRef } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import EditorJS, { EditorConfig, OutputData } from '@editorjs/editorjs';
import Underline from '@editorjs/underline';
import SimpleImage from '@editorjs/simple-image';

@Component({
  selector: 'app-text-component',
  standalone: true,
  imports: [
    ButtonModule
  ],
  templateUrl: './text-component.component.html',
  styleUrl: './text-component.component.scss'
})
export class TextComponentComponent implements AfterViewInit {

  @ViewChild('diaryNote', { read: ElementRef, static: true })
  diaryElement!: ElementRef;
  private diaryNote!: EditorJS;
  @Input() diaryData!: OutputData;
  // @Input() diaryNoteConfig!: EditorConfig;

  constructor() {}

  ngOnInit() : void {}

  ngAfterViewInit(): void {
    this.initializeEditor();
  }

  private initializeEditor(): void {
    this.diaryNote = new EditorJS({
      readOnly: true,
      tools: {
        underline: Underline,
        image: SimpleImage,
      },
      minHeight: 0,
      holder: this.diaryElement.nativeElement,
      data: this.diaryData
    });
    // console.log(this.diaryNote);
  }
  @Input() title = "";
}
