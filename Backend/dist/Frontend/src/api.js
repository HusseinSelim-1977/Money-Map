"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = exports.healthAPI = exports.userAPI = exports.authAPI = void 0;
const API_URL = 'http://localhost:3001';
const getToken = () => {
    return localStorage.getItem('token') || '';
};
const authFetch = async (url, options = {}) => {
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
exports.authAPI = {
    login: async (email, password) => {
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
    signup: async (userData) => {
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
    logout: async (userId) => {
        const response = await fetch(`${API_URL}/auth/logout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId })
        });
        return response.json();
    },
    forgotPassword: async (email, currentPassword, newPassword) => {
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
    getProfileByEmail: async (email) => {
        return authFetch(`/auth/profile/${email}`);
    }
};
exports.userAPI = {
    getAllUsers: async () => {
        return authFetch('/user');
    },
    getUser: async (userId) => {
        return authFetch(`/user/${userId}`);
    },
    updateUser: async (userId, updates) => {
        return authFetch(`/user/${userId}`, {
            method: 'PATCH',
            body: JSON.stringify(updates)
        });
    },
    deleteUser: async (userId) => {
        return authFetch(`/user/${userId}`, {
            method: 'DELETE'
        });
    },
    getDashboard: async (userId, month) => {
        const query = month ? `?month=${encodeURIComponent(month)}` : '';
        return authFetch(`/user/${userId}/dashboard${query}`);
    },
    getMonthlyFinancialData: async (userId, month) => {
        const query = month ? `?month=${encodeURIComponent(month)}` : '';
        return authFetch(`/user/${userId}/monthly-financial${query}`);
    },
    getLeftoverAfterBills: async (userId) => {
        return authFetch(`/user/${userId}/leftover`);
    },
    getTotals: async (userId) => {
        return authFetch(`/user/${userId}/totals`);
    },
    getInvestmentCategories: async (userId) => {
        return authFetch(`/user/${userId}/investment-categories`);
    },
    getUserProfile: async (userId) => {
        return authFetch(`/user/${userId}/profile`);
    },
    addBill: async (userId, bill) => {
        return authFetch(`/user/${userId}/bills`, {
            method: 'POST',
            body: JSON.stringify(bill)
        });
    },
    updateBill: async (userId, billId, updates) => {
        return authFetch(`/user/${userId}/bills/${billId}`, {
            method: 'PATCH',
            body: JSON.stringify(updates)
        });
    },
    addInvestment: async (userId, investment) => {
        return authFetch(`/user/${userId}/investments`, {
            method: 'POST',
            body: JSON.stringify(investment)
        });
    },
    updateInvestment: async (userId, investmentId, updates) => {
        return authFetch(`/user/${userId}/investments/${investmentId}`, {
            method: 'PATCH',
            body: JSON.stringify(updates)
        });
    },
    addSpending: async (userId, spending) => {
        return authFetch(`/user/${userId}/spendings`, {
            method: 'POST',
            body: JSON.stringify(spending)
        });
    },
    updateSpending: async (userId, spendingId, updates) => {
        return authFetch(`/user/${userId}/spendings/${spendingId}`, {
            method: 'PATCH',
            body: JSON.stringify(updates)
        });
    }
};
exports.healthAPI = {
    checkHealth: async () => {
        try {
            const response = await fetch(`${API_URL}/health`);
            return response.json();
        }
        catch {
            return { status: 'unreachable' };
        }
    },
    checkServer: async () => {
        try {
            const response = await fetch(`${API_URL}/`);
            return response.json();
        }
        catch {
            return { message: 'Server unavailable' };
        }
    }
};
exports.api = {
    auth: exports.authAPI,
    user: exports.userAPI,
    health: exports.healthAPI,
};
exports.default = exports.api;
//# sourceMappingURL=api.js.map