import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./BankDashboard.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function BankDashboard() {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(10);
  const [loanTerm, setLoanTerm] = useState(5);

  const totalLoanMonths = loanTerm * 12;
  const interestPerMonth = interestRate / 100 / 12;
  const monthlyPayment = (loanAmount * interestPerMonth * Math.pow(1 + interestPerMonth, totalLoanMonths)) /
    (Math.pow(1 + interestPerMonth, totalLoanMonths) - 1);
  const totalInterestGenerated = monthlyPayment * totalLoanMonths - loanAmount;

  const data = {
    labels: ["Principal", "Interest"],
    datasets: [
      {
        data: [loanAmount, totalInterestGenerated],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Bank Loan Dashboard</h2>
      <div className="input-container">
        <input
          type="number"
          value={loanAmount}
          onChange={(e) => setLoanAmount(Number(e.target.value))}
          placeholder="Loan Amount"
          className="input-field"
        />
        <input
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(Number(e.target.value))}
          placeholder="Interest Rate (%)"
          className="input-field"
        />
        <input
          type="number"
          value={loanTerm}
          onChange={(e) => setLoanTerm(Number(e.target.value))}
          placeholder="Loan Term (Years)"
          className="input-field"
        />
      </div>
      <div className="emi-info">Monthly EMI: ₹{monthlyPayment.toFixed(2)}</div>
      <div className="chart-container">
        <Pie data={data} />
      </div>
    </div>
  );
}
