import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div class="flex flex-col gap-1">
        <h2 class="text-3xl font-bold tracking-tight">Welcome back, {{ auth.user()?.firstName }}</h2>
        <p class="text-muted-foreground">Here's the latest intelligence for your medical equipment portfolio.</p>
      </div>
      
      <!-- KPI Strip -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        @for (kpi of kpis(); track kpi.label) {
          <div class="panel flex items-center justify-between group hover:border-atlas-blue/50 transition-all cursor-default">
            <div>
              <p class="text-xs font-medium text-muted-foreground uppercase tracking-wider">{{ kpi.label }}</p>
              <h3 class="text-2xl font-bold mt-1">{{ kpi.value }}</h3>
              <p class="text-[10px] font-medium mt-1" [class]="kpi.trendUp ? 'text-atlas-emerald' : 'text-destructive'">
                {{ kpi.trendUp ? '+' : '-' }}{{ kpi.trend }}% <span class="text-muted-foreground ml-1">vs last month</span>
              </p>
            </div>
            <div class="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-atlas-blue/10 transition-colors">
              <i class="material-icons text-muted-foreground group-hover:text-atlas-blue transition-colors">{{ kpi.icon }}</i>
            </div>
          </div>
        }
      </div>
      
      <!-- Hero Search Section -->
      <div class="glass-panel p-8 relative overflow-hidden group">
        <div class="accent-glow top-0 right-0 opacity-20"></div>
        <div class="relative z-10 max-w-2xl">
          <h3 class="text-xl font-bold mb-2">What equipment are you prioritizing today?</h3>
          <p class="text-sm text-muted-foreground mb-6">Compare our latest benchmarks, clinical reviews, and AI-driven ROI scenarios.</p>
          
          <div class="flex gap-2 p-1.5 bg-background/50 border border-border rounded-xl shadow-inner group-focus-within:ring-2 ring-atlas-blue/20 transition-all">
            <i class="material-icons p-2 text-muted-foreground">search</i>
            <input type="text" placeholder="Search by vendor, modality, or clinical application..." 
              class="flex-1 bg-transparent border-none outline-none text-sm">
            <button class="bg-atlas-blue hover:bg-atlas-blue/90 text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition-all">
              Analyze
            </button>
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Recommendations -->
        <div class="lg:col-span-2 space-y-4">
          <h3 class="font-bold flex items-center gap-2">
            <i class="material-icons text-atlas-emerald text-sm">verified</i> Recommendations
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            @for (rec of recommendations(); track rec.title) {
              <div class="panel group hover:shadow-lg transition-all cursor-pointer">
                <div class="flex justify-between items-start mb-4">
                  <div class="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                    <i class="material-icons text-atlas-indigo">{{ rec.icon }}</i>
                  </div>
                  <span class="chip bg-atlas-emerald/10 text-atlas-emerald border-atlas-emerald/20">98% Match</span>
                </div>
                <h4 class="font-bold text-sm mb-1">{{ rec.title }}</h4>
                <p class="text-xs text-muted-foreground mb-4 leading-relaxed">{{ rec.description }}</p>
                <div class="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                  <span class="text-[10px] font-bold text-muted-foreground uppercase">{{ rec.vendor }}</span>
                  <i class="material-icons text-sm group-hover:translate-x-1 transition-transform">arrow_forward</i>
                </div>
              </div>
            }
          </div>
        </div>
        
        <!-- Vendor Feed -->
        <div class="space-y-4">
          <h3 class="font-bold flex items-center gap-2">
            <i class="material-icons text-atlas-indigo text-sm">notifications</i> Vendor Activity
          </h3>
          <div class="panel p-0 overflow-hidden">
            <div class="max-h-[400px] overflow-y-auto divide-y divide-border">
              @for (news of newsFeed(); track news.id) {
                <div class="p-4 hover:bg-muted/30 transition-colors cursor-pointer group">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-[10px] font-bold text-atlas-blue uppercase">{{ news.vendor }}</span>
                    <span class="w-1 h-1 rounded-full bg-muted-foreground"></span>
                    <span class="text-[10px] text-muted-foreground">{{ news.date }}</span>
                  </div>
                  <p class="text-xs font-medium group-hover:text-atlas-blue transition-colors">{{ news.title }}</p>
                </div>
              }
            </div>
            <button class="w-full py-3 text-[10px] font-bold text-muted-foreground hover:text-foreground border-t border-border bg-muted/20 uppercase tracking-widest">
              View all insights
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPage {
  auth = inject(AuthService);

  kpis = signal([
    { label: 'Active Projects', value: '12', trend: '8', trendUp: true, icon: 'folder_open' },
    { label: 'Portfolio Value', value: '$84.2M', trend: '12', trendUp: true, icon: 'account_balance' },
    { label: 'Uptime Avg', value: '96.4%', trend: '1.2', trendUp: false, icon: 'speed' },
    { label: 'Cost Savings', value: '$2.4M', trend: '15', trendUp: true, icon: 'savings' }
  ]);

  recommendations = signal([
    { 
      title: 'MAGNETOM Lumina Pro', 
      vendor: 'Siemens Healthineers', 
      description: 'Ideal replacement candidate for Clinical Site A based on volume trends and technical life-cycle benchmarks.',
      icon: 'biotech'
    },
    { 
      title: 'Revolution Apex CT', 
      vendor: 'GE HealthCare', 
      description: 'Top-tier spectral performance for advanced cardiovascular clusters with limited footprint.',
      icon: 'settings_input_component'
    }
  ]);

  newsFeed = signal([
    { id: 1, vendor: 'Siemens', date: '2h ago', title: 'New AI Spectral reconstruction cleared for MR' },
    { id: 2, vendor: 'Philips', date: '4h ago', title: 'Sustainability report highlights helium-free breakthroughs' },
    { id: 3, vendor: 'Canon', date: '1d ago', title: 'Vantage Galan 3T receives critical hardware update' },
    { id: 4, vendor: 'Fujifilm', date: '2d ago', title: 'Expansion of digital radiography portfolio' },
  ]);
}
