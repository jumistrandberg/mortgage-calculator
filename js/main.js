"use strict";
// Get HTML elements
const principalInput = document.getElementById('loan');
const interestInput = document.getElementById('interest');
const timeInput = document.getElementById('time');
const submitBtn = document.getElementById('submit-btn');
// Get output container
let outputContainer = document.getElementById('output-container');
function clearErrorMessage() {
    const errorMessage = outputContainer.querySelector('p');
    if (errorMessage) {
        outputContainer.removeChild(errorMessage);
    }
}
// Indicate to stop and give error if values are out of bound
let unrealisticNumber = false;
// Get input values for the calculation
function getValues() {
    clearErrorMessage();
    // Store values from input
    const principal = parseFloat(principalInput.value);
    const annualInterest = parseFloat(interestInput.value);
    const timeYears = parseFloat(timeInput.value);
    const numberOfPayments = timeYears * 12;
    // Guard for unrealistic inputs
    if (principal > 10000000 || annualInterest > 30 || timeYears > 50) {
        const errorMessage = document.createElement('p');
        outputContainer.innerText = 'Please enter realistic values';
        unrealisticNumber = true;
        throw new Error('invalid inputs');
    }
    else {
        unrealisticNumber = false;
        return { principal, annualInterest, numberOfPayments };
    }
}
// Listen for the input the get the values
principalInput.addEventListener('input', (e) => {
    const values = getValues();
});
interestInput.addEventListener('input', (e) => {
    const values = getValues();
});
timeInput.addEventListener('input', (e) => {
    const values = getValues();
});
// Annuity formula
function annuityFormula(values) {
    // Divided by months in a year and 100 to make it decimal
    const monthlyInterest = values.annualInterest / 12 / 100;
    // Part of the given formula that calculate present value of future payments
    const discountFactor = ((1 + monthlyInterest) ** values.numberOfPayments - 1) /
        (monthlyInterest * (1 + monthlyInterest) ** values.numberOfPayments);
    const monthlyPayment = values.principal / discountFactor;
    return monthlyPayment;
}
function calculateLoanValues(value) {
    // Create an array with the loan values
    const loanValues = [];
    // Get the monthly interest rate from the annual interest
    const monthlyInterestRate = value.annualInterest / 12 / 100;
    // Get the total no. of months of paying
    const totalMonths = value.numberOfPayments;
    // Store each new loan balance in a let
    let amountLeft = value.principal;
    // Iterate through the no. of months until payment balance is 0
    for (let month = 1; month <= totalMonths; month++) {
        const interestPayment = amountLeft * monthlyInterestRate;
        const monthlyPayment = annuityFormula({
            principal: value.principal,
            annualInterest: value.annualInterest,
            numberOfPayments: totalMonths,
        });
        // Subtract the interest amount to get the amount payed toward principal
        const principalPayment = monthlyPayment - interestPayment;
        // Update loan balance
        amountLeft -= principalPayment;
        // Push to array
        loanValues.push({
            amountLeft: amountLeft >= 0 ? amountLeft : 0,
            interestPaid: interestPayment,
            monthlyPayment: monthlyPayment,
        });
    }
    return loanValues;
}
// Display array of values on site
function displayValues(values) {
    // Clear old every time
    outputContainer.innerHTML = '';
    // Index the months to know which it is
    values.forEach((value, index) => {
        // Make a row for the values
        const outputRow = document.createElement('div');
        outputRow.classList.add('output-row');
        // Show which month on each row
        const monthDiv = document.createElement('div');
        monthDiv.textContent = `Month ${index + 1}`;
        outputRow.appendChild(monthDiv);
        // Create divs for the values and put them in the row
        const monthlyPaymentDiv = document.createElement('div');
        monthlyPaymentDiv.textContent = `Monthly Payment: ${value.monthlyPayment.toFixed(0)}`;
        outputRow.appendChild(monthlyPaymentDiv);
        const interestPaidDiv = document.createElement('div');
        interestPaidDiv.textContent = `Interest Paid: ${value.interestPaid.toFixed(0)}`;
        outputRow.appendChild(interestPaidDiv);
        const amountLeftDiv = document.createElement('div');
        amountLeftDiv.textContent = `Amount Left: ${value.amountLeft.toFixed(0)}`;
        outputRow.appendChild(amountLeftDiv);
        // Append rows to the container
        outputContainer.appendChild(outputRow);
    });
}
// Show on click
submitBtn.addEventListener('click', (e) => {
    const values = getValues();
    const loanValues = calculateLoanValues(values);
    displayValues(loanValues);
});
