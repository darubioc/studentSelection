import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { SidebarModule } from 'primeng/sidebar';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {CheckboxModule} from 'primeng/checkbox';
import {ListboxModule} from 'primeng/listbox';
import {FileUploadModule} from 'primeng/fileupload';
import {ProgressSpinnerModule} from 'primeng/progressspinner';


@NgModule({
  declarations: [],
  imports: [
    ButtonModule,
    SidebarModule,
    TableModule,
    CardModule,
    DynamicDialogModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    InputNumberModule,
    CalendarModule,
    MessageModule,
    MessagesModule,
    CheckboxModule,
    ListboxModule,
    FileUploadModule,
    ProgressSpinnerModule

  ],
  exports: [
    ButtonModule,
    SidebarModule,
    CardModule,
    TableModule,
    DynamicDialogModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    InputNumberModule,
    CalendarModule,
    MessageModule,
    MessagesModule,
    CheckboxModule,
    ListboxModule,
    FileUploadModule,
    ProgressSpinnerModule

  ],
})
export class PrimeNgModule {}
