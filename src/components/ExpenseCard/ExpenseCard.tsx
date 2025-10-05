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
 * @param {string} props.category - Expense category fonr organization and filtering
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
      className={`
    bg-white rounded-lg p-4 mb-3 shadow-md
    hover:shadow-lg transition-all duration-200
    border-l-4 relative cursor-pointer
    ${highlighted ? "border-l-orange-500 bg-orange-50" : "border-l-blue-500"}
`}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="inline-block bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold uppercase">
          {category}
        </span>
        <time className="text-sm text-gray-500" dateTime={date}>
          {formattedDate}
        </time>
      </div>

      <div className="space-y-2">
        <h3 className="text-base font-medium text-gray-900">{description}</h3>
        <p className="text-lg font-bold text-green-600">{formattedAmount}</p>

        {onDelete && (
          <button
            className="
              absolute
              bottom-4 right-4
              bg-red-500 hover:bg-red-600
              text-white border-0 rounded-lg
              w-16 h-6 cursor-pointer text-base
              flex items-center justify-center
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-red-400
            "
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
