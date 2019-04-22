import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';


import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { StudentOnboardingComponent } from './student/student-onboarding/student-onboarding.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { DeleteStudentDialogComponent } from './student/student-list/delete-student-dialog/delete-student-dialog.component';
import { FilterByNamePipe } from './shared/pipes/filter-by-name.pipe';
import { FilterByStudentCategoryPipe } from './shared/pipes/filter-by-student-category.pipe';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    HomeComponent,
    StudentOnboardingComponent,
    StudentListComponent,
    DeleteStudentDialogComponent,
    FilterByNamePipe,
    FilterByStudentCategoryPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [MatDatepickerModule],
  entryComponents: [DeleteStudentDialogComponent],
  exports: [
    HomeComponent,
    HomeRoutingModule
  ]
})
export class HomeModule { }
