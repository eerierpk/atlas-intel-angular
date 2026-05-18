import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-3xl font-bold tracking-tight">User Management</h2>
          <p class="text-muted-foreground">Manage organizational access and roles for your clinical and procurement teams.</p>
        </div>
        
        <button class="bg-atlas-blue text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg shadow-atlas-blue/20">
          <i class="material-icons text-sm">person_add</i> Invite User
        </button>
      </div>

      <div class="panel p-0 overflow-hidden shadow-xl">
         <table class="w-full text-left border-collapse">
            <thead>
               <tr class="bg-muted/50 border-b border-border">
                  <th class="p-4 px-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">User</th>
                  <th class="p-4 px-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Role</th>
                  <th class="p-4 px-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Specialization</th>
                  <th class="p-4 px-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                  <th class="p-4 px-6"></th>
               </tr>
            </thead>
            <tbody class="divide-y divide-border">
               @for (user of users(); track user.id) {
                 <tr class="hover:bg-muted/20 transition-colors">
                    <td class="p-4 px-6">
                       <div class="flex items-center gap-3">
                          <div class="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-xs font-bold">{{ user.name.charAt(0) }}</div>
                          <div>
                             <p class="text-sm font-bold">{{ user.name }}</p>
                             <p class="text-[10px] text-muted-foreground">{{ user.email }}</p>
                          </div>
                       </div>
                    </td>
                    <td class="p-4 px-6">
                       <span class="text-xs px-2 py-1 bg-muted rounded-md border border-border">{{ user.role }}</span>
                    </td>
                    <td class="p-4 px-6 uppercase tracking-tighter font-mono text-[10px] text-muted-foreground">
                       {{ user.spec }}
                    </td>
                    <td class="p-4 px-6">
                       <div class="flex items-center gap-2">
                          <span class="w-2 h-2 rounded-full" [class]="user.online ? 'bg-atlas-emerald shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-muted'"></span>
                          <span class="text-[10px] font-medium">{{ user.online ? 'Active' : 'Offline' }}</span>
                       </div>
                    </td>
                    <td class="p-4 px-6 text-right">
                       <button class="p-2 hover:bg-muted rounded-md transition-colors"><i class="material-icons text-sm">more_vert</i></button>
                    </td>
                 </tr>
               }
            </tbody>
         </table>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminPage {
  users = signal([
    { id: 1, name: 'Dr. Sarah Chen', email: 's.chen@medintel.io', role: 'Clinical Lead', spec: 'Neuro-Radiology', online: true },
    { id: 2, name: 'Marco Rossi', email: 'm.rossi@medintel.io', role: 'Procurement Director', spec: 'Supply Chain', online: false },
    { id: 3, name: 'Elena Gilbert', email: 'e.gilbert@medintel.io', role: 'Bio-Med Admin', spec: 'Equipment Life-cycle', online: true },
    { id: 4, name: 'James Wilson', email: 'j.wilson@medintel.io', role: 'Healthcare Expert', spec: 'Strategic Planning', online: false }
  ]);
}
