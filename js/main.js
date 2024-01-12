"use strict";
// Loan Calculator class
class LoanCalculator {
    // Get the elements and set up event listeners
    constructor() {
        this.principalInput = document.getElementById("loan");
        this.interestInput = document.getElementById("interest");
        this.timeInput = document.getElementById("time");
        this.submitBtn = document.getElementById("submit-btn");
        this.outputContainer = document.getElementById("output-container");
        this.setupEventListeners();
    }
    // Listen for input and call handleInput method
    setupEventListeners() {
        this.principalInput.addEventListener("input", this.handleInput.bind(this));
        this.interestInput.addEventListener("input", this.handleInput.bind(this));
        this.timeInput.addEventListener("input", this.handleInput.bind(this));
        this.submitBtn.addEventListener("click", this.handleSubmit.bind(this));
    }
    // Remove error message from output container
    clearErrorMessage() {
        const errorMessage = this.outputContainer.querySelector("p");
        if (errorMessage) {
            this.outputContainer.removeChild(errorMessage);
        }
    }
    // Clear error when new input
    handleInput() {
        this.clearErrorMessage();
    }
    // Get values from user input and check against conditon for unrealistic values
    getValues() {
        // Store values from input
        const principal = parseFloat(this.principalInput.value);
        const annualInterest = parseFloat(this.interestInput.value);
        const timeYears = parseFloat(this.timeInput.value);
        const numberOfPayments = timeYears * 12;
        // Guard for unrealistic inputs
        if (annualInterest > 30 || timeYears > 100) {
            this.outputContainer.innerText = "Sluta dröm! Välj något rimligt!";
            // Clear input boxes
            this.principalInput.value = "";
            this.interestInput.value = "";
            this.timeInput.value = "";
            throw new Error("Invalid inputs");
        }
        else {
            return { principal, annualInterest, numberOfPayments };
        }
    }
    // Calculate monthly payment with Annuity formula
    annuityFormula(values) {
        const monthlyInterest = values.annualInterest / 12 / 100;
        const discountFactor = ((1 + monthlyInterest) ** values.numberOfPayments - 1) /
            (monthlyInterest * (1 + monthlyInterest) ** values.numberOfPayments);
        const monthlyPayment = values.principal / discountFactor;
        return monthlyPayment;
    }
    // Calculate loan values for every month and store in an array
    calculateLoanValues(value) {
        const loanValues = [];
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
    // Display result values from loan values in HTML output container
    displayValues(values, inputValues) {
        this.outputContainer.innerHTML = "";
        let totalInterest = 0;
        values.forEach((value, index) => {
            const outputRow = document.createElement("div");
            outputRow.classList.add("output-row", "hidden");
            const monthDiv = document.createElement("div");
            monthDiv.textContent = `Månad ${index + 1}`;
            outputRow.appendChild(monthDiv);
            const monthlyPaymentDiv = document.createElement("div");
            monthlyPaymentDiv.textContent = `Månadskostnad: ${value.monthlyPayment.toFixed(0)}`;
            outputRow.appendChild(monthlyPaymentDiv);
            const interestPaidDiv = document.createElement("div");
            interestPaidDiv.textContent = `Varav ränta: ${value.interestPaid.toFixed(0)}`;
            outputRow.appendChild(interestPaidDiv);
            const amountLeftDiv = document.createElement("div");
            amountLeftDiv.textContent = `Återstående belopp: ${value.amountLeft.toFixed(0)}`;
            outputRow.appendChild(amountLeftDiv);
            this.outputContainer.appendChild(outputRow);
            // Add each interest to total interest
            totalInterest += value.interestPaid;
        });
        // Display the overview values separately
        const overviewContainer = document.createElement("div");
        overviewContainer.classList.add("overview-container");
        // Show the input values in overview
        const principalInputDiv = document.createElement("div");
        principalInputDiv.textContent = `Lånebelopp: ${inputValues.principal} SEK`;
        overviewContainer.appendChild(principalInputDiv);
        const interestInputDiv = document.createElement("div");
        interestInputDiv.textContent = `Årsränta: ${inputValues.interest}%`;
        overviewContainer.appendChild(interestInputDiv);
        const timeInputDiv = document.createElement("div");
        timeInputDiv.textContent = `Avbetalningstid: ${inputValues.time} år`;
        overviewContainer.appendChild(timeInputDiv);
        // Monthly payment
        const overviewMonthlyPaymentDiv = document.createElement("div");
        overviewMonthlyPaymentDiv.classList.add("total-row");
        overviewMonthlyPaymentDiv.textContent =
            overviewMonthlyPaymentDiv.textContent = `Månadskostnad: ${values[values.length - 1].monthlyPayment.toFixed(0)}`;
        overviewContainer.appendChild(overviewMonthlyPaymentDiv);
        // Total interest
        const totalInterestDiv = document.createElement("div");
        totalInterestDiv.classList.add("total-row");
        totalInterestDiv.textContent = `Total ränta: ${totalInterest.toFixed(0)} SEK`;
        overviewContainer.appendChild(totalInterestDiv);
        // Append the overviewContainer to the main outputContainer
        this.outputContainer.appendChild(overviewContainer);
        // Create button to show monthly values
        const hideShowBtn = document.createElement("button");
        hideShowBtn.classList.add("hide-show-btn");
        hideShowBtn.innerText = "Visa månadsuppställning";
        // Insert the hideShowBtn before the first child of outputContainer
        this.outputContainer.insertBefore(hideShowBtn, this.outputContainer.firstChild);
        // Listen for clicks to show or hide monthly calculations
        hideShowBtn.addEventListener("click", () => {
            this.toggleHideShow();
        });
    }
    // Get values when submit button is clicked
    handleSubmit() {
        const inputValues = {
            principal: this.principalInput.value,
            interest: this.interestInput.value,
            time: this.timeInput.value,
        };
        const values = this.getValues();
        const loanValues = this.calculateLoanValues(values);
        // Clear old input and output
        this.outputContainer.innerHTML = "";
        this.principalInput.value = "";
        this.interestInput.value = "";
        this.timeInput.value = "";
        this.displayValues(loanValues, inputValues);
    }
    toggleHideShow() {
        const outputRows = document.querySelectorAll(".output-row");
        // Interate through all rows
        outputRows.forEach((row) => {
            row.classList.toggle("hidden");
        });
    }
}
// Create an instance of LoanCalculator
const loanCalculator = new LoanCalculator();
