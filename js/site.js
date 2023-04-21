function getInput(){
    let loanAmount = parseFloat(document.getElementById("loanAmount").value);
    let loanTerm = parseInt(document.getElementById("loanTerm").value);
    let interestRate = parseFloat(document.getElementById('interestRate').value);

    calculateData(loanAmount, loanTerm, interestRate);

    document.getElementById('monthlyPayment').innerText = ''

    let monthlyPayment = loanAmount * (interestRate / 1200) / (1 - (1 + interestRate / 1200) ** -loanTerm);
    
    monthlyPayment = parseFloat(monthlyPayment).toFixed(2)

    document.getElementById('monthlyPayment').innerText = "$" + monthlyPayment;
    document.getElementById("totalPrincipal").innerText = "$" + loanAmount;

}

function calculateData(loanAmount, loanTerm, interestRate){

    let monthlyPayment = loanAmount * (interestRate/1200) / (1-(1 + interestRate / 1200)**-loanTerm)

    
    let interestPayment = loanAmount * interestRate/1200;
    // let totalInterest = interestPayment + previousInterest 
    let principalPayment = monthlyPayment - interestPayment;
    let balance = loanAmount - principalPayment;

    // create formulas to get total interest and previous balance

    let monthlyData = {
        // month: month, 
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        // totalInterest: totalInterest,
        balance: balance,
    }

    // create an array to store object 
    let monthlyTermData = []

    // store all objects 
    monthlyTermData.push(monthlyData)
}






function displayData() {
    const dataTable = document.getElementById('monthlyData');
    const template = document.getElementById('tableRowTemplate');

    // use for loop to go through each object in the array from calculateData() 
    for(i = 0; i < loanTerm; i++){
        let month = i

        let tableRow = document.importNode(template.content, true)

        tableRow.querySelector('[data-id="month"]').textContent = month;
        tableRow.querySelector('[data-id="payment"]').textContent = payment;
        tableRow.querySelector('[data-id="principal"]').textContent = principal;
        tableRow.querySelector('[data-id="interest"]').textContent = interest;
        tableRow.querySelector('[data-id="totalInterest"]').textContent = totalInterest;
        tableRow.querySelector('[data-id="balance"]').textContent = balance;


        dataTable.appendChild(tableRow);

        calculateData(month)
    }
}