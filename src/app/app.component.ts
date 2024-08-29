import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

import { EditorComponentComponent } from './editor-component/editor-component.component';
import { DiaryNotesComponent } from './diary-notes/diary-notes.component';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    EditorComponentComponent,
    ButtonModule,
    DiaryNotesComponent,
    MenuModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'diary-project';

  items = [
    {route: "/create", label: "Создать"},
    {route: "/diary", label: "Мой дневник"},
  ]
}
