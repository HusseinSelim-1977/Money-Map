"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoneyMapProvider = MoneyMapProvider;
exports.useMoneyMap = useMoneyMap;
const react_1 = require("react");
const MoneyMapContext = (0, react_1.createContext)(undefined);
const DEFAULT_INVESTMENT_CATEGORIES = [
    { id: "1", name: "Stocks", percentage: 40, description: "Equity investments" },
    { id: "2", name: "Bonds", percentage: 30, description: "Fixed income securities" },
    { id: "3", name: "Real Estate", percentage: 20, description: "Property investments" },
    { id: "4", name: "Crypto", percentage: 10, description: "Digital assets" },
    { id: "5", name: "Other", percentage: 0, description: "Custom investment category" }
];
function MoneyMapProvider({ children }) {
    const [userData, setUserData] = (0, react_1.useState)({
        userId: "user-1",
        profile: {
            firstName: "",
            lastName: "",
            email: "",
            currency: "USD",
            isSetup: false,
            monthlySalary: 0,
        },
        bills: [],
        investments: [],
        spendings: [],
        investmentCategories: DEFAULT_INVESTMENT_CATEGORIES,
    });
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const [isLoggedIn, setIsLoggedIn] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const saved = localStorage.getItem("moneymap-data");
        const loggedIn = localStorage.getItem("moneymap-logged-in");
        if (saved) {
            try {
                setUserData(JSON.parse(saved));
            }
            catch (e) {
                console.error("Failed to load saved data:", e);
            }
        }
        if (loggedIn === "true") {
            setIsLoggedIn(true);
        }
        setIsLoading(false);
    }, []);
    (0, react_1.useEffect)(() => {
        localStorage.setItem("moneymap-data", JSON.stringify(userData));
    }, [userData]);
    const updateProfile = (profile) => {
        setUserData((prev) => ({
            ...prev,
            profile: { ...prev.profile, ...profile },
        }));
    };
    const addBill = (bill) => {
        const newBill = {
            ...bill,
            id: Date.now().toString(),
        };
        setUserData((prev) => ({
            ...prev,
            bills: [...prev.bills, newBill],
        }));
    };
    const updateBill = (id, bill) => {
        setUserData((prev) => ({
            ...prev,
            bills: prev.bills.map((b) => (b.id === id ? { ...b, ...bill } : b)),
        }));
    };
    const deleteBill = (id) => {
        setUserData((prev) => ({
            ...prev,
            bills: prev.bills.filter((b) => b.id !== id),
        }));
    };
    const addInvestment = (investment) => {
        const newInvestment = {
            ...investment,
            id: Date.now().toString(),
        };
        setUserData((prev) => ({
            ...prev,
            investments: [...prev.investments, newInvestment],
        }));
    };
    const updateInvestment = (id, investment) => {
        setUserData((prev) => ({
            ...prev,
            investments: prev.investments.map((inv) => (inv.id === id ? { ...inv, ...investment } : inv)),
        }));
    };
    const deleteInvestment = (id) => {
        setUserData((prev) => ({
            ...prev,
            investments: prev.investments.filter((inv) => inv.id !== id),
        }));
    };
    const addSpending = (spending) => {
        const newSpending = {
            ...spending,
            id: Date.now().toString(),
        };
        setUserData((prev) => ({
            ...prev,
            spendings: [...prev.spendings, newSpending],
        }));
    };
    const updateSpending = (id, spending) => {
        setUserData((prev) => ({
            ...prev,
            spendings: prev.spendings.map((s) => (s.id === id ? { ...s, ...spending } : s)),
        }));
    };
    const deleteSpending = (id) => {
        setUserData((prev) => ({
            ...prev,
            spendings: prev.spendings.filter((s) => s.id !== id),
        }));
    };
    const setInvestmentCategories = (categories) => {
        setUserData((prev) => ({
            ...prev,
            investmentCategories: categories,
        }));
    };
    const getMonthlyTotals = () => {
        const totalBillsNeeded = userData.bills.reduce((sum, b) => sum + b.amountNeeded, 0);
        const totalBillsDeposited = userData.bills.reduce((sum, b) => sum + b.amountDeposited, 0);
        const totalInvestmentNeeded = userData.investments.reduce((sum, inv) => sum + inv.amountNeeded, 0);
        const totalInvestmentDeposited = userData.investments.reduce((sum, inv) => sum + inv.amountDeposited, 0);
        const totalSpending = userData.spendings.reduce((sum, s) => sum + s.amountDeposited, 0);
        return {
            totalBillsNeeded,
            totalBillsDeposited,
            totalInvestmentNeeded,
            totalInvestmentDeposited,
            totalSpending,
        };
    };
    const getSpendingAlerts = () => {
        const alerts = [];
        const totals = getMonthlyTotals();
        if (totals.totalBillsDeposited < totals.totalBillsNeeded) {
            alerts.push({
                title: "Bills Shortage",
                message: `You're short by ${userData.profile.currency} ${(totals.totalBillsNeeded - totals.totalBillsDeposited).toFixed(2)} for bills this month`,
                type: "shortage",
            });
        }
        if (totals.totalInvestmentDeposited < totals.totalInvestmentNeeded) {
            alerts.push({
                title: "Investment Shortage",
                message: `You're short by ${userData.profile.currency} ${(totals.totalInvestmentNeeded - totals.totalInvestmentDeposited).toFixed(2)} for investments`,
                type: "warning",
            });
        }
        if (totals.totalSpending > totals.totalBillsNeeded) {
            alerts.push({
                title: "High Spending Alert",
                message: `Your spending (${userData.profile.currency} ${totals.totalSpending.toFixed(2)}) exceeds bills needed`,
                type: "warning",
            });
        }
        return alerts;
    };
    const getLeftoverAmount = () => {
        const totals = getMonthlyTotals();
        const totalNeeded = totals.totalBillsNeeded + totals.totalInvestmentNeeded + totals.totalSpending;
        return Math.max(0, userData.profile.monthlySalary - totalNeeded);
    };
    const login = (email, password) => {
        const saved = localStorage.getItem("moneymap-users");
        const users = saved ? JSON.parse(saved) : [];
        const user = users.find((u) => u.email === email && u.password === password);
        if (user) {
            setUserData(user.data);
            setIsLoggedIn(true);
            localStorage.setItem("moneymap-logged-in", "true");
            return true;
        }
        return false;
    };
    const signup = (firstName, lastName, email, password, currency) => {
        const saved = localStorage.getItem("moneymap-users");
        const users = saved ? JSON.parse(saved) : [];
        if (users.find((u) => u.email === email)) {
            return false;
        }
        const newUser = {
            email,
            password,
            data: {
                userId: Date.now().toString(),
                profile: {
                    firstName,
                    lastName,
                    email,
                    currency,
                    isSetup: true,
                    monthlySalary: 0,
                },
                bills: [],
                investments: [],
                spendings: [],
                investmentCategories: DEFAULT_INVESTMENT_CATEGORIES,
            },
        };
        users.push(newUser);
        localStorage.setItem("moneymap-users", JSON.stringify(users));
        setUserData(newUser.data);
        setIsLoggedIn(true);
        localStorage.setItem("moneymap-logged-in", "true");
        return true;
    };
    const logout = () => {
        setIsLoggedIn(false);
        localStorage.setItem("moneymap-logged-in", "false");
        setUserData({
            userId: "user-1",
            profile: {
                firstName: "",
                lastName: "",
                email: "",
                currency: "USD",
                isSetup: false,
                monthlySalary: 0,
            },
            bills: [],
            investments: [],
            spendings: [],
            investmentCategories: DEFAULT_INVESTMENT_CATEGORIES,
        });
    };
    const changeCurrency = (currency) => {
        updateProfile({ currency });
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
            login,
            signup,
            logout,
            changeCurrency,
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