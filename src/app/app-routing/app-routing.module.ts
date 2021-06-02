import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPizzaComponent } from '../add-pizza/add-pizza.component';
import { AuthGuard } from '../guards/auth.guard';
import { HomeComponent } from '../home/home.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { SignupFormComponent } from '../signup-form/signup-form.component';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent},
  { path: 'signup', component: SignupFormComponent},
  { path: 'add', component: AddPizzaComponent, canActivate: [AuthGuard]},
  //{ path: '', redirectTo: 'students', pathMatch: 'full' },
  // {
  //   path: '',
  //   component: MainLayoutComponent,
  //   children: [
  //     { path: 'students', component: StudentListComponent, canActivate: [AuthGuard] },
  //     { path: 'add', component: AddStudentFormComponent, canActivate: [AdminGuard] },
  //     { path: 'edit/:studentId', component: AddStudentFormComponent, canActivate: [AdminGuard] },
  //     { path: 'student/:studentId', component: StudentDetailsComponent, canActivate: [AuthGuard] },
  //     { path: 'evaluate', component: EvaluateStudentComponent, canActivate: [AuthGuard] },
  //     { path: 'evaluate/:studentId', component: EvaluateStudentComponent, canActivate: [AuthGuard] },
  //     { path: 'myevaluations', component: UserEvaluationsComponent, canActivate: [AuthGuard] },
  //   ],
  // },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
