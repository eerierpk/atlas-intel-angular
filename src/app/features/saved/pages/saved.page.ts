import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionStore } from '@store/session.store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-saved-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-3xl font-bold tracking-tight">Your Workspace</h2>
          <p class="text-muted-foreground">Organize your saved devices, comparisons, and AI sessions.</p>
        </div>
      </div>

      <div class="flex gap-4 border-b border-border mb-8">
         <button class="pb-4 text-xs font-bold uppercase tracking-widest text-atlas-blue relative">
           Saved Items
           <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-atlas-blue"></div>
         </button>
         <button class="pb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
           AI Sessions
         </button>
         <button class="pb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
           Intel Drafts
         </button>
      </div>

      @if (store.savedDevicesList().length === 0) {
        <div class="panel py-20 flex flex-col items-center justify-center text-center">
          <i class="material-icons text-6xl text-muted/30">bookmark_border</i>
          <h3 class="text-xl font-bold mt-4">Workspace is empty</h3>
          <p class="text-muted-foreground text-sm max-w-sm mt-2">Bookmark devices from the catalog to save them for later analysis or procurement roadmap planning.</p>
          <a routerLink="/explore" class="mt-6 text-atlas-blue font-bold text-sm hover:underline">Explore Devices</a>
        </div>
      } @else {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           @for (d of store.savedDevicesList(); track d.id) {
             <div class="panel p-0 overflow-hidden group">
               <div class="relative h-32 bg-muted">
                  <img [src]="d.imageUrl" class="w-full h-full object-cover">
                  <button (click)="store.toggleSaved(d)" class="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/40 text-white flex items-center justify-center">
                    <i class="material-icons text-xs">close</i>
                  </button>
               </div>
               <div class="p-4">
                  <span class="text-[10px] font-bold text-atlas-blue uppercase tracking-widest">{{ d.vendor }}</span>
                  <h4 class="font-bold text-sm group-hover:text-atlas-blue transition-colors truncate">{{ d.name }}</h4>
                  <div class="mt-4 flex gap-2">
                    <a [routerLink]="['/devices', d.id]" class="flex-1 bg-accent hover:bg-muted text-[10px] font-bold py-2 rounded-md text-center transition-colors">View Details</a>
                    <button (click)="store.addToCompare(d)" class="w-10 bg-accent hover:bg-muted rounded-md flex items-center justify-center transition-colors">
                      <i class="material-icons text-sm">compare_arrows</i>
                    </button>
                  </div>
               </div>
             </div>
           }
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SavedPage {
  store = inject(SessionStore);
}
