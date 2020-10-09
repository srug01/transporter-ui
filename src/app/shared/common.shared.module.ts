import { DateFormatPipe } from './pipe/date-format.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
    declarations: [
        DateFormatPipe,

    ],
    imports: [
    ],
    exports: [
        DateFormatPipe
    ]
})
export class CommonSharedModule { }
