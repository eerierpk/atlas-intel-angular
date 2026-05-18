import { Injectable, signal, computed } from '@angular/core';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'expert' | 'viewer';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user = signal<User | null>(null);
  
  user = computed(() => this._user());
  isAuthenticated = computed(() => !!this._user());
  isAdmin = computed(() => this._user()?.role === 'admin');

  login(email: string, role: 'admin' | 'expert' | 'viewer' = 'viewer') {
    const firstName = email.split('@')[0].split('.')[0];
    const lastName = email.split('@')[0].split('.')[1] || 'User';
    
    this._user.set({
      id: Math.random().toString(36).substring(7),
      email,
      firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
      lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
      role
    });
  }

  logout() {
    this._user.set(null);
  }
}
