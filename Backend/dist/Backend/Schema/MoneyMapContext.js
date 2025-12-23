"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoneyMapProvider = MoneyMapProvider;
exports.useMoneyMap = useMoneyMap;
const react_1 = require("react");
const api_1 = require("../../Frontend/src/api");
const MoneyMapContext = (0, react_1.createContext)(undefined);
const DEFAULT_INVESTMENT_CATEGORIES = [
    { id: "1", name: "Stocks", percentage: 40, description: "Equity investments" },
    { id: "2", name: "Bonds", percentage: 30, description: "Fixed income securities" },
    { id: "3", name: "Real Estate", percentage: 20, description: "Property investments" },
    { id: "4", name: "Crypto", percentage: 10, description: "Digital assets" },
    { id: "5", name: "Other", percentage: 0, description: "Custom investment category" }
];
function mapBackendUserToFrontend(user) {
    return {
        userId: user.id,
        profile: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            currency: user.currency,
            isSetup: true,
            monthlySalary: user.salary
        },
        bills: user.bill.map(bill => ({
            id: bill.id,
            title: bill.title,
            amountNeeded: bill.amountNeeded,
            amountDeposited: bill.amountDeposited,
            dueDate: bill.dueDate,
            category: bill.category ?? "bill"
        })),
        investments: user.investment.map(inv => ({
            id: inv.id,
            title: inv.title,
            amountNeeded: inv.amountNeeded,
            amountDeposited: inv.amountDeposited
        })),
        spendings: user.spending.map(spending => ({
            id: spending.id,
            title: spending.title,
            amountDeposited: spending.amountDeposited,
            category: spending.category ?? "spending",
            date: spending.date ?? new Date().toISOString().split('T')[0]
        })),
        investmentCategories: user.investmentCategories && user.investmentCategories.length > 0
            ? user.investmentCategories
            : DEFAULT_INVESTMENT_CATEGORIES
    };
}
function mapFrontendUserToBackend(userData) {
    return {
        firstName: userData.profile.firstName,
        lastName: userData.profile.lastName,
        email: userData.profile.email,
        currency: userData.profile.currency,
        salary: userData.profile.monthlySalary,
        bill: userData.bills.map(bill => ({
            id: bill.id,
            title: bill.title,
            amountNeeded: bill.amountNeeded,
            amountDeposited: bill.amountDeposited,
            dueDate: bill.dueDate,
            category: 'bill'
        })),
        investment: userData.investments.map(inv => ({
            id: inv.id,
            title: inv.title,
            amountNeeded: inv.amountNeeded,
            amountDeposited: inv.amountDeposited
        })),
        spending: userData.spendings.map(spending => ({
            id: spending.id,
            title: spending.title,
            amountDeposited: spending.amountDeposited,
            category: 'spending',
            date: new Date().toISOString().split('T')[0]
        })),
        investmentCategories: userData.investmentCategories
    };
}
function MoneyMapProvider({ children }) {
    const [userData, setUserData] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const [isLoggedIn, setIsLoggedIn] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const token = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");
        if (token && savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser);
                setUserData(mapBackendUserToFrontend(parsedUser));
                setIsLoggedIn(true);
            }
            catch (e) {
                console.error("Failed to load saved data:", e);
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }
        }
        setIsLoading(false);
    }, []);
    const fetchUserData = async () => {
        if (!userData?.userId)
            return;
        try {
            const user = await api_1.api.user.getUser(userData.userId);
            setUserData(mapBackendUserToFrontend(user));
            localStorage.setItem("user", JSON.stringify(user));
        }
        catch (error) {
            console.error("Failed to fetch user data:", error);
        }
    };
    const updateProfile = async (profile) => {
        if (!userData?.userId)
            return;
        try {
            const updates = {
                firstName: profile.firstName,
                lastName: profile.lastName,
                email: profile.email,
                currency: profile.currency,
                salary: profile.monthlySalary
            };
            const updatedUser = await api_1.api.user.updateUser(userData.userId, updates);
            setUserData(mapBackendUserToFrontend(updatedUser));
            localStorage.setItem("user", JSON.stringify(updatedUser));
        }
        catch (error) {
            console.error("Failed to update profile:", error);
        }
    };
    const addBill = async (bill) => {
        if (!userData?.userId)
            return;
        try {
            const newBill = {
                ...bill,
                id: Date.now().toString()
            };
            const updatedUser = await api_1.api.user.addBill(userData.userId, newBill);
            setUserData(mapBackendUserToFrontend(updatedUser));
            localStorage.setItem("user", JSON.stringify(updatedUser));
        }
        catch (error) {
            console.error("Failed to add bill:", error);
        }
    };
    const updateBill = async (id, bill) => {
        if (!userData?.userId)
            return;
        try {
            const updatedUser = await api_1.api.user.updateBill(userData.userId, id, bill);
            setUserData(mapBackendUserToFrontend(updatedUser));
            localStorage.setItem("user", JSON.stringify(updatedUser));
        }
        catch (error) {
            console.error("Failed to update bill:", error);
        }
    };
    const deleteBill = (id) => {
        setUserData(prev => {
            if (!prev)
                return prev;
            return {
                ...prev,
                bills: prev.bills.filter(b => b.id !== id)
            };
        });
    };
    const addInvestment = async (investment) => {
        if (!userData?.userId)
            return;
        try {
            const newInvestment = {
                ...investment,
                id: Date.now().toString()
            };
            const updatedUser = await api_1.api.user.addInvestment(userData.userId, newInvestment);
            setUserData(mapBackendUserToFrontend(updatedUser));
            localStorage.setItem("user", JSON.stringify(updatedUser));
        }
        catch (error) {
            console.error("Failed to add investment:", error);
        }
    };
    const updateInvestment = async (id, investment) => {
        if (!userData?.userId)
            return;
        try {
            const updatedUser = await api_1.api.user.updateInvestment(userData.userId, id, investment);
            setUserData(mapBackendUserToFrontend(updatedUser));
            localStorage.setItem("user", JSON.stringify(updatedUser));
        }
        catch (error) {
            console.error("Failed to update investment:", error);
        }
    };
    const deleteInvestment = (id) => {
        setUserData(prev => {
            if (!prev)
                return prev;
            return {
                ...prev,
                investments: prev.investments.filter(inv => inv.id !== id)
            };
        });
    };
    const addSpending = async (spending) => {
        if (!userData?.userId)
            return;
        try {
            const newSpending = {
                ...spending,
                id: Date.now().toString()
            };
            const updatedUser = await api_1.api.user.addSpending(userData.userId, newSpending);
            setUserData(mapBackendUserToFrontend(updatedUser));
            localStorage.setItem("user", JSON.stringify(updatedUser));
        }
        catch (error) {
            console.error("Failed to add spending:", error);
        }
    };
    const updateSpending = async (id, spending) => {
        if (!userData?.userId)
            return;
        try {
            const updatedUser = await api_1.api.user.updateSpending(userData.userId, id, spending);
            setUserData(mapBackendUserToFrontend(updatedUser));
            localStorage.setItem("user", JSON.stringify(updatedUser));
        }
        catch (error) {
            console.error("Failed to update spending:", error);
        }
    };
    const deleteSpending = (id) => {
        setUserData(prev => {
            if (!prev)
                return prev;
            return {
                ...prev,
                spendings: prev.spendings.filter(s => s.id !== id)
            };
        });
    };
    const setInvestmentCategories = (categories) => {
        setUserData(prev => {
            if (!prev)
                return prev;
            return {
                ...prev,
                investmentCategories: categories
            };
        });
    };
    const getMonthlyTotals = async () => {
        if (!userData?.userId) {
            return {
                totalBillsNeeded: 0,
                totalBillsDeposited: 0,
                totalInvestmentNeeded: 0,
                totalInvestmentDeposited: 0,
                totalSpending: 0
            };
        }
        try {
            const totals = await api_1.api.user.getTotals(userData.userId);
            return {
                totalBillsNeeded: totals.billsTotal,
                totalBillsDeposited: userData.bills.reduce((sum, b) => sum + b.amountDeposited, 0),
                totalInvestmentNeeded: totals.investmentsTotal,
                totalInvestmentDeposited: userData.investments.reduce((sum, inv) => sum + inv.amountDeposited, 0),
                totalSpending: totals.spendingTotal
            };
        }
        catch (error) {
            console.error("Failed to get totals:", error);
            return {
                totalBillsNeeded: 0,
                totalBillsDeposited: 0,
                totalInvestmentNeeded: 0,
                totalInvestmentDeposited: 0,
                totalSpending: 0
            };
        }
    };
    const getSpendingAlerts = async () => {
        const alerts = [];
        if (!userData)
            return alerts;
        const totals = await getMonthlyTotals();
        const currency = userData.profile.currency;
        if (totals.totalBillsDeposited < totals.totalBillsNeeded) {
            alerts.push({
                title: "Bills Shortage",
                message: `You're short by ${currency} ${(totals.totalBillsNeeded - totals.totalBillsDeposited).toFixed(2)} for bills this month`,
                type: "shortage",
            });
        }
        if (totals.totalInvestmentDeposited < totals.totalInvestmentNeeded) {
            alerts.push({
                title: "Investment Shortage",
                message: `You're short by ${currency} ${(totals.totalInvestmentNeeded - totals.totalInvestmentDeposited).toFixed(2)} for investments`,
                type: "warning",
            });
        }
        if (totals.totalSpending > totals.totalBillsNeeded) {
            alerts.push({
                title: "High Spending Alert",
                message: `Your spending (${currency} ${totals.totalSpending.toFixed(2)}) exceeds bills needed`,
                type: "warning",
            });
        }
        return alerts;
    };
    const getLeftoverAmount = async () => {
        if (!userData?.userId)
            return 0;
        try {
            const leftover = await api_1.api.user.getLeftoverAfterBills(userData.userId);
            return leftover;
        }
        catch (error) {
            console.error("Failed to get leftover amount:", error);
            return 0;
        }
    };
    const getDashboardData = async (month) => {
        if (!userData?.userId)
            return null;
        try {
            return await api_1.api.user.getDashboard(userData.userId, month);
        }
        catch (error) {
            console.error("Failed to get dashboard data:", error);
            return null;
        }
    };
    const getMonthlyFinancialData = async (month) => {
        if (!userData?.userId)
            return null;
        try {
            return await api_1.api.user.getMonthlyFinancialData(userData.userId, month);
        }
        catch (error) {
            console.error("Failed to get monthly financial data:", error);
            return null;
        }
    };
    const login = async (email, password) => {
        try {
            const data = await api_1.api.auth.login(email, password);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            const frontendUserData = mapBackendUserToFrontend(data.user);
            setUserData(frontendUserData);
            setIsLoggedIn(true);
            localStorage.setItem("moneymap-logged-in", "true");
            return true;
        }
        catch (error) {
            console.error("Login error:", error);
            return false;
        }
    };
    const signup = async (firstName, lastName, email, password, currency) => {
        try {
            const signupData = { firstName, lastName, email, password, currency };
            const data = await api_1.api.auth.signup(signupData);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            const frontendUserData = mapBackendUserToFrontend(data.user);
            setUserData(frontendUserData);
            setIsLoggedIn(true);
            localStorage.setItem("moneymap-logged-in", "true");
            return true;
        }
        catch (error) {
            console.error("Signup error:", error);
            return false;
        }
    };
    const logout = () => {
        if (userData?.userId) {
            api_1.api.auth.logout(userData.userId).catch(console.error);
        }
        setIsLoggedIn(false);
        localStorage.setItem("moneymap-logged-in", "false");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUserData(null);
    };
    const changeCurrency = async (currency) => {
        if (!userData?.userId)
            return;
        try {
            const updatedUser = await api_1.api.user.updateUser(userData.userId, { currency });
            setUserData(mapBackendUserToFrontend(updatedUser));
            localStorage.setItem("user", JSON.stringify(updatedUser));
        }
        catch (error) {
            console.error("Failed to change currency:", error);
        }
    };
    return (0, react_1.createElement)(MoneyMapContext.Provider, {
        value: {
            userData,
            isLoading,
            isLoggedIn,
            updateProfile,
            addBill,
            updateBill,
            deleteBill,
            addInvestment,
            updateInvestment,
            deleteInvestment,
            addSpending,
            updateSpending,
            deleteSpending,
            setInvestmentCategories,
            getMonthlyTotals,
            getSpendingAlerts,
            getLeftoverAmount,
            getDashboardData,
            getMonthlyFinancialData,
            login,
            signup,
            logout,
            changeCurrency,
            fetchUserData,
        },
    }, children);
}
function useMoneyMap() {
    const schema = (0, react_1.useContext)(MoneyMapContext);
    if (!schema) {
        throw new Error("useMoneyMap must be used within MoneyMapProvider");
    }
    return schema;
}
//# sourceMappingURL=MoneyMapContext.js.map