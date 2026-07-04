import { Injectable } from '@angular/core';

export interface User {
  id: number;
  fullName: string;
  email: string;
  passWord: string;
  phone: string;
  photo: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly USERS_KEY = 'REGDETAILS';
  private readonly CURRENT_USER_KEY = 'CURRENT_USER';

  register(data: { fullName: string; email: string; passWord: string }): { success: boolean; message: string } {
    const users = this.getAllUsers();
    const exists = users.find(u => u.email === data.email);
    if (exists) {
      return { success: false, message: 'An account with this email already exists.' };
    }
    const newUser: User = {
      id: Date.now(),
      fullName: data.fullName,
      email: data.email,
      passWord: data.passWord,
      phone: '',
      photo: '',
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    return { success: true, message: 'Account created successfully.' };
  }

  login(email: string, password: string): User | null {
    const users = this.getAllUsers();
    const user = users.find(u => u.email === email && u.passWord === password) || null;
    if (user) {
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
    }
    return user;
  }

  getCurrentUser(): User | null {
    try {
      const data = localStorage.getItem(this.CURRENT_USER_KEY);
      if (!data) return null;
      const user = JSON.parse(data) as User;
      // Ensure all fields exist (backwards compatibility)
      user.photo = user.photo || '';
      user.phone = user.phone || '';
      return user;
    } catch {
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  getAllUsers(): User[] {
    return JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
  }

  updateProfile(updates: Partial<User>): void {
    const current = this.getCurrentUser();
    if (!current) return;
    const users = this.getAllUsers();
    const idx = users.findIndex(u => u.id === current.id);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...updates };
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(users[idx]));
    }
  }
}
