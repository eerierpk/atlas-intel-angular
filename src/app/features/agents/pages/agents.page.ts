import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agents-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-3xl font-bold tracking-tight">AI Agents Launcher</h2>
          <p class="text-muted-foreground">Access specialized intelligence cores for specific decision support tasks.</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         @for (agent of agents(); track agent.name) {
           <div class="glass-panel group hover:border-atlas-blue transition-all cursor-pointer relative overflow-hidden flex flex-col p-6">
              <div class="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center transition-all bg-muted group-hover:bg-atlas-blue/10">
                 <i class="material-icons text-4xl text-muted-foreground group-hover:text-atlas-blue">{{ agent.icon }}</i>
              </div>
              
              <h3 class="text-lg font-bold mb-2 group-hover:text-atlas-blue transition-colors">{{ agent.name }}</h3>
              <p class="text-xs text-muted-foreground leading-relaxed mb-6">{{ agent.desc }}</p>
              
              <div class="mt-auto space-y-3">
                 <div class="flex flex-wrap gap-1">
                   @for (chip of agent.chips; track chip) {
                     <span class="chip bg-muted text-[10px]">{{ chip }}</span>
                   }
                 </div>
                 <button class="w-full bg-primary text-primary-foreground py-2 rounded-xl text-xs font-bold transition-all active:scale-95 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                   Launch Agent
                 </button>
              </div>

              <div class="absolute top-4 right-4 animate-pulse">
                <span class="w-2 h-2 rounded-full" [class]="agent.ready ? 'bg-atlas-emerald shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-muted'"></span>
              </div>
           </div>
         }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgentsPage {
  agents = signal([
    { name: 'Ask Atlas', icon: 'auto_awesome', desc: 'General-purpose knowledge assistant for device catalog, benchmarks and ROI queries.', chips: ['Catalog', 'ROI', 'Benchmarks'], ready: true },
    { name: 'Intel Expert', icon: 'psychology', desc: 'Clinical workflow simulation and tradeoff specialist. Deep-dives into technical site specs.', chips: ['Clinical', 'Workflows', 'Drafts'], ready: true },
    { name: 'Doc Ingest', icon: 'description', desc: 'Upload OEM spec sheets or vendor quotes to compare directly against market benchmarks.', chips: ['Parsing', 'Analysis', 'OCRs'], ready: true },
    { name: 'Web Scout', icon: 'travel_explore', desc: 'Real-time market monitoring. Scours public journals and vendor press releases for new updates.', chips: ['Monitoring', 'Journalism', 'Live'], ready: false }
  ]);
}
