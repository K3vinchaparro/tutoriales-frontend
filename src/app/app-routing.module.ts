import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { TutorialesComponent } from './pages/tutoriales/tutoriales.component';
import { LoginGuard } from './services/login-guard.guard';
import { AdminGuardGuard } from './services/admin/admin-guard.guard';
import { TutorialGuard } from './services/tutorial/tutorial.guard';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
    canActivate:[LoginGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
    canActivate:[LoginGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    pathMatch: 'full',
    canActivate:[AdminGuardGuard]
  },
  {
    path: 'tutoriales',
    component: TutorialesComponent,
    pathMatch: 'full',
    canActivate:[TutorialGuard]
  },
  { path: '**', redirectTo: '/login' }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
