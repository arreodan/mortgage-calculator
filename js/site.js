// clear the table before displaying new results
function clearTable() {
  const dataTable = document.getElementById("monthlyData");
  while (dataTable.firstChild) {
    dataTable.removeChild(dataTable.firstChild);
  }
}

// get the values for the loan out of the form
// validate inputs
function getValues() {
  let loanAmount = parseFloat(document.getElementById("loanAmount").value);
  let loanTerm = parseInt(document.getElementById("loanTerm").value);
  let interestRate = parseFloat(document.getElementById("interestRate").value);

  document.getElementById("monthlyPayment").innerText = "$0.00";

  if (
    !isNaN(loanAmount) &&
    !isNaN(loanTerm) &&
    !isNaN(interestRate) &&
    loanAmount > 0 &&
    loanTerm > 0 &&
    interestRate > 0
  ) {
    clearTable(); // clear the table before displaying new results
    let totals = calculateTotals(loanAmount, loanTerm, interestRate);
    let payments = calculatePayments(loanAmount, loanTerm, interestRate);

    calculatePayments(loanAmount, loanTerm, interestRate);
    displayTotals(totals);
    displayPayments(payments);
  } else {
    Swal.fire({
      icon: "error",
      backdrop: false,
      title: "Uh oh!",
      text: "Please enter valid numbers for your loan details.",
    });
  }
}

// calculate the loan payments

// calculate the totals
function calculateTotals(loanAmount, loanTerm, interestRate) {
  // get the monthly payment
  let monthlyPayment = calculateMonthlyPayment(
    loanAmount,
    loanTerm,
    interestRate
  );
  // total cost is monthly payment * loanTerm
  let totalCost = monthlyPayment * loanTerm;
  // total interest is cost - principal
  let totalInterest = totalCost - loanAmount;

  let totals = {
    monthlyPayment: monthlyPayment,
    loanAmount: loanAmount,
    interest: totalInterest,
    cost: totalCost,
  };

  return totals;
}
// calculate the amortization schedule
function calculatePayments(loanAmount, loanTerm, interestRate) {
  // get the monthly payment
  let monthlyPayment = calculateMonthlyPayment(
    loanAmount,
    loanTerm,
    interestRate
  );
  // calculate the remaining values
  let balance = loanAmount;
  let totalInterest = 0;

  let payments = [];

  for (let month = 1; month <= loanTerm; month++) {
    let interest = balance * (interestRate / 1200);
    let principalPayment = monthlyPayment - interest;
    totalInterest += interest;
    balance -= principalPayment;

    let loanPayment = {
      month: month,
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interest,
      totalInterest: totalInterest,
      balance: Math.abs(balance),
    };

    payments.push(loanPayment);
  }

  return payments;
}

function calculateMonthlyPayment(loanAmount, loanTerm, interestRate) {
  let monthlyPayment =
    (loanAmount * (interestRate / 1200)) /
    (1 - (1 + interestRate / 1200) ** -loanTerm);

  return monthlyPayment;
}

// disply calculations on the page

// display totals
function displayTotals(loanTotals) {
  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  document.getElementById("monthlyPayment").innerText = formatter.format(
    loanTotals.monthlyPayment
  );
  document.getElementById("totalPrincipal").innerText = formatter.format(
    loanTotals.loanAmount
  );
  document.getElementById("totalInterest").innerText = formatter.format(
    loanTotals.interest
  );
  document.getElementById("totalCost").innerText = formatter.format(
    loanTotals.cost
  );
}

// display table rows
function displayPayments(loanPayments) {
  const dataTable = document.getElementById("monthlyData");
  const template = document.getElementById("tableRowTemplate");

  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  for (let i = 0; i < loanPayments.length; i++) {
    let payment = loanPayments[i];

    let tableRow = document.importNode(template.content, true);
    let tds = tableRow.querySelectorAll("td");

    tds[0].textContent = payment.month;
    tds[1].textContent = formatter.format(payment.payment);
    tds[2].textContent = formatter.format(payment.principal);
    tds[3].textContent = formatter.format(payment.interest);
    tds[4].textContent = formatter.format(payment.totalInterest);
    tds[5].textContent = formatter.format(payment.balance);

    dataTable.appendChild(tableRow);
  }
}
