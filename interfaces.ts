// Annuity interface
export interface Annuity {
  principal: number;
  annualInterest: number;
  numberOfPayments: number;
}
// Input parameters interface
export interface InputParams {
  principal?: number;
  annualInterest?: number;
  timeYears?: number;
  numberOfPayments?: number;
}
