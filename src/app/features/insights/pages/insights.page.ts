import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-insights-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div>
        <h2 class="text-3xl font-bold tracking-tight">Market Insights</h2>
        <p class="text-muted-foreground">Global trends, vendor momentum, and clinical demand pulse.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div class="panel h-[400px] flex flex-col">
            <div class="flex items-center justify-between mb-6">
              <h4 class="font-bold flex items-center gap-2">
                <i class="material-icons text-atlas-blue">trending_up</i> Vendor Momentum
              </h4>
              <span class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Q3 2024</span>
            </div>
            <div class="flex-1 flex items-end gap-6 px-10 pb-10">
               @for (i of [60, 85, 45, 70, 95]; track i) {
                 <div class="flex-1 bg-atlas-blue/20 rounded-t-lg relative group h-full flex items-end">
                    <div class="w-full bg-atlas-blue rounded-t-lg transition-all duration-1000 group-hover:bg-atlas-indigo" [style.height.%]="i"></div>
                    <span class="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-muted-foreground uppercase">V{{ i }}</span>
                 </div>
               }
            </div>
         </div>

         <div class="panel h-[400px] flex flex-col justify-center items-center relative overflow-hidden">
             <div class="absolute inset-0 bg-grid-bg opacity-5"></div>
             <div class="w-48 h-48 rounded-full border-8 border-atlas-indigo/20 border-t-atlas-indigo animate-spin-slow flex items-center justify-center">
                <div class="w-32 h-32 rounded-full border-8 border-atlas-emerald/20 border-r-atlas-emerald flex items-center justify-center">
                   <div class="text-center">
                      <p class="text-2xl font-bold">84%</p>
                      <p class="text-[10px] font-bold text-muted-foreground uppercase">AI Maturity</p>
                   </div>
                </div>
             </div>
             <div class="mt-8 text-center px-8">
                <h4 class="font-bold text-sm">Clinical AI Adoption Growth</h4>
                <p class="text-xs text-muted-foreground mt-2">Market readiness for deep learning reconstruction has increased by 14% year-over-year.</p>
             </div>
         </div>
      </div>

      <div class="panel">
         <h4 class="font-bold mb-6 flex items-center gap-2 text-atlas-emerald">
            <i class="material-icons">sensors</i> Market Pulse
         </h4>
         <div class="space-y-4">
            @for (item of pulseItems(); track item.title) {
               <div class="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border">
                  <div class="flex items-center gap-4">
                     <div class="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center">
                        <i class="material-icons text-atlas-blue text-sm">{{ item.icon }}</i>
                     </div>
                     <div>
                        <p class="text-sm font-bold">{{ item.title }}</p>
                        <p class="text-[10px] text-muted-foreground">{{ item.desc }}</p>
                     </div>
                  </div>
                  <div class="flex items-center gap-8">
                     <div class="flex flex-col items-end">
                        <span class="text-xs font-bold text-atlas-emerald">{{ item.value }}</span>
                        <span class="text-[10px] text-muted-foreground">Demand Level</span>
                     </div>
                     <i class="material-icons text-muted-foreground">chevron_right</i>
                  </div>
               </div>
            }
         </div>
      </div>
    </div>
  `,
  styles: [`
    .animate-spin-slow { animation: spin 8s linear infinite; }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InsightsPage {
  pulseItems = signal([
    { title: 'Neuro Imaging Cluster', desc: 'Sustained demand for 3T MRI units with spectral capability.', value: 'Extreme', icon: 'psychology' },
    { title: 'Cardiac Screening', desc: 'Rise in dual-source CT requirements for preventative care.', value: 'High', icon: 'favorite' },
    { title: 'Mammography Fleet', desc: 'Transitioning to 3D tomosynthesis across multi-site networks.', value: 'Moderate', icon: 'female' }
  ]);
}
