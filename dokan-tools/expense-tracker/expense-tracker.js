const amountInput = document.getElementById('amount');
const descInput = document.getElementById('desc');
const addBtn = document.getElementById('add-btn');
const expenseList = document.getElementById('expense-list');
const totalDiv = document.getElementById('total');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Render expenses
function renderExpenses() {
  expenseList.innerHTML = '';

  let total = 0;
  expenses.forEach((expense, index) => {
    total += expense.amount;

    const li = document.createElement('li');
    li.className = 'expense-item';

    li.innerHTML = `
      <div class="expense-desc">${expense.description}</div>
      <div>
        <span class="expense-amount">৳${expense.amount.toFixed(2)}</span>
        <button class="delete-btn" onclick="deleteExpense(${index})">✖</button>
      </div>
    `;

    expenseList.appendChild(li);
  });

  totalDiv.textContent = `Total Expense: ৳${total.toFixed(2)}`;

  localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Add expense
addBtn.addEventListener('click', () => {
  const amount = parseFloat(amountInput.value);
  const description = descInput.value.trim();

  if (isNaN(amount) || amount <= 0) {
    alert('Please enter a valid amount');
    return;
  }

  if (description === '') {
    alert('Please enter a description');
    return;
  }

  expenses.push({ amount, description });

  amountInput.value = '';
  descInput.value = '';

  renderExpenses();
});

// Delete expense
function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
}

// Initial render
renderExpenses();
