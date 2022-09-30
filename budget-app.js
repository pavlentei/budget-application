let incomeArr = [];
let expensesArr = [];
let type = "inc"; //type can be inc or exp
let dataIncome, dataExpenses; //data from local storage

let date = document.querySelector('.date');
let displayIncome = document.querySelector('.tot-income');
let displayExpenses = document.querySelector('.tot-expenses');
let displayBudget = document.querySelector('.current-budget');
let submitBtn = document.querySelector("input[type='submit']");
let clearBtn = document.querySelector(".clearBtn");
let descInput = document.querySelector('#form__desc');
let valInput = document.querySelector('#form__val');
let incomeTable = document.querySelector('.income-table');
let expensesTable = document.querySelector('.expenses-table');
let tablesSection = document.querySelector('.tables-section');


function getDate() {
	let date = new Date();
	let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	return (months[date.getMonth()] + " " + date.getFullYear());

}


function calcBudget() {
	return calcTotalIncome() - calcTotalExpenses();
}

function calcTotalIncome() {
	let totalIncome = 0;
	for (let i = 0; i < incomeArr.length; i++) {
		totalIncome += incomeArr[i].val;
	}
	return totalIncome;
}


function calcTotalExpenses() {
	let totalExpenses = 0;
	for (let i = 0; i < expensesArr.length; i++) {
		totalExpenses += expensesArr[i].val;
	}
	return totalExpenses;
}


function init() {
	//display current date
	date.textContent = getDate();

	//check if there are any incomes in local storage
	if (localStorage.getItem('income')) {
		dataIncome = JSON.parse(localStorage.getItem('income'));
		console.log("dataIncome :");
		console.dir(dataIncome);
		dataIncome.forEach(function(item) {
			incomeArr.push(item);
		});
	} 

	//check if there are any expenses in local storage
	if (localStorage.getItem('expenses')) {
		dataExpenses = JSON.parse(localStorage.getItem('expenses'));
		console.log('dataExpenses:');
		console.dir(dataExpenses);	
		dataExpenses.forEach(function(item) {
			expensesArr.push(item);
		});
	};

	//calculate and show totalIncome, totalExpenses and totalBudget
	displayIncome.textContent = calcTotalIncome();
	displayExpenses.textContent = calcTotalExpenses();
	displayBudget.textContent = calcBudget();

	//display tables of income and expenses
	showListElements("inc", incomeArr);
	showListElements("exp", expensesArr);
}


function resetForm() {
	descInput.value = "";
	valInput.value = "";
}


function showListElements(type, arr) {
	let code, tr;
	arr.forEach(function(item) {
		tr = document.createElement('tr');
		code = "<td>" + item.desc + "</td><td>" + item.val + "</td><td><button class='delBtn'>delete</button></td>";
		tr.innerHTML += code;
		if (type === "inc") {
			incomeTable.append(tr);
		} else if (type === "exp") {
			expensesTable.append(tr);
		}
	});	
}


function createTableRow(type, desc, val) {
	let tr = document.createElement('tr');
	let code = "<td>" + desc + "</td><td>" + val + "</td><td><button class='delBtn'>delete</button></td>";
	tr.innerHTML = code;
	if (type === "inc") {
		incomeTable.append(tr); 
	} else {
		expensesTable.append(tr);
	}
}

init();


//submit event listener
submitBtn.addEventListener('click', function(e) {
	e.preventDefault();
	//add form validation!!!!!!!!!!!!!!!!!!!!!



	//get description
	let desc = descInput.value;
	//get value
	let val = Number(valInput.value);
	//check type
	type = form.type.value; 

	//act depending of type
	if (type === 'inc') {
		incomeArr.push({desc: desc, val: val});
		//show total income
		displayIncome.textContent = calcTotalIncome();
		//show current budget
		displayBudget.textContent = calcBudget();
		//display new income
		createTableRow(type, desc, val);
		//update local storage with new income
		localStorage.setItem('income', JSON.stringify(incomeArr));
		dataIncome = JSON.parse(localStorage.getItem('income'));
		console.log("dataincome: ");
		console.dir(dataIncome);
	} else {
		expensesArr.push({desc: desc, val: val});
		//show total expenses
		displayExpenses.textContent = calcTotalExpenses();
		//show current budget
		displayBudget.textContent = calcBudget();
		//display new expense
		createTableRow(type, desc, val);
		//update local storage with new expense
		localStorage.setItem('expenses', JSON.stringify(expensesArr));
		dataExpenses = JSON.parse(localStorage.getItem('expenses'));
		console.log("dataExpenses: ");
		console.dir(dataExpenses);
	}
	
	resetForm();
});


//clear all button event listener
clearBtn.addEventListener('click', function(){
	localStorage.clear();
	incomeArr = [];
	expensesArr = [];

	//calculate and show totalIncome, totalExpenses and totalBudget
	displayIncome.textContent = calcTotalIncome();
	displayExpenses.textContent = calcTotalExpenses();
	displayBudget.textContent = calcBudget();

	//delete data rows from income and expenses tables
	let incomeTableRows = incomeTable.querySelectorAll("tr");
	for (let i = 1; i < incomeTableRows.length; i++) {
		incomeTable.removeChild(incomeTableRows[i]);
	}
	let expensesTableRows = expensesTable.querySelectorAll("tr");
	for (let i = 1; i < expensesTableRows.length; i++) {
		expensesTable.removeChild(expensesTableRows[i]);
	}
});


//event delegation for delete buttons
tablesSection.addEventListener('click', function(e) {
	console.log(e);
	if (e.target.className === "delBtn") {
		//delete item from array
		let btn = e.target;
		let valToDel = btn.parentElement.previousElementSibling;
		let descToDel = valToDel.previousElementSibling;
		let td = btn.parentElement;
		let tr = td.parentElement;
		let table = tr.parentElement;

		//search array for item do delete
		if (table.className === "income-table") {
			for (let i = 0; i < incomeArr.length; i++) {
				if (incomeArr[i].desc === descToDel.textContent && incomeArr[i].val === Number(valToDel.textContent)) {
					//delete item from array
					incomeArr.splice(i, 1);
					break;
				}
			}
			//update local storage based on modified array
			localStorage.setItem('income', JSON.stringify(incomeArr));
			
		} else if (table.className === "expenses-table") {
			for (let i = 0; i < expensesArr.length; i++) {
				if (expensesArr[i].desc === descToDel.textContent && expensesArr[i].val === Number(valToDel.textContent)) {
					//delete item from array
					expensesArr.splice(i, 1);
					break;
				}
			}
			//update local storage based on modified array
			localStorage.setItem('expenses', JSON.stringify(expensesArr));
		}

		//delete row from the table
		table.removeChild(tr);		
	}
});