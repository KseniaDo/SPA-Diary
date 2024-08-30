import { Routes } from '@angular/router';
import { EditorComponentComponent } from './editor-component/editor-component.component';
import { DiaryNotesComponent } from './diary-notes/diary-notes.component';
import { NoFoundComponent } from './no-found/no-found.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {path: 'create', component: EditorComponentComponent},
    {path: 'diary', component: DiaryNotesComponent},
    {
        path: 'edit/:id', 
        component: EditorComponentComponent,
    },
    {path: '**', component: NoFoundComponent}
];
