// Get HTML elements
const principalInput = document.getElementById('loan') as HTMLInputElement;
const interestInput = document.getElementById('interest') as HTMLInputElement;
const timeInput = document.getElementById('time') as HTMLInputElement;
const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement;


// Annuity interface 
interface Annuity {
    principal: number;
    annualInterest: number;
    numberOfPayments: number;
}

// Get input values for the calculation 
function getValues(): Annuity {
    const principal = parseFloat(principalInput.value); 
    const annualInterest = parseFloat(interestInput.value); 
    const timeYears = parseFloat(timeInput.value);
    const numberOfPayments = timeYears * 12; 

    return { principal, annualInterest, numberOfPayments}; 
}




// Listen for the input the get the values  
principalInput.addEventListener('input', (e) => {
    const values = getValues()
})

interestInput.addEventListener('input', (e) => {
    const values = getValues()
})

timeInput.addEventListener('input', (e) => {
    const values = getValues()
})

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

// Listen for click on calculate button
submitBtn.addEventListener('click', (e) => {
    const values = getValues(); 
    console.log('monthly payment:', Math.round(annuityFormula(values)));

})


// Interface for the values we want to calculate and display 
interface loanValues {
    amountLeft: number;
    interestPaid: number; 
    monthlyPayment: number; 
}

function calculateLoanValues(value: Annuity) { 
    
}