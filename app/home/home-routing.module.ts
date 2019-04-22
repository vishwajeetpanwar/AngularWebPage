import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { StudentOnboardingComponent } from './student/student-onboarding/student-onboarding.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { AuthorizationGuard } from '../core/authorization.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthorizationGuard] },
  { path: 'home/onboarding', component: StudentOnboardingComponent, canActivate: [AuthorizationGuard] },
  { path: 'home/onboarding/:id', component: StudentOnboardingComponent, canActivate: [AuthorizationGuard] },
  { path: 'home/student-list', component: StudentListComponent, canActivate: [AuthorizationGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
