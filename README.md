# Annuity Loan Calculator 
A simple browser based annity load calulator created for Chas Academy's Fullstack JavaScript course. The project is written in TypeScript. HTML and CSS is used for the structure and styling of the user interface. 

## Structure
*** Note! Old TS and JS script files before refactoring are kept for personal documentation ***

### Interfaces 
1. Annuity: Represents the parameters needed for an annuity calculation, including principal amount, annual interest rate, and the number of payments.
2. LoanValues: Represents the calculated values for each month of the loan, including the remaining amount, interest paid, and monthly payment.
3. InputValues: Represents the user input values for principal, interest rate, and loan term.

### Loan Calculator Class
The main functionality of the project is implemented through the LoanCalculator class. Here are its main features:

- #### Input Elements: 
The class holds private properties representing HTML input and output elements such as principal input, interest input, time input, submit button, and an output container.
- #### Event Listeners: 
Event listeners are set up to detect changes in the input fields and to handle the submit button click.
- #### Input Validation: 
The getValues method retrieves user input, checks against unrealistic values, and displays an error message if necessary.
- #### Loan Calculation: 
The annuityFormula method calculates the monthly payment using the annuity formula, and the calculateLoanValues method computes loan values for each month based on user input.
- #### Display Results: 
The displayValues method presents the calculated loan values in an HTML output container, including a summary and a button to toggle the display of monthly details.
- #### Toggle Monthly Details: 
The toggleHideShow method allows users to hide or show monthly calculation details.

## Useage Instructions
1. 
- Open the HTML file in perfered web browser.
- Alternatively, view the project through GitHub Pages:
https://jumistrandberg.github.io/mortgage-calculator/

or Netlify: 
https://jumis-cool-annuity-calculator.netlify.app/

2. Input the loan details (principal amount, annual interest rate, and loan term).
3. Click the "Submit" button to see the monthly breakdown of the loan.
4. Optionally, click the "Show Monthly Details" button to toggle the display of monthly calculations.

###### Thank you for cheking out my project, much love 
##### Jumi S. 