import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-journey-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div>
        <h2 class="text-3xl font-bold tracking-tight">Machine Journey</h2>
        <p class="text-muted-foreground">End-to-end lifecycle and operational workflows.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
         @for (step of steps(); track step.id) {
           <button (click)="activeStep.set(step.id)" 
             class="panel group hover:border-atlas-blue transition-all"
             [class.border-atlas-blue]="activeStep() === step.id">
             <div class="flex items-center gap-3">
               <div class="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-atlas-blue/10 transition-colors">
                 <i class="material-icons text-muted-foreground group-hover:text-atlas-blue" [class.text-atlas-blue]="activeStep() === step.id">{{ step.icon }}</i>
               </div>
               <div class="text-left">
                 <p class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Step {{ step.id }}</p>
                 <p class="text-xs font-bold">{{ step.label }}</p>
               </div>
             </div>
           </button>
         }
      </div>

      <div class="glass-panel min-h-[500px] flex flex-col items-center justify-center p-12 text-center relative overflow-hidden">
         <div class="absolute inset-0 bg-grid-bg opacity-10"></div>
         
         <div class="relative z-10 space-y-6 max-w-2xl">
            <div class="w-24 h-24 rounded-full bg-atlas-blue/10 flex items-center justify-center mx-auto mb-8 animate-bounce">
              <i class="material-icons text-5xl text-atlas-blue">{{ steps()[activeStep() - 1].icon }}</i>
            </div>
            <h3 class="text-2xl font-bold">Strategic {{ steps()[activeStep() - 1].label }} Roadmap</h3>
            <p class="text-muted-foreground text-sm leading-relaxed">
              In this phase, our AI simulation tracks multi-actor coordination across procurement, clinical leads, and facility engineering.
              Optimizing the {{ steps()[activeStep() - 1].label.toLowerCase() }} process can reduce total deployment time by up to 15%.
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mt-8">
               <div class="bg-card/50 p-4 rounded-xl border border-border">
                 <h4 class="text-xs font-bold uppercase tracking-wider mb-2">Key Actors</h4>
                 <div class="flex gap-2">
                   <span class="chip bg-muted text-[10px]">Hospital Admin</span>
                   <span class="chip bg-muted text-[10px]">Bio-Med Engineer</span>
                 </div>
               </div>
               <div class="bg-card/50 p-4 rounded-xl border border-border">
                 <h4 class="text-xs font-bold uppercase tracking-wider mb-2">Critical Path</h4>
                 <p class="text-[10px] text-muted-foreground">Technical site readiness valuation and shielding verification.</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JourneyPage {
  activeStep = signal(1);
  steps = signal([
    { id: 1, label: 'Selection', icon: 'ads_click' },
    { id: 2, label: 'Installation', icon: 'construction' },
    { id: 3, label: 'Clinical Ops', icon: 'medical_services' },
    { id: 4, label: 'Maintenance', icon: 'build' }
  ]);
}
