import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TextComponentComponent } from '../text-component/text-component.component';
import { ActivatedRoute, Params } from '@angular/router';

import { v4 as uuidv4 } from 'uuid';

import EditorJS, { OutputData } from '@editorjs/editorjs';
import Underline from '@editorjs/underline';
// import SimpleImage from '@editorjs/simple-image';

@Component({
  selector: 'app-editor-component',
  standalone: true,
  imports: [
    ButtonModule,
    TextComponentComponent
  ],
  templateUrl: './editor-component.component.html',
  styleUrl: './editor-component.component.scss'
})
export class EditorComponentComponent implements AfterViewInit, OnInit{

  @ViewChild('editor', { read: ElementRef, static: true })
  editorElement!: ElementRef;
  private editor!: EditorJS;
  private savedData!: OutputData;
  private passedData!: OutputData;
  paramValue = "";

  private stateEdit: boolean = false;
  private linkEditDataId: string = "";

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() : void {
    this.linkEditDataId = this.activatedRoute.snapshot.params["id"];
    console.log(this.linkEditDataId)
    this.stateEdit = Boolean(this.linkEditDataId);
    if (this.linkEditDataId) {
      console.log(this.linkEditDataId);
      // this.stateEdit = true;
      const dataNotes: Map<string, OutputData> = new Map(Object.entries(JSON.parse(localStorage.getItem('test') || '{}')));
      const dataFromPass: OutputData = dataNotes.get(this.linkEditDataId)!;
      this.passedData = dataFromPass;
    } else {
      // this.stateEdit = false;
    }
  }
  
  ngAfterViewInit(): void {
    this.initializeEditor();
  }

  private initializeEditor(): void {
    if (this.stateEdit) {
      this.editor = new EditorJS({
        tools: {
          underline: Underline
        },
        minHeight: 200,
        holder: this.editorElement.nativeElement,
        data: this.passedData,
      });
      console.log(this.editor);
    } else {
      this.editor = new EditorJS({
        tools: {
          underline: Underline
        },
        minHeight: 200,
        holder: this.editorElement.nativeElement,
      });
      console.log(this.editor);
    }
  } 

  showEditorData() : void {
    this.editor.save().then(data => {
      let current: Map<string, OutputData>;
      console.log(this.stateEdit);

      if (this.stateEdit) {
        console.log('The data was: ' + this.passedData);
        this.passedData = data;
        console.log('The data is: ' + this.passedData);

        current = new Map(Object.entries(JSON.parse(localStorage.getItem('test') || '{}')));
        current.set(this.linkEditDataId , this.passedData);
        localStorage.setItem('test', JSON.stringify(Object.fromEntries(current)));
        this.stateEdit = false;
        return;
      }

      if (localStorage.getItem('test')) {
        current = new Map(Object.entries(JSON.parse(localStorage.getItem('test') || '{}')));
      } else {
        current = new Map<string, OutputData>();
      }

      this.savedData = data;

      const noteUuid: string = uuidv4();
      current.set(noteUuid , this.savedData);
      localStorage.setItem('test', JSON.stringify(Object.fromEntries(current)));
      console.log(localStorage.getItem('test'));
    });
  }

  async loadEditorData() : Promise<void> {
    this.savedData = JSON.parse(localStorage.getItem('test') || '{}');
    await this.editor.render(this.savedData);
    console.log(JSON.stringify(this.savedData));
  }

  clearEditorData() : void {
    this.editor.clear();
  }
}
