import { NgModule } from '@angular/core';
import { Routes, RouterModule ,CanActivate } from '@angular/router';
import { AuthGuardService as AuthGuard } from './services/auth/auth-guard.service';
import { DashboardComponent } from './modules/dashboard/pages/dashboard.component';
import { SignInComponent } from './modules/signin/pages/sign-in.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]  },
  { path: 'sign-in', component: SignInComponent },
  { path: '**', redirectTo:"dashboard" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
