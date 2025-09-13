import { useState } from "react";
import Header from "./components/Header/Header";
import ExpenseSummary from "./components/ExpenseSummary/ExpenseSummary";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import type { ExpenseCategory } from "./components/ExpenseCard/ExpenseCard";
import "./App.css";

// Type for expense data
interface Expense {
  id: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  createdAt?: string; //optional meta data
  updatedAt?: string; //tracking
  tags?: string[]; //future implementation
}

function App() {
  //Storage of expenses and used across all functions and components throughout application 
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "1",
      description: "Lunch at downtown cafe",
      amount: 12.5,
      category: "Food",
      date: "2024-01-15",
    },
    {
      id: "2",
      description: "Monthly bus pass",
      amount: 95.0,
      category: "Transportation",
      date: "2024-01-14",
    },
  ]);

  /**
   * Adds new expense to application state
   * This function is passed down to ExpenseForm component
   * @param {Omit<Expense, 'id'>} expenseData - New expense data without ID
   */
  function handleAddExpense(expenseData: Omit<Expense, "id">): void {
    const newExpense: Expense = {
      ...expenseData,
      id: Date.now().toString(),
    };
    setExpenses((prev) => [...prev, newExpense]);
  }
  //Deletes expenses function passed into child props
  //This function is passed into Expense List and Expense List passes it into Expense Card
  function handleDeleteExpense(id: string) {
    // Filter out the expense with the matching id
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
  }

  const totalAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <div className="App">
      <div className="app-container">
        <Header
          title="Expense Tracker"
          subtitle="Manage your spending with confidence"
        />

        <main className="app-main">
          <ExpenseSummary
            totalAmount={totalAmount}
            expenseCount={expenses.length}
            period="This Month"
          />
          <ExpenseForm onSubmit={handleAddExpense} />
          <ExpenseList
            expenses={expenses}
            deleteExpense={handleDeleteExpense}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
