import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionStore } from '@store/session.store';
import { Device } from '@data-access/fixtures/devices.fixture';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-compare-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-3xl font-bold tracking-tight">Comparison Matrix</h2>
          <p class="text-muted-foreground">Deep technical benchmarks and clinical tradeoff analysis.</p>
        </div>
        
        <div class="flex gap-2">
           <button class="bg-accent hover:bg-muted text-xs font-bold px-4 py-2 rounded-lg border border-border flex items-center gap-2">
             <i class="material-icons text-sm">download</i> Export report
           </button>
           <button class="bg-atlas-blue text-white text-xs font-bold px-4 py-2 rounded-lg shadow-lg shadow-atlas-blue/20 flex items-center gap-2">
             <i class="material-icons text-sm">share</i> Share link
           </button>
        </div>
      </div>

      @if (store.compareList().length === 0) {
        <div class="panel py-20 flex flex-col items-center justify-center text-center">
          <div class="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <i class="material-icons text-3xl text-muted-foreground">compare_arrows</i>
          </div>
          <h3 class="text-xl font-bold">Comparison basket is empty</h3>
          <p class="text-muted-foreground text-sm max-w-sm mt-2">Go to the explore page and add up to 4 devices to see dynamic matrix analysis.</p>
          <a routerLink="/explore" class="mt-6 text-atlas-blue font-bold text-sm hover:underline">Browse Devices</a>
        </div>
      } @else {
        <div class="overflow-x-auto rounded-2xl border border-border bg-card shadow-xl">
           <table class="w-full text-left border-collapse">
             <thead>
               <tr class="bg-muted/50">
                 <th class="p-6 min-w-[200px] border-r border-border">Feature Matrix</th>
                 @for (device of store.compareList(); track device.id) {
                   <th class="p-6 min-w-[280px]">
                     <div class="flex flex-col gap-2 relative">
                        <button (click)="store.removeFromCompare(device.id)" class="absolute -top-4 -right-4 w-6 h-6 rounded-full bg-destructive text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                          <i class="material-icons text-xs">close</i>
                        </button>
                        <img [src]="device.imageUrl" class="w-full h-32 object-cover rounded-xl border border-border mb-2 shadow-sm">
                        <div class="flex flex-col">
                           <span class="text-[10px] font-bold text-atlas-blue uppercase letter-spacing-1">{{ device.vendor }}</span>
                           <h4 class="font-bold text-lg leading-tight">{{ device.name }}</h4>
                        </div>
                     </div>
                   </th>
                 }
               </tr>
             </thead>
             <tbody class="divide-y divide-border">
                <tr class="group hover:bg-muted/30 transition-colors">
                  <td class="p-4 px-6 font-semibold text-xs text-muted-foreground uppercase border-r border-border">Modality</td>
                  @for (d of store.compareList(); track d.id) {
                    <td class="p-4 px-6 text-sm font-medium">{{ d.modality }}</td>
                  }
                </tr>
                <tr class="group hover:bg-muted/30 transition-colors">
                  <td class="p-4 px-6 font-semibold text-xs text-muted-foreground uppercase border-r border-border">Release Year</td>
                  @for (d of store.compareList(); track d.id) {
                    <td class="p-4 px-6 text-sm font-medium">{{ d.releaseYear }}</td>
                  }
                </tr>
                 <tr class="group hover:bg-muted/30 transition-colors">
                  <td class="p-4 px-6 font-semibold text-xs text-muted-foreground uppercase border-r border-border">AI Maturity</td>
                  @for (d of store.compareList(); track d.id) {
                    <td class="p-4 px-6">
                      <span class="chip bg-atlas-indigo/10 text-atlas-indigo border-atlas-indigo/20">Level {{ d.aiCapabilities.length }}</span>
                    </td>
                  }
                </tr>
                 <tr class="group hover:bg-muted/30 transition-colors">
                  <td class="p-4 px-6 font-semibold text-xs text-muted-foreground uppercase border-r border-border">Review Score</td>
                  @for (d of store.compareList(); track d.id) {
                    <td class="p-4 px-6">
                      <div class="flex items-center gap-1">
                        <i class="material-icons text-atlas-blue text-sm">star</i>
                        <span class="text-sm font-bold">{{ d.reviewScore }}</span>
                        <span class="text-[10px] text-muted-foreground">({{ d.reviewCount }} reviews)</span>
                      </div>
                    </td>
                  }
                </tr>
                <tr class="group hover:bg-muted/30 transition-colors">
                  <td class="p-4 px-6 font-semibold text-xs text-muted-foreground uppercase border-r border-border">Key Specs</td>
                  @for (d of store.compareList(); track d.id) {
                    <td class="p-4 px-6 align-top">
                      <ul class="space-y-1">
                        @for (key of objectKeys(d.specs); track key) {
                          <li class="text-[11px] flex justify-between gap-2">
                             <span class="text-muted-foreground">{{ key }}:</span>
                             <span class="font-bold whitespace-nowrap">{{ d.specs[key] }}</span>
                          </li>
                        }
                      </ul>
                    </td>
                  }
                </tr>
                <tr class="group hover:bg-muted/30 transition-colors">
                  <td class="p-4 px-6 font-semibold text-xs text-muted-foreground uppercase border-r border-border">Price Range</td>
                  @for (d of store.compareList(); track d.id) {
                    <td class="p-4 px-6 text-sm font-bold text-atlas-emerald">{{ d.priceRange }}</td>
                  }
                </tr>
             </tbody>
           </table>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
           <div class="panel h-[400px] flex flex-col">
              <h4 class="font-bold flex items-center gap-2 mb-6">
                <i class="material-icons text-atlas-indigo">radar</i> Tradeoff Analysis
              </h4>
              <div class="flex-1 flex items-center justify-center bg-muted/20 rounded-xl relative">
                 <div class="absolute inset-0 bg-grid-bg opacity-10"></div>
                 <i class="material-icons text-6xl text-muted/30 rotate-45">expand</i>
                 <span class="absolute bottom-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Radar Chart Simulation</span>
              </div>
           </div>
           
           <div class="panel space-y-6">
              <h4 class="font-bold flex items-center gap-2">
                <i class="material-icons text-atlas-blue">auto_awesome</i> AI Best-Fit Rationale
              </h4>
              <div class="space-y-4">
                 <div class="p-4 rounded-xl bg-atlas-blue/5 border border-atlas-blue/20">
                   <p class="text-xs font-bold text-atlas-blue mb-1">Recommended Choice</p>
                   <p class="text-sm font-bold">{{ store.compareList()[0]?.name }}</p>
                   <p class="text-xs text-muted-foreground mt-2 leading-relaxed">Based on your portfolio's current volume trends and the technical ceiling of these models, the MAGNETOM Lumina Pro offers the best 5-year NPV while maintaining clinical versatility for neurovascular specialization.</p>
                 </div>
                 
                 <div class="grid grid-cols-1 gap-2">
                    <div class="flex items-center gap-3 p-3 rounded-lg border border-border text-xs">
                       <i class="material-icons text-atlas-emerald text-sm">verified</i>
                       <span>Highest technical uptime projection (97.8%)</span>
                    </div>
                    <div class="flex items-center gap-3 p-3 rounded-lg border border-border text-xs">
                       <i class="material-icons text-atlas-indigo text-sm">psychology</i>
                       <span>Best AI-readiness for next-gen pathology integration</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComparePage {
  store = inject(SessionStore);

  objectKeys(obj: any) {
    return Object.keys(obj);
  }
}
