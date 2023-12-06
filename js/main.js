// BUTTONS - Variables
const btnShowPanel = document.querySelector('.summary_buttons-add');
const btnDeleteAllPayements = document.querySelector('.summary_buttons-clear');
const btnClosePanel = document.querySelector('.cancel-btn');
const btnSaveTransaction = document.querySelector('.save-btn');

// CONTENT - Variables
const panel = document.querySelector('.panel');
const payementRevenuesBox = document.querySelector('.transactions_box_revenues');
const payementExpensesBox = document.querySelector('.transactions_box_expenses');

// INPUT   - Variables
const transactionTitle = document.querySelector('.transaction-title-input');
const transactionAmount = document.querySelector('.transaction-amount-input');
const transactionCategory = document.querySelector(
	'.transaction-category-input'
);
const transactionTypeRevenues = document.querySelector('#revenues');
const transactionTypeExpenses = document.querySelector('#expenses');

transactionTypeExpenses.checked = false;
transactionTypeRevenues.checked = false;

//FUNCTION - checking if one of inputs is empty
const checkInputs = () => {
	if (
		transactionTitle.value === '' ||
		transactionAmount.value === '' ||
		transactionCategory.value == 0
	) {
		console.log('input empty');
	} else if (
		transactionTypeExpenses.checked == false &&
		transactionTypeRevenues.checked == false
	) {
		console.log('radio empty');
	} else {
		console.log('jest git');
		showPanel();
        createPayement();
		clearInputs();
	}
};

//FUNCTION - clears all inputs in panel after submiting
const clearInputs = () => {
	transactionTitle.value = '';
	transactionAmount.value = '';
	transactionCategory.value = '0';
	transactionTypeExpenses.checked = false;
	transactionTypeRevenues.checked = false;
};

//FUNCTION asigned to buttons inside html. Removes grandparent of that button. '.transactions_box_item' in that case
const deleteSinglePayment = (button) => {
	const parentElement = button.parentElement.parentElement;
	parentElement.remove();
};

//FUNCTION - finds all elements with class='.transactions_box_item' and deletes them all
const deleteAllPayements = () => {
	const allPayements = document.querySelectorAll('.transactions_box_item');
	allPayements.forEach((box) => {
		box.remove();
	});
};

const createPayement = () => {
	const payementBox = document.createElement('div');
	payementBox.classList.add('transactions_box_item');
	payementBox.innerHTML = `<div class="transactions_category">
    <i class="fa-solid fa-sack-dollar"></i>
    <p class="title">${transactionTitle.value}</p>
</div>
<div class="amount">
    <p class="amount">
        <span class="revenue_item-number">${transactionAmount.value}</span>zł
    </p>
    <button class="delete" onclick="deleteSinglePayment(this)">X</button>
</div>`;

    payementExpensesBox.append(payementBox)
};

//FUNCTION - showing or hiding transaction panel
const showPanel = () => panel.classList.toggle('hide');

//EVENT LISTENERS
btnShowPanel.addEventListener('click', showPanel);
btnClosePanel.addEventListener('click', showPanel);
btnSaveTransaction.addEventListener('click', checkInputs);
btnDeleteAllPayements.addEventListener('click', deleteAllPayements);
