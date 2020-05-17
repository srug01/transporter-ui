import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortComponent } from './port/port.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { YardComponent } from './yard/yard.component';
import { YardportmapComponent } from './yardportmap/yardportmap.component';
import { ContainerComponent } from './container/container.component';
import { WeightComponent } from './weight/weight.component';



const routes: Routes = [
  { path: 'port', component: PortComponent },
  { path: 'yard', component: YardComponent },
  { path: 'yard-port-map', component: YardportmapComponent },
  { path: 'container', component: ContainerComponent },
  { path: 'weight', component: WeightComponent },
];

@NgModule({
  declarations: [PortComponent, YardComponent, YardportmapComponent, ContainerComponent, WeightComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatSelectModule,
    MatGridListModule,
    MatInputModule,
    MatDatepickerModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCheckboxModule,
    RouterModule.forChild(routes)
  ]
})
export class MasterModule { }
