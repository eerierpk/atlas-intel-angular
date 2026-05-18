import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SidebarComponent } from './sidebar.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@app/core/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet, CommonModule],
  template: `
    <div class="flex h-screen w-full overflow-hidden bg-background text-foreground">
      <app-sidebar></app-sidebar>
      
      <main class="flex-1 flex flex-col min-w-0 relative">
        <header class="h-16 border-b border-border flex items-center justify-between px-6 bg-card/80 backdrop-blur-md sticky top-0 z-40">
          <div class="flex items-center gap-4">
            <h1 class="text-sm font-medium text-muted-foreground">MedIntel Atlas / <span class="text-foreground">Command Centre</span></h1>
          </div>
          
          <div class="flex items-center gap-4">
             <div class="relative group">
              <button class="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-xs font-semibold">
                {{ auth.user()?.firstName?.charAt(0) }}{{ auth.user()?.lastName?.charAt(0) }}
              </button>
              <div class="absolute right-0 mt-2 w-48 py-2 bg-popover border border-border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <div class="px-4 py-2 border-b border-border">
                  <p class="text-xs font-medium">{{ auth.user()?.firstName }} {{ auth.user()?.lastName }}</p>
                  <p class="text-[10px] text-muted-foreground capitalize">{{ auth.user()?.role }}</p>
                </div>
                <button (click)="auth.logout()" class="w-full text-left px-4 py-2 text-xs hover:bg-muted flex items-center gap-2">
                  <i class="material-icons text-sm">logout</i> Log out
                </button>
              </div>
            </div>
          </div>
        </header>
        
        <div class="flex-1 overflow-y-auto p-6 relative">
          <router-outlet></router-outlet>
        </div>
      </main>

      <!-- Persistent AI Panel placeholder -->
      <div class="fixed right-4 top-20 bottom-4 w-80 glass-panel shadow-2xl flex flex-col z-50 transform transition-transform translate-x-[calc(100%-2.5rem)] hover:translate-x-0 group">
        <div class="w-10 h-full flex items-center justify-center cursor-pointer border-r border-border group-hover:border-none">
          <i class="material-icons text-atlas-blue animate-pulse">smart_toy</i>
        </div>
        <div class="flex-1 p-4 opacity-0 group-hover:opacity-100 transition-opacity overflow-hidden flex flex-col">
           <h3 class="font-semibold text-sm mb-4 flex items-center gap-2">
             <i class="material-icons text-atlas-indigo text-sm">auto_awesome</i> AI Assistance
           </h3>
           <div class="flex-1 bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground overflow-y-auto">
             How can I help you today? Search for equipment, compare models, or calculate ROI.
           </div>
           <div class="mt-4 flex gap-2">
             <input type="text" placeholder="Ask Atlas..." class="flex-1 bg-background border border-border rounded-md px-3 py-1.5 text-xs focus:ring-1 focus:ring-atlas-blue outline-none">
             <button class="bg-atlas-blue text-white rounded-md p-1.5"><i class="material-icons text-xs">send</i></button>
           </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; height: 100%; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent {
  auth = inject(AuthService);
}
