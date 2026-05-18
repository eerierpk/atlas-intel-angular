import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DEVICES, Device } from '@data-access/fixtures/devices.fixture';
import { computeRoi } from '@domain/atlas/logic/roi-calculator';

@Component({
  selector: 'app-roi-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-7xl mx-auto space-y-8 animate-in slide-in-from-right-4 duration-700 pb-20">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-3xl font-bold tracking-tight">ROI Calculator</h2>
          <p class="text-muted-foreground">Financial modeling for hospital capital investments.</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Input Section -->
        <div class="lg:col-span-1 space-y-6">
          <div class="panel">
            <h4 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Investment Configuration</h4>
            
            <div class="space-y-4">
               <div>
                  <label class="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Target Device</label>
                  <select [(ngModel)]="selectedDeviceId" (change)="onDeviceChange()" 
                    class="w-full bg-accent/50 border border-border rounded-lg px-3 py-2 text-sm outline-none">
                    @for (d of devices; track d.id) {
                      <option [value]="d.id">{{ d.name }} ({{ d.vendor }})</option>
                    }
                  </select>
               </div>

               <div>
                  <label class="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Capex Investment ($)</label>
                  <input type="number" [(ngModel)]="inputs().capex" 
                    class="w-full bg-accent/50 border border-border rounded-lg px-3 py-2 text-sm outline-none">
               </div>

               <div>
                  <label class="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Procedure Revenue ($)</label>
                  <input type="number" [(ngModel)]="inputs().procedureRevenue" 
                    class="w-full bg-accent/50 border border-border rounded-lg px-3 py-2 text-sm outline-none">
               </div>

               <div>
                  <label class="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Procedures / Day</label>
                  <input type="range" min="1" max="40" [(ngModel)]="inputs().proceduresPerDay" 
                    class="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-atlas-blue">
                  <div class="flex justify-between text-[10px] font-bold text-muted-foreground mt-1">
                    <span>1</span>
                    <span class="text-atlas-blue">{{ inputs().proceduresPerDay }}</span>
                    <span>40</span>
                  </div>
               </div>

               <div class="pt-4 border-t border-border">
                  <h5 class="text-[10px] font-bold text-muted-foreground uppercase mb-2">Operating Costs (Annual)</h5>
                  <div class="space-y-2">
                     <div class="flex justify-between items-center text-xs">
                        <span>Maintenance (OEM)</span>
                        <input type="number" [(ngModel)]="inputs().annualMaintenance" class="w-24 bg-transparent border-b border-border text-right outline-none">
                     </div>
                     <div class="flex justify-between items-center text-xs">
                        <span>Staffing</span>
                        <input type="number" [(ngModel)]="inputs().staffingCostPerYear" class="w-24 bg-transparent border-b border-border text-right outline-none">
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        <!-- Output Section -->
        <div class="lg:col-span-2 space-y-6">
           <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="panel bg-atlas-blue/5 border-atlas-blue/20">
                 <span class="text-[10px] font-bold text-atlas-blue uppercase tracking-widest">Payback Period</span>
                 <h3 class="text-4xl font-bold mt-2">{{ results().paybackPeriod }} <span class="text-lg font-medium text-muted-foreground">Years</span></h3>
                 <p class="text-[10px] text-muted-foreground mt-2">Break-even estimated by year {{ currentYear + Math.ceil(results().paybackPeriod) }}</p>
              </div>
               <div class="panel bg-atlas-emerald/5 border-atlas-emerald/20">
                 <span class="text-[10px] font-bold text-atlas-emerald uppercase tracking-widest">5-Year ROI</span>
                 <h3 class="text-4xl font-bold mt-2 text-atlas-emerald">{{ results().fiveYearROI }}%</h3>
                 <p class="text-[10px] text-muted-foreground mt-2">Estimated lifetime value: {{ formatCurrency(results().annualEBITDA * 5) }}</p>
              </div>
           </div>

           <div class="panel space-y-6">
              <h4 class="font-bold flex items-center gap-2">
                <i class="material-icons text-atlas-indigo">bar_chart</i> Annual Cash Flow Projection
              </h4>
              <div class="h-64 flex flex-col justify-end gap-2 px-10">
                 <div class="flex items-end justify-between h-full gap-4">
                    @for (year of [1,2,3,4,5]; track year) {
                      <div class="flex-1 flex flex-col items-center gap-2">
                        <div class="w-full bg-atlas-blue rounded-t-md transition-all duration-500" 
                             [style.height.%]="20 + (year * 15)">
                        </div>
                        <span class="text-[10px] font-bold text-muted-foreground">Year {{ year }}</span>
                      </div>
                    }
                 </div>
              </div>
           </div>

           <div class="panel bg-accent/20">
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-lg bg-atlas-indigo/10 flex items-center justify-center shrink-0">
                  <i class="material-icons text-atlas-indigo">auto_awesome</i>
                </div>
                <div>
                   <h5 class="font-bold text-sm mb-1">Simulation Insight</h5>
                   <p class="text-xs text-muted-foreground leading-relaxed">
                     By increasing procedures to <span class="text-foreground font-bold">{{ inputs().proceduresPerDay + 5 }}</span> per day using v4 firmware workflow optimization, you could reduce the payback period by <span class="text-atlas-emerald font-bold">0.6 years</span>.
                   </p>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoiPage {
  route = inject(ActivatedRoute);
  devices = DEVICES;
  selectedDeviceId = signal(DEVICES[0].id);
  currentYear = new Date().getFullYear();
  Math = Math;

  inputs = signal({
    capex: DEVICES[0].basePrice,
    annualMaintenance: DEVICES[0].basePrice * 0.08,
    procedureRevenue: 1200,
    proceduresPerDay: 12,
    operatingDaysPerYear: 260,
    staffingCostPerYear: 350000,
    otherOperatingExpenses: 120000
  });

  results = computed(() => computeRoi(this.inputs()));

  constructor() {
    this.route.queryParams.subscribe(params => {
      const id = params['device'];
      if (id) {
        this.selectedDeviceId.set(id);
        this.onDeviceChange();
      }
    });
  }

  onDeviceChange() {
    const d = DEVICES.find(item => item.id === this.selectedDeviceId());
    if (d) {
      this.inputs.update(prev => ({
        ...prev,
        capex: d.basePrice,
        annualMaintenance: d.basePrice * 0.08
      }));
    }
  }

  formatCurrency(val: number) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  }
}
