import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@app/core/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <aside class="flex flex-col h-full bg-card border-r border-border transition-all duration-300" [class.w-64]="!isCollapsed()" [class.w-16]="isCollapsed()">
      <div class="flex items-center gap-2 p-4 border-b border-border">
        <div class="w-8 h-8 rounded-lg bg-atlas-blue flex items-center justify-center text-white font-bold">M</div>
        @if (!isCollapsed()) {
          <span class="font-bold text-lg tracking-tight">MedIntel <span class="text-atlas-blue">Atlas</span></span>
        }
      </div>
      
      <nav class="flex-1 overflow-y-auto p-2 space-y-1">
        @for (item of navItems(); track item.path) {
          @if (item.adminOnly ? auth.isAdmin() : true) {
            <a [routerLink]="item.path" 
               routerLinkActive="bg-accent text-accent-foreground"
               class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted transition-colors relative group">
              <i [class]="'material-icons text-xl ' + (isCollapsed() ? 'mx-auto' : '')">{{ item.icon }}</i>
              @if (!isCollapsed()) {
                <span>{{ item.label }}</span>
              }
              @if (isCollapsed()) {
                <div class="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded border border-border opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap">
                  {{ item.label }}
                </div>
              }
            </a>
          }
        }
      </nav>
      
      <div class="p-2 border-t border-border">
        <button (click)="toggleCollapse()" class="w-full flex items-center justify-center p-2 rounded-lg hover:bg-muted transition-colors">
          <i class="material-icons">{{ isCollapsed() ? 'chevron_right' : 'chevron_left' }}</i>
        </button>
      </div>
    </aside>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  auth = inject(AuthService);
  isCollapsed = signal(false);
  
  navItems = signal([
    { path: '/dashboard', label: 'Command Centre', icon: 'dashboard' },
    { path: '/explore', label: 'Explore', icon: 'search' },
    { path: '/compare', label: 'Compare', icon: 'compare_arrows' },
    { path: '/roi', label: 'ROI Calculator', icon: 'calculate' },
    { path: '/journey', label: 'Journey', icon: 'map' },
    { path: '/insights', label: 'Market Insights', icon: 'insights' },
    { path: '/saved', label: 'Workspace', icon: 'folder' },
    { path: '/agents', label: 'Agents', icon: 'smart_toy' },
    { path: '/admin', label: 'Users', icon: 'people', adminOnly: true }
  ]);

  toggleCollapse() {
    this.isCollapsed.update(v => !v);
  }
}
