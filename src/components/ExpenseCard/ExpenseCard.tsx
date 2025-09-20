// src/components/ExpenseCard/ExpenseCard.tsx
import "./ExpenseCard.css";

//Type restriction for inputs
export type ExpenseCategory =
  | "Food"
  | "Transportation"
  | "Entertainment"
  | "Other";
export interface ExpenseCardProps {
  id: string; // Unique identifier for each expense
  description: string; // What the expense was for (e.g., "Lunch at Joe's Pizza")
  amount: number; // Cost in dollars (will be formatted to show currency)
  category: ExpenseCategory; // Type of expense (e.g., "Food", "Transportation")
  date: string; // When the expense occurred (formatted as string)
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  showCategory?: boolean;
  highlighted?: boolean;
}

/**
 * Displays a single expense item with formatted currency and professional styling
 * @param {Object} props - Component props
 * @param {string} props.id - Unique identifier for the expense entry
 * @param {string} props.description - Human-readable description of the expense
 * @param {number} props.amount - Expense amount in dollars (will be formatted as currency)
 * @param {string} props.category - Expense category for organization and filtering
 * @param {string} props.date - Date when expense occurred (ISO string format)
 */
function ExpenseCard({
  id,
  description,
  amount,
  category,
  date,
  onDelete,
  highlighted = false, //future implementation
}: ExpenseCardProps) {
  // Format currency for professional display
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

  // Format date for user-friendly display
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  //Handles deleting expense card if option is available
  function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
    if (onDelete) {
      onDelete(id);
    }
  }

  return (
    <article
      className={`expense-card ${highlighted} && expense-card--highlighted`}
    >
      <div className="expense-header">
        <span className="expense-category">{category}</span>
        <time className="expense-date" dateTime={date}>
          {formattedDate}
        </time>
      </div>

      <div className="">
        <h3 className="expense-description">{description}</h3>
        <p className="expense-amount">{formattedAmount}</p>

        {onDelete && (
          <button
            className="expense-delete-btn"
            onClick={handleDelete}
            aria-label="Delete-expense"
          >
            Delete
          </button>
        )}
      </div>
    </article>
  );
}

export default ExpenseCard;
