// src/components/ExpenseForm/ExpenseForm.tsx
import React, { useState } from "react";
import "./ExpenseForm.css";
import type { ExpenseCategory } from "../ExpenseCard/ExpenseCard";

// Form data interface
interface ExpenseFormData {
  description: string;
  amount: string;
  category: ExpenseCategory;
  date: string;
}

interface FormErrors {
  description?: string;
  amount?: string;
  category?: string;
  date?: string;
}

interface ExpenseFormProps {
  onSubmit: (expenseData: {
    description: string;
    amount: number;
    category: ExpenseCategory;
    date: string;
  }) => void;
}

function ExpenseForm({ onSubmit }: ExpenseFormProps) {
  // Form state using controlled components pattern
  const [formData, setFormData] = useState<ExpenseFormData>({
    description: "",
    amount: "",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
  });

  // Track validation errors
  const [errors, setErrors] = useState<FormErrors>({});

  // Validation function
  function validateForm(info: ExpenseFormData): FormErrors {
    const validationErrors: FormErrors = {};
    if (!info.description.trim()) {
      validationErrors.description = "An expense description is required.";
    }
    if (!info.amount || parseFloat(info.amount) <= 0) {
      validationErrors.amount = "Amount must be greater than 0.";
    }
    if (!info.date) {
      validationErrors.date = "Date is required.";
    }
    if (!info.category) {
      validationErrors.category = "Category is required.";
    }
    return validationErrors;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Validate before submitting
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // stop submission
    }

    // Parse amount safely
    const amount = parseFloat(formData.amount);

    // Submit processed data
    onSubmit({
      description: formData.description.trim(),
      amount,
      category: formData.category,
      date: formData.date,
    });

    // Reset form + errors
    setFormData({
      description: "",
      amount: "",
      category: "Food",
      date: new Date().toISOString().split("T")[0],
    });
    setErrors({});
  };

  return (
    <form
      className="bg-white rounded-lg p-6 mb-8 shadow border border-gray-200"
      onSubmit={handleSubmit}
    >
      <h3>Add New Expense</h3>

      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="What did you spend money on?"
          className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm bg-white text-gray-700 placeholder-gray-400 transition-colors duration-200 hover:border-indigo-600 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10"
        />
        {errors.description && (
          <span className="text-red text-sm">{errors.description}</span>
        )}
      </div>

      <div className="">
        <div className="form-group">
          <label htmlFor="amount">Amount *</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            placeholder="0.00"
            step="0.01"
            min="0"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm bg-white text-gray-700 placeholder-gray-400 transition-colors duration-200 hover:border-indigo-600 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10"
          />
          {errors.amount && (
            <span className="text-red text-sm">{errors.amount}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <select
            className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm bg-white text-gray-700 placeholder-gray-400 transition-colors duration-200 hover:border-indigo-600 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10"
            id="category"
            name="category"
            value={formData.category}
            onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value as ExpenseCategory,
              })
            }
          >
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
            <option value="Other">Other</option>
          </select>
          {errors.category && (
            <span className="text-red text-sm">{errors.category}</span>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="date">Date *</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm bg-white text-gray-700 placeholder-gray-400 transition-colors duration-200 hover:border-indigo-600 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10"
        />
        {errors.date && <span className="text-red text-sm">{errors.date}</span>}
      </div>

      <button type="submit" className="submit-button">
        Add Expense
      </button>
    </form>
  );
}

export default ExpenseForm;
