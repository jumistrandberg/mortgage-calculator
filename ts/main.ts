// Get HTML elements
const principalInput = document.getElementById('loan') as HTMLInputElement;
const interestInput = document.getElementById('interest') as HTMLInputElement;
const timeInput = document.getElementById('time') as HTMLInputElement;
const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement;

// Annuity interface 
interface Annuity {
    principal: number,
    annualInterest: number, 
    numberOfPayments: number
}

// Annuity formula 
function annuityFormula(values:Annuity): number {
    // Divided by months in a year and 100 to make it decimal 
    const monthlyInterest = values.annualInterest / 12 / 100; 
    // Part of the given formula that calculate present value of future payments 
    const discountFactor = ((1 + monthlyInterest) ** values.numberOfPayments -1) / 
    (monthlyInterest * (1 + monthlyInterest) ** values.numberOfPayments); 

    const monthlyPayment = values.principal / discountFactor; 
    return monthlyPayment; 
}

