// Interfaces
interface Annuity {
    principal: number;
    annualInterest: number;
    numberOfPayments: number;
  }
  
  interface LoanValues {
    amountLeft: number;
    interestPaid: number;
    monthlyPayment: number;
  }
  
  // Loan Calculator class
  class LoanCalculator {
    private principalInput: HTMLInputElement;
    private interestInput: HTMLInputElement;
    private timeInput: HTMLInputElement;
    private submitBtn: HTMLButtonElement;
    private outputContainer: HTMLDivElement;
  
    constructor() {
      this.principalInput = document.getElementById("loan") as HTMLInputElement;
      this.interestInput = document.getElementById("interest") as HTMLInputElement;
      this.timeInput = document.getElementById("time") as HTMLInputElement;
      this.submitBtn = document.getElementById("submit-btn") as HTMLButtonElement;
      this.outputContainer = document.getElementById("output-container") as HTMLDivElement;
  
      this.setupEventListeners();
    }
  
    private setupEventListeners() {
      this.principalInput.addEventListener('input', this.handleInput.bind(this));
      this.interestInput.addEventListener('input', this.handleInput.bind(this));
      this.timeInput.addEventListener('input', this.handleInput.bind(this));
      this.submitBtn.addEventListener('click', this.handleSubmit.bind(this));
    }
  
    private clearErrorMessage() {
      const errorMessage = this.outputContainer.querySelector('p');
      if (errorMessage) {
        this.outputContainer.removeChild(errorMessage);
      }
    }
  
    private handleInput() {
      this.clearErrorMessage();
    }
  
    private getValues(): Annuity {
      // Store values from input
      const principal = parseFloat(this.principalInput.value);
      const annualInterest = parseFloat(this.interestInput.value);
      const timeYears = parseFloat(this.timeInput.value);
      const numberOfPayments = timeYears * 12;
  
      // Guard for unrealistic inputs
      if (principal > 10000000 || annualInterest > 30 || timeYears > 50) {
        const errorMessage = document.createElement('p');
        this.outputContainer.innerText = 'Please enter realistic values';
        throw new Error('Invalid inputs');
      } else {
        return { principal, annualInterest, numberOfPayments };
      }
    }
  
    private annuityFormula(values: Annuity): number {
      const monthlyInterest = values.annualInterest / 12 / 100;
      const discountFactor =
        ((1 + monthlyInterest) ** values.numberOfPayments - 1) /
        (monthlyInterest * (1 + monthlyInterest) ** values.numberOfPayments);
  
      const monthlyPayment = values.principal / discountFactor;
      return monthlyPayment;
    }
  
    private calculateLoanValues(value: Annuity): LoanValues[] {
      const loanValues: LoanValues[] = [];
      const monthlyInterestRate = value.annualInterest / 12 / 100;
      const totalMonths = value.numberOfPayments;
      let amountLeft = value.principal;
  
      for (let month = 1; month <= totalMonths; month++) {
        const interestPayment = amountLeft * monthlyInterestRate;
        const monthlyPayment = this.annuityFormula({
          principal: value.principal,
          annualInterest: value.annualInterest,
          numberOfPayments: totalMonths,
        });
  
        const principalPayment = monthlyPayment - interestPayment;
        amountLeft -= principalPayment;
  
        loanValues.push({
          amountLeft: amountLeft >= 0 ? amountLeft : 0,
          interestPaid: interestPayment,
          monthlyPayment: monthlyPayment,
        });
      }
  
      return loanValues;
    }
  
    private displayValues(values: LoanValues[]) {
      this.outputContainer.innerHTML = '';
  
      values.forEach((value, index) => {
        const outputRow = document.createElement('div');
        outputRow.classList.add('output-row');
  
        const monthDiv = document.createElement('div');
        monthDiv.textContent = `Månad ${index + 1}`;
        outputRow.appendChild(monthDiv);
  
        const monthlyPaymentDiv = document.createElement('div');
        monthlyPaymentDiv.textContent = `Månadskostnad: ${value.monthlyPayment.toFixed(0)}`;
        outputRow.appendChild(monthlyPaymentDiv);
  
        const interestPaidDiv = document.createElement('div');
        interestPaidDiv.textContent = `Varav ränta: ${value.interestPaid.toFixed(0)}`;
        outputRow.appendChild(interestPaidDiv);
  
        const amountLeftDiv = document.createElement('div');
        amountLeftDiv.textContent = `Återstående belopp: ${value.amountLeft.toFixed(0)}`;
        outputRow.appendChild(amountLeftDiv);
  
        this.outputContainer.appendChild(outputRow);
      });
    }
  
    private handleSubmit() {
      const values = this.getValues();
      const loanValues = this.calculateLoanValues(values);
      this.displayValues(loanValues);
    }
  }
  
  // Create an instance of LoanCalculator
  const loanCalculator = new LoanCalculator();
  