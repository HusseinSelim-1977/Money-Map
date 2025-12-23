// frontend/src/services/api.ts
import {
  User,
  Bill,
  Investment,
  Spending,
  LoginResponse,
  SignupResponse,
  DashboardData,
  MonthlyFinancialData,
  TotalsResponse,
  CreateUserDto,
  UpdateUserDto,
  LoginDto,
  SignupDto,
  ForgotPasswordDto,
  AddBillDto,
  AddInvestmentDto,
  AddSpendingDto
} from './types';

const API_URL = 'http://localhost:3001';

const getToken = (): string => {
  return localStorage.getItem('token') || '';
};

const authFetch = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
    throw new Error('Authentication required');
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API request failed');
  }

  return response.json();
};

export const authAPI = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    
    return response.json();
  },

  signup: async (userData: SignupDto): Promise<SignupResponse> => {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Signup failed');
    }
    
    return response.json();
  },

  logout: async (userId: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    });
    return response.json();
  },

  forgotPassword: async (email: string, currentPassword: string, newPassword: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, currentPassword, newPassword })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Password update failed');
    }
    
    return response.json();
  },

  getProfileByEmail: async (email: string): Promise<User> => {
    return authFetch<User>(`/auth/profile/${email}`);
  }
};

export const userAPI = {
  getAllUsers: async (): Promise<User[]> => {
    return authFetch<User[]>('/user');
  },

  getUser: async (userId: string): Promise<User> => {
    return authFetch<User>(`/user/${userId}`);
  },

  updateUser: async (userId: string, updates: UpdateUserDto): Promise<User> => {
    return authFetch<User>(`/user/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(updates)
    });
  },

  deleteUser: async (userId: string): Promise<User> => {
    return authFetch<User>(`/user/${userId}`, {
      method: 'DELETE'
    });
  },

  getDashboard: async (userId: string, month?: string): Promise<DashboardData> => {
    const query = month ? `?month=${encodeURIComponent(month)}` : '';
    return authFetch<DashboardData>(`/user/${userId}/dashboard${query}`);
  },

  getMonthlyFinancialData: async (userId: string, month?: string): Promise<MonthlyFinancialData> => {
    const query = month ? `?month=${encodeURIComponent(month)}` : '';
    return authFetch<MonthlyFinancialData>(`/user/${userId}/monthly-financial${query}`);
  },

  getLeftoverAfterBills: async (userId: string): Promise<number> => {
    return authFetch<number>(`/user/${userId}/leftover`);
  },

  getTotals: async (userId: string): Promise<TotalsResponse> => {
    return authFetch<TotalsResponse>(`/user/${userId}/totals`);
  },

  getInvestmentCategories: async (userId: string): Promise<any[]> => {
    return authFetch<any[]>(`/user/${userId}/investment-categories`);
  },

  getUserProfile: async (userId: string): Promise<any> => {
    return authFetch<any>(`/user/${userId}/profile`);
  },

  addBill: async (userId: string, bill: AddBillDto): Promise<User> => {
    return authFetch<User>(`/user/${userId}/bills`, {
      method: 'POST',
      body: JSON.stringify(bill)
    });
  },

  updateBill: async (userId: string, billId: string, updates: Partial<Bill>): Promise<User> => {
    return authFetch<User>(`/user/${userId}/bills/${billId}`, {
      method: 'PATCH',
      body: JSON.stringify(updates)
    });
  },

  addInvestment: async (userId: string, investment: AddInvestmentDto): Promise<User> => {
    return authFetch<User>(`/user/${userId}/investments`, {
      method: 'POST',
      body: JSON.stringify(investment)
    });
  },

  updateInvestment: async (userId: string, investmentId: string, updates: Partial<Investment>): Promise<User> => {
    return authFetch<User>(`/user/${userId}/investments/${investmentId}`, {
      method: 'PATCH',
      body: JSON.stringify(updates)
    });
  },

  addSpending: async (userId: string, spending: AddSpendingDto): Promise<User> => {
    return authFetch<User>(`/user/${userId}/spendings`, {
      method: 'POST',
      body: JSON.stringify(spending)
    });
  },

  updateSpending: async (userId: string, spendingId: string, updates: Partial<Spending>): Promise<User> => {
    return authFetch<User>(`/user/${userId}/spendings/${spendingId}`, {
      method: 'PATCH',
      body: JSON.stringify(updates)
    });
  }
};

export const healthAPI = {
  checkHealth: async (): Promise<{ status: string }> => {
    try {
      const response = await fetch(`${API_URL}/health`);
      return response.json();
    } catch {
      return { status: 'unreachable' };
    }
  },

  checkServer: async (): Promise<{ message: string }> => {
    try {
      const response = await fetch(`${API_URL}/`);
      return response.json();
    } catch {
      return { message: 'Server unavailable' };
    }
  }
};

export const api = {
  auth: authAPI,
  user: userAPI,
  health: healthAPI,
};

export default api;