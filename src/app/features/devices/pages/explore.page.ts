import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DEVICES, Device } from '@data-access/fixtures/devices.fixture';
import { SessionStore } from '@store/session.store';

@Component({
  selector: 'app-explore-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="max-w-7xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 class="text-3xl font-bold tracking-tight">Devices Catalog</h2>
          <p class="text-muted-foreground">Browse and filter the latest medical imaging technology.</p>
        </div>
        
        <div class="flex items-center gap-2 bg-card border border-border p-1 rounded-xl shadow-sm">
           @for (m of modalities(); track m) {
             <button (click)="toggleModality(m)" 
               class="px-4 py-1.5 rounded-lg text-xs font-semibold transition-all"
               [class]="selectedModality() === m ? 'bg-atlas-blue text-white' : 'hover:bg-muted text-muted-foreground'">
               {{ m }}
             </button>
           }
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (device of filteredDevices(); track device.id) {
          <div class="panel p-0 overflow-hidden group hover:border-atlas-blue/30 transition-all flex flex-col shadow-md hover:shadow-xl">
            <div class="relative h-48 bg-muted overflow-hidden">
               <img [src]="device.imageUrl" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
               <div class="absolute top-2 right-2 flex gap-1">
                 <button (click)="store.toggleSaved(device); $event.stopPropagation()" 
                   class="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-atlas-indigo transition-colors shadow-lg">
                   <i class="material-icons text-sm">{{ isSaved(device.id) ? 'bookmark' : 'bookmark_border' }}</i>
                 </button>
               </div>
               <div class="absolute bottom-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-md text-[10px] font-bold text-white uppercase tracking-widest">
                 {{ device.modality }}
               </div>
            </div>
            
            <div class="p-5 flex-1 flex flex-col">
              <div class="flex justify-between items-start mb-1">
                <span class="text-[10px] font-bold text-atlas-blue uppercase tracking-widest letter-spacing-1">{{ device.vendor }}</span>
                <span class="flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 bg-atlas-emerald/10 text-atlas-emerald rounded border border-atlas-emerald/20">
                  <i class="material-icons text-[10px]">star</i> {{ device.reviewScore }}
                </span>
              </div>
              <h3 class="font-bold text-lg mb-2 group-hover:text-atlas-blue transition-colors">{{ device.name }}</h3>
              <p class="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed">{{ device.description }}</p>
              
              <div class="mt-auto pt-4 border-t border-border flex items-center justify-between gap-4">
                <div class="flex flex-col">
                  <span class="text-[10px] text-muted-foreground uppercase font-semibold">Price Benchmark</span>
                  <span class="text-sm font-bold">{{ device.priceRange }}</span>
                </div>
                <div class="flex gap-2">
                  <button (click)="store.addToCompare(device); $event.stopPropagation()" 
                    class="p-2 rounded-lg border border-border hover:bg-muted transition-colors" title="Compare">
                    <i class="material-icons text-sm">compare_arrows</i>
                  </button>
                  <a [routerLink]="['/devices', device.id]" class="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-xs font-bold hover:opacity-90 transition-opacity">
                    View Specs
                  </a>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
      
      @if (filteredDevices().length === 0) {
        <div class="panel py-20 flex flex-col items-center justify-center text-center">
          <i class="material-icons text-6xl text-muted/30">search_off</i>
          <h3 class="text-xl font-bold mt-4">No matching devices</h3>
          <p class="text-muted-foreground text-sm max-w-sm mt-2">Try adjusting your filters or search criteria to find what you're looking for.</p>
          <button (click)="selectedModality.set('ALL')" class="mt-6 text-atlas-blue font-bold text-sm hover:underline">Clear all filters</button>
        </div>
      }
    </div>
    
    <!-- Compare Bar -->
    @if (store.compareList().length > 0) {
      <div class="fixed bottom-6 left-1/2 -translate-x-1/2 glass-panel p-3 px-6 shadow-2xl flex items-center gap-6 z-50 animate-in slide-in-from-bottom-10">
        <div class="flex items-center gap-2">
          <span class="w-8 h-8 rounded-full bg-atlas-blue flex items-center justify-center text-white text-xs font-bold">
            {{ store.compareList().length }}
          </span>
          <span class="text-xs font-bold uppercase tracking-wider">In Compare Basket</span>
        </div>
        <div class="flex items-center gap-3">
          @for (d of store.compareList(); track d.id) {
            <div class="relative group">
              <img [src]="d.imageUrl" class="w-10 h-10 rounded-lg object-cover border border-white/20">
              <button (click)="store.removeFromCompare(d.id)" class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-white flex items-center justify-center scale-0 group-hover:scale-100 transition-transform">
                <i class="material-icons text-[10px]">close</i>
              </button>
            </div>
          }
        </div>
        <a routerLink="/compare" class="bg-white text-black px-4 py-2 rounded-lg text-xs font-bold hover:bg-white/90 transition-colors">
          Compare Now
        </a>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExplorePage {
  store = inject(SessionStore);
  modalities = signal(['ALL', 'MRI', 'CT', 'X-ray', 'Ultrasound', 'Mammography', 'PET/CT']);
  selectedModality = signal('ALL');
  
  filteredDevices = computed(() => {
    const mod = this.selectedModality();
    if (mod === 'ALL') return DEVICES;
    return DEVICES.filter(d => d.modality === mod);
  });

  toggleModality(m: string) {
    this.selectedModality.set(m);
  }

  isSaved(id: string) {
    return !!this.store.savedDevicesList().find(d => d.id === id);
  }
}
