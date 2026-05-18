import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div class="accent-glow top-0 left-0 animate-pulse"></div>
      <div class="accent-glow bottom-0 right-0 animate-pulse delay-1000"></div>
      
      <div class="w-full max-w-md glass-panel p-8 shadow-2xl relative z-10">
        <div class="flex flex-col items-center mb-8">
          <div class="w-12 h-12 rounded-xl bg-atlas-blue flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg shadow-atlas-blue/30">
            M
          </div>
          <h1 class="text-2xl font-bold tracking-tight">MedIntel <span class="text-atlas-blue">Atlas</span></h1>
          <p class="text-muted-foreground text-sm mt-1">Intelligence Excellence in Medical Procurement</p>
        </div>
        
        <form (ngSubmit)="onSubmit()" class="space-y-4">
          <div>
            <label class="block text-xs font-medium text-muted-foreground mb-1.5 ml-1">Email address</label>
            <input type="email" [(ngModel)]="email" name="email" required
              class="w-full bg-accent/50 border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-atlas-blue/50 focus:border-atlas-blue transition-all"
              placeholder="name@hospital.org">
          </div>
          
          <div>
            <label class="block text-xs font-medium text-muted-foreground mb-1.5 ml-1">Password</label>
            <input type="password" [(ngModel)]="password" name="password" required
              class="w-full bg-accent/50 border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-atlas-blue/50 focus:border-atlas-blue transition-all"
              placeholder="••••••••">
          </div>
          
          <button type="submit" 
            class="w-full bg-atlas-blue hover:bg-atlas-blue/90 text-white font-semibold py-2.5 rounded-lg shadow-lg shadow-atlas-blue/20 transition-all active:scale-[0.98]">
            Sign in
          </button>
        </form>
        
        <div class="mt-8 flex flex-col gap-3">
          <div class="flex items-center gap-2">
            <span class="flex-1 h-px bg-border"></span>
            <span class="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Demo accounts</span>
            <span class="flex-1 h-px bg-border"></span>
          </div>
          
          <div class="grid grid-cols-2 gap-3">
            <button (click)="demoLogin('demo.user@medintel.io', 'viewer')" 
              class="flex flex-col items-center justify-center p-3 rounded-xl border border-border hover:bg-muted/50 transition-colors group">
              <i class="material-icons text-muted-foreground group-hover:text-atlas-indigo transition-colors">person</i>
              <span class="text-xs font-semibold mt-1">Demo User</span>
            </button>
            <button (click)="demoLogin('expert.demo@medintel.io', 'admin')" 
              class="flex flex-col items-center justify-center p-3 rounded-xl border border-border hover:bg-muted/50 transition-colors group">
              <i class="material-icons text-muted-foreground group-hover:text-atlas-emerald transition-colors">supervised_user_circle</i>
              <span class="text-xs font-semibold mt-1">Intel Expert</span>
            </button>
          </div>
        </div>
        
        <p class="mt-8 text-[10px] text-center text-muted-foreground px-4 italic">
          For planning & procurement intelligence only. Not for diagnostic guidance.
        </p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPage {
  email = '';
  password = '';
  auth = inject(AuthService);
  router = inject(Router);

  onSubmit() {
    if (this.email && this.password.length >= 4) {
      this.auth.login(this.email);
      this.router.navigate(['/dashboard']);
    }
  }

  demoLogin(email: string, role: any) {
    this.auth.login(email, role);
    this.router.navigate(['/dashboard']);
  }
}
