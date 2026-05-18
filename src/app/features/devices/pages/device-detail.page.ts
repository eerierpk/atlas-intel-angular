import { ChangeDetectionStrategy, Component, inject, signal, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DEVICES, Device } from '@data-access/fixtures/devices.fixture';
import { SessionStore } from '@store/session.store';

@Component({
  selector: 'app-device-detail-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    @if (device()) {
      <div class="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
        <!-- Back button and title -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <a routerLink="/explore" class="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground mr-2">
              <i class="material-icons">arrow_back</i>
            </a>
            <div class="flex flex-col">
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-bold text-atlas-blue uppercase tracking-widest">{{ device()?.vendor }}</span>
                <span class="chip bg-atlas-indigo/10 text-atlas-indigo border-atlas-indigo/20 text-[10px]">v.{{ device()?.releaseYear }}</span>
              </div>
              <h2 class="text-3xl font-bold tracking-tight">{{ device()?.name }}</h2>
            </div>
          </div>
          
          <div class="flex gap-3">
            <button (click)="store.toggleSaved(device()!)" 
              class="flex items-center gap-2 border border-border px-4 py-2 rounded-xl hover:bg-muted transition-colors text-xs font-semibold">
              <i class="material-icons text-sm">{{ isSaved() ? 'bookmark' : 'bookmark_border' }}</i>
              {{ isSaved() ? 'Saved' : 'Save' }}
            </button>
            <button (click)="store.addToCompare(device()!)" 
              class="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl transition-all shadow-lg text-xs font-semibold">
              <i class="material-icons text-sm">compare_arrows</i> Add to Comparison
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <!-- Main Content -->
           <div class="lg:col-span-2 space-y-8">
              <!-- Top Image/Specs Summary -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div class="rounded-2xl overflow-hidden shadow-2xl border border-border bg-muted aspect-video">
                   <img [src]="device()?.imageUrl" class="w-full h-full object-cover">
                 </div>
                 <div class="space-y-4">
                   <div class="panel">
                     <h4 class="text-xs font-bold text-muted-foreground uppercase mb-4 tracking-widest">Key Performance Indicators</h4>
                     <div class="grid grid-cols-2 gap-4">
                        <div class="flex flex-col p-3 rounded-lg bg-muted/30">
                          <span class="text-[10px] text-muted-foreground">Confidence %</span>
                          <span class="text-lg font-bold text-atlas-emerald">98.2%</span>
                        </div>
                        <div class="flex flex-col p-3 rounded-lg bg-muted/30">
                          <span class="text-[10px] text-muted-foreground">Clinical Score</span>
                          <span class="text-lg font-bold text-atlas-blue">4.9/5</span>
                        </div>
                        <div class="flex flex-col p-3 rounded-lg bg-muted/30">
                          <span class="text-[10px] text-muted-foreground">AI Maturity</span>
                          <span class="text-lg font-bold text-atlas-indigo">Level 4</span>
                        </div>
                        <div class="flex flex-col p-3 rounded-lg bg-muted/30">
                          <span class="text-[10px] text-muted-foreground">Fleet Readiness</span>
                          <span class="text-lg font-bold">High</span>
                        </div>
                     </div>
                   </div>
                   <div class="panel p-4 flex items-center justify-between">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-atlas-blue/10 flex items-center justify-center">
                          <i class="material-icons text-atlas-blue">rocket_launch</i>
                        </div>
                        <div>
                          <p class="text-xs font-bold uppercase tracking-wider">Fast-track Demo</p>
                          <p class="text-[10px] text-muted-foreground">Schedule a clinical walkthrough</p>
                        </div>
                      </div>
                      <i class="material-icons text-muted-foreground">chevron_right</i>
                   </div>
                 </div>
              </div>

              <!-- Tabs -->
              <div class="border-b border-border">
                <nav class="flex gap-8">
                   @for (tab of tabs(); track tab) {
                     <button (click)="activeTab.set(tab)" 
                       class="pb-4 text-xs font-bold uppercase tracking-widest transition-all relative"
                       [class]="activeTab() === tab ? 'text-atlas-blue' : 'text-muted-foreground hover:text-foreground'">
                       {{ tab }}
                       @if (activeTab() === tab) {
                         <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-atlas-blue animate-in fade-in duration-300"></div>
                       }
                     </button>
                   }
                </nav>
              </div>

              <!-- Tab Content -->
              <div class="min-h-[400px]">
                 @switch (activeTab()) {
                   @case ('Overview') {
                     <div class="space-y-6 animate-in fade-in">
                       <div class="prose prose-invert max-w-none">
                         <p class="text-muted-foreground leading-relaxed">{{ device()?.description }}</p>
                       </div>
                       
                       <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                         <div class="panel border-l-4 border-l-atlas-emerald">
                           <h4 class="font-bold text-sm mb-2">Key Strengths</h4>
                           <ul class="space-y-2">
                             @for (f of device()?.features; track f) {
                               <li class="text-xs flex items-center gap-2"><i class="material-icons text-atlas-emerald text-[14px]">check_circle</i> {{ f }}</li>
                             }
                           </ul>
                         </div>
                         <div class="panel border-l-4 border-l-atlas-indigo">
                           <h4 class="font-bold text-sm mb-2">Technical Core</h4>
                           <ul class="space-y-2">
                             @for (key of objectKeys(device()?.specs || {}); track key) {
                               <li class="text-xs flex justify-between">
                                 <span class="text-muted-foreground">{{ key }}</span>
                                 <span class="font-bold">{{ device()?.specs?.[key] }}</span>
                               </li>
                             }
                           </ul>
                         </div>
                       </div>
                     </div>
                   }
                   @case ('Technical') {
                     <div class="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in slide-in-from-left-4">
                       @for (i of [1,2,3,4,5,6]; track i) {
                         <div class="panel p-4 flex flex-col gap-1 items-center text-center">
                            <i class="material-icons text-muted/30 text-3xl">settings_input_component</i>
                            <span class="text-[10px] font-bold text-muted-foreground uppercase mt-2">Spec Component</span>
                            <span class="text-sm font-bold">Standard Value {{ i }}</span>
                         </div>
                       }
                     </div>
                   }
                   @case ('AI Features') {
                     <div class="space-y-4 animate-in slide-in-from-bottom-4">
                        @for (ai of device()?.aiCapabilities; track ai) {
                          <div class="panel flex items-start gap-4">
                             <div class="w-12 h-12 rounded-xl bg-atlas-indigo/10 flex items-center justify-center shrink-0">
                               <i class="material-icons text-atlas-indigo">auto_awesome</i>
                             </div>
                             <div>
                               <h4 class="font-bold text-sm">{{ ai }}</h4>
                               <p class="text-xs text-muted-foreground mt-1">Advanced Deep Learning algorithms designed to improve clinical precision by up to 40% while reducing scan times.</p>
                               <div class="flex gap-2 mt-3">
                                 <span class="chip bg-atlas-indigo/5 text-atlas-indigo border-atlas-indigo/10 text-[10px]">Clinical Validated</span>
                                 <span class="chip bg-atlas-emerald/5 text-atlas-emerald border-atlas-emerald/10 text-[10px]">Active Learning</span>
                               </div>
                             </div>
                          </div>
                        }
                     </div>
                   }
                   @case ('Financial') {
                     <div class="space-y-6 animate-in fade-in">
                       <div class="panel bg-atlas-blue/5 border-atlas-blue/20">
                         <div class="flex items-center justify-between mb-4">
                           <h4 class="font-bold text-sm">Estimated ROI (5-Year)</h4>
                           <i class="material-icons text-atlas-blue">trending_up</i>
                         </div>
                         <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div class="flex flex-col">
                              <span class="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">Net Present Value</span>
                              <span class="text-2xl font-bold">$1.42M</span>
                            </div>
                            <div class="flex flex-col">
                              <span class="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">Payback Period</span>
                              <span class="text-2xl font-bold">2.4 Years</span>
                            </div>
                            <div class="flex flex-col">
                              <span class="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">Internal Rate of Return</span>
                              <span class="text-2xl font-bold text-atlas-emerald">28.4%</span>
                            </div>
                         </div>
                       </div>
                       <a [routerLink]="['/roi']" [queryParams]="{device: device()?.id}" class="panel flex items-center justify-between hover:bg-muted transition-colors cursor-pointer group">
                          <div class="flex items-center gap-3">
                            <i class="material-icons text-atlas-blue">calculate</i>
                            <span class="font-bold text-sm">Open Comprehensive ROI Calculator</span>
                          </div>
                          <i class="material-icons group-hover:translate-x-1 transition-transform">arrow_forward</i>
                       </a>
                     </div>
                   }
                 }
              </div>
           </div>

           <!-- Sidebar Info -->
           <div class="space-y-6">
              <div class="panel space-y-4">
                <h4 class="text-xs font-bold uppercase tracking-widest text-muted-foreground">AI Intelligence Summary</h4>
                <div class="space-y-3">
                  <div class="p-3 rounded-lg bg-atlas-emerald/5 border border-atlas-emerald/20">
                    <p class="text-xs font-bold text-atlas-emerald flex items-center gap-2"><i class="material-icons text-[14px]">verified</i> Top Strength</p>
                    <p class="text-xs mt-1">Market-leading noise reduction profile with v{{ device()?.releaseYear }} firmware.</p>
                  </div>
                  <div class="p-3 rounded-lg bg-atlas-indigo/5 border border-atlas-indigo/20">
                    <p class="text-xs font-bold text-atlas-indigo flex items-center gap-2"><i class="material-icons text-[14px]">psychology</i> Smart Integration</p>
                    <p class="text-xs mt-1">Natively compatible with 100% of your hospital's existing PACS architecture.</p>
                  </div>
                </div>
              </div>

              <div class="panel">
                <h4 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Reviews</h4>
                <div class="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                   @for (r of [1,2,3]; track r) {
                     <div class="border-b border-border pb-3 last:border-0 last:pb-0">
                       <div class="flex justify-between items-center mb-1">
                         <span class="text-xs font-bold">Chief Radiologist</span>
                         <span class="text-[10px] text-muted-foreground">May 2024</span>
                       </div>
                       <div class="flex gap-0.5 text-atlas-blue mb-2">
                         <i class="material-icons text-xs">star</i><i class="material-icons text-xs">star</i><i class="material-icons text-xs">star</i><i class="material-icons text-xs">star</i><i class="material-icons text-xs">star</i>
                       </div>
                       <p class="text-[11px] text-muted-foreground italic leading-tight">"Exceptional performance in neurovascular imaging. Workflow efficiency improved by ~20%."</p>
                     </div>
                   }
                </div>
                <button class="w-full mt-4 py-2 border border-border rounded-lg text-xs font-bold hover:bg-muted transition-colors">Write Review</button>
              </div>

              <div class="panel h-[200px] flex items-center justify-center bg-muted/20 relative group overflow-hidden">
                 <div class="absolute inset-0 bg-atlas-blue opacity-5"></div>
                 <i class="material-icons text-4xl text-muted/30">map</i>
                 <span class="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-popover/80 backdrop-blur px-3 py-1 rounded-full border border-border shadow-md">Placements Map</span>
                 <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm z-10">
                   <button class="bg-white text-black text-[10px] font-bold px-4 py-2 rounded-lg">Open Leaflet Map</button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    } @else {
      <div class="h-full flex items-center justify-center">
        <div class="w-12 h-12 rounded-full border-4 border-atlas-blue border-t-transparent animate-spin"></div>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeviceDetailPage {
  route = inject(ActivatedRoute);
  store = inject(SessionStore);
  device = signal<Device | null>(null);
  activeTab = signal('Overview');
  tabs = signal(['Overview', 'Technical', 'AI Features', 'Financial']);

  constructor() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      const d = DEVICES.find(item => item.id === id);
      if (d) {
        this.device.set(d);
      }
    });
  }

  isSaved() {
    return !!this.store.savedDevicesList().find(d => d.id === this.device()?.id);
  }

  objectKeys(obj: any) {
    return Object.keys(obj);
  }
}
