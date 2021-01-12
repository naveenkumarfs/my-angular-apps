import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { TaskComponent } from './task/task.component';
import { RegisterComponent } from './register/register.component';
import { ActivatedRoute } from '@angular/router';
import { OnInit, OnDestroy } from '@angular/core';
const routes: Routes = [
  { path: 'Register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'task', component: TaskComponent },
  { path: 'task/:id', component: TaskComponent },

  { path: '', redirectTo: 'Register', pathMatch: 'full' },
  {
    path: '',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}


