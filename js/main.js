// BUTTONS - Variables
const btnDeleteAllPayements = document.querySelector('.summary_buttons-clear');
const btnSaveTransaction = document.querySelector('.save-btn');
const btnClosePanel = document.querySelector('.cancel-btn');
const btnShowPanel = document.querySelector('.summary_buttons-add');

// CONTENT - Variables
const payementRevenuesBox = document.querySelector('.transactions_box_revenues');
const payementExpensesBox = document.querySelector('.transactions_box_expenses');
const panel = document.querySelector('.panel');
let summaryMoney = document.querySelector('.summary_money');

// INPUT   - Variables
const transactionTypeRevenues = document.querySelector('#revenues');
const transactionTypeExpenses = document.querySelector('#expenses');
const transactionAmount = document.querySelector('.transaction-amount-input');
const transactionTitle = document.querySelector('.transaction-title-input');
const transactionCategory = document.querySelector(
	'.transaction-category-input'
);

//TEMPORARY - variables
let categoryInput
let accountBalance = 0

// =================================================

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
		calculateAccountBalance();
	}
};

const checkCategory = () => {
	switch (transactionCategory.value) {
		case '1':
			categoryInput = '<i class="fa-solid fa-cart-shopping"></i>'
			console.log('1');
			break;
		case '2':
			categoryInput = '<i class="fa-solid fa-house"></i>'
			console.log('2');
			break;
		case '3':
			categoryInput = '<i class="fa-solid fa-car"></i>'
			console.log('3');
			break;
		case '4':
			categoryInput = '<i class="fa-solid fa-sack-dollar"></i>'
			console.log('4');
			break;
	}
}

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
	calculateAccountBalance();
};

//FUNCTION - finds all elements with class='.transactions_box_item' and deletes them all
const deleteAllPayements = () => {
	const allPayements = document.querySelectorAll('.transactions_box_item');
	allPayements.forEach((box) => {
		box.remove();
	});
	calculateAccountBalance();
};

const calculateAccountBalance = () => {
	accountBalance = 0
	const positive = document.querySelectorAll('.positive-transaction-amount')
	positive.forEach(item  => {
		accountBalance += parseFloat(item.textContent);
		console.log(accountBalance);
	}
	)

	const negative = document.querySelectorAll('.negative-transaction-amount')
	negative.forEach(item  => {
		accountBalance -= parseFloat(item.textContent);
		console.log(accountBalance);
	}
	)

	summaryMoney.textContent = accountBalance
}

const createPayement = () => {
	checkCategory();
	const payementBox = document.createElement('div');
	payementBox.classList.add('transactions_box_item');
	let transactionType
	if (transactionTypeExpenses.checked == true) {
		payementExpensesBox.append(payementBox)
		
		transactionType = 'negative-transaction-amount'
	} else {
		payementRevenuesBox.append(payementBox)
		transactionType = 'positive-transaction-amount'
	}

	payementBox.innerHTML = `
	<div class="transactions_category">
    ${categoryInput}
    <p class="title">${transactionTitle.value}</p>
	</div>
	<div class="amount">
    <p class="amount">
    <span class="item-number ${transactionType}">${transactionAmount.value}</span>zł
    </p>
    <button class="delete" onclick="deleteSinglePayment(this)">X</button>
	</div>
	`;
	
	
};





//FUNCTION - showing or hiding transaction panel
const showPanel = () => {
	panel.classList.toggle('hide')
	
};

calculateAccountBalance();

//EVENT LISTENERS
btnShowPanel.addEventListener('click', showPanel);
btnClosePanel.addEventListener('click', showPanel);
btnSaveTransaction.addEventListener('click', checkInputs);
btnDeleteAllPayements.addEventListener('click', deleteAllPayements);
