"use strict";
// Get HTML elements
const principal = document.getElementById('loan');
const interest = document.getElementById('interest');
const time = document.getElementById('time');
const submitBtn = document.getElementById('submit-btn');
// Annuity fomula 
function annunityFormula(principal, annualInterest, numberOfPayments) {
    // Divided by months in a year and 100 to make it decimal 
    const monthlyInterest = annualInterest / 12 / 100;
    // Part of the given formula that calculate present value of future payments 
    const discountFactor = ((1 + monthlyInterest) ** numberOfPayments - 1) /
        (monthlyInterest * (1 + monthlyInterest) ** numberOfPayments);
    const monthlyPayment = principal / discountFactor;
    return monthlyPayment;
}
// Get value of loan amount (principal) 
principal.addEventListener('input', (e) => {
    const principalValue = parseFloat(principal.value);
    console.log(principalValue);
});
// Get value of interest rate (in percentage)
interest.addEventListener('input', (e) => {
    const interestValue = parseFloat(interest.value);
});
// Get value of loan period (in years)
time.addEventListener('input', (e) => {
    const timeValue = parseFloat(time.value);
});
