// Annuity fomula 

function annunityFormula(principal: number, annualInterest:number, numberOfPayments:number): number {
    // Divided by months in a year and 100 to make it decimal 
    const monthlyInterest = annualInterest / 12 / 100; 
    // Part of the given formula that calculate present value of future payments 
    const discountFactor = ((1 + monthlyInterest) ** numberOfPayments -1) / 
    (monthlyInterest * (1 + monthlyInterest) ** numberOfPayments); 

    const monthlyPayment = principal / discountFactor; 
    return monthlyPayment; 
}

// Get value of loan amount (principal) 
// Get value of interest rate (in percentage)
// Get value of loan period (in years)