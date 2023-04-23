function getInput(){
    let loanAmount = parseFloat(document.getElementById("loanAmount").value);
    let loanTerm = parseInt(document.getElementById("loanTerm").value);
    let interestRate = parseFloat(document.getElementById('interestRate').value);
    let previousBalance = loanAmount;

    calculateData(loanAmount, loanTerm, interestRate, previousBalance);

    document.getElementById('monthlyPayment').innerText = ''

    let monthlyPayment = loanAmount * (interestRate / 1200) / (1 - (1 + interestRate / 1200) ** -loanTerm);
    
    monthlyPayment = parseFloat(monthlyPayment).toFixed(2)

    document.getElementById('monthlyPayment').innerText = "$" + monthlyPayment;
    document.getElementById("totalPrincipal").innerText = "$" + loanAmount; 

    displayData(loanAmount, loanTerm, interestRate, previousBalance);
}

function calculateData(loanAmount, loanTerm, interestRate, previousInterest, previousBalance){

    let monthlyPayment = loanAmount * (interestRate/1200) / (1-(1 + interestRate / 1200)**-loanTerm)

    
    let interestPayment = loanAmount * interestRate/1200;
    let totalInterest = interestPayment + previousInterest;
    let principalPayment = monthlyPayment - interestPayment;
    let balance = previousBalance - principalPayment;

    // create formulas to get total interest and previous balance

    let monthlyData = {
      month: loanTerm,
      payment: monthlyPayment.toFixed(2),
      principal: principalPayment.toFixed(2),
      interest: interestPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      balance: balance.toFixed(2),
    };

    return monthlyData;
}






function displayData(loanAmount, loanTerm, interestRate, previousBalance){
    const dataTable = document.getElementById('monthlyData');
    const template = document.getElementById('tableRowTemplate');
    let previousInterest = 0;
    let remainingTerm = loanTerm;

    // use for loop to go through each object in the array from calculateData() 
    for(i = 0; i < loanTerm; i++){
        let monthlyData = calculateData(loanAmount, loanTerm, interestRate, previousInterest, previousBalance);
        let tableRow = document.importNode(template.content, true)

        tableRow.querySelector('[data-id="month"]').textContent = i + 1;
        tableRow.querySelector('[data-id="payment"]').textContent = monthlyData.payment;
        tableRow.querySelector('[data-id="principal"]').textContent = monthlyData.principal;
        tableRow.querySelector('[data-id="interest"]').textContent = monthlyData.interest;
        tableRow.querySelector('[data-id="totalInterest"]').textContent = monthlyData.totalInterest;
        tableRow.querySelector('[data-id="balance"]').textContent = monthlyData.balance;


        dataTable.appendChild(tableRow);

        previousInterest = monthlyData.totalInterest;
        previousBalance = monthlyData.balance;
        remainingTerm = remainingTerm - 1;
    }
}