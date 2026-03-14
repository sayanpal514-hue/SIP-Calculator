function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
    }).format(amount);
}

function updateDoughnutChart(chartElement, investedPercent) {
    const blueStop = investedPercent;

    chartElement.style.background = `conic-gradient(
        #007bff 0%, 
        #007bff ${blueStop}%, 
        #dc3545 ${blueStop}%, 
        #dc3545 100%
    )`;
}

function calculateInvestment(principal, rate, years, isSIP = false) {
    const monthlyRate = rate / 12 / 100;
    const totalMonths = years * 12;

    if (isSIP) {
        
        const fv = principal * (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate));
        const totalInvested = principal * totalMonths;
        return { totalValue: fv, totalInvested: totalInvested };
    } else {
        
        const fv = principal * Math.pow(1 + (rate / 100), years);
        return { totalValue: fv, totalInvested: principal };
    }
}

function calculateSIP() {
    const amount = parseFloat(document.getElementById('sipAmount').value);
    const years = parseFloat(document.getElementById('sipYears').value);
    const rate = parseFloat(document.getElementById('sipRate').value);

    if (isNaN(amount) || isNaN(years) || isNaN(rate) || amount <= 0 || years <= 0 || rate <= 0) {
        document.getElementById('sipResult').textContent = "Please enter valid amounts.";
        return;
    }

    const { totalValue, totalInvested } = calculateInvestment(amount, rate, years, true);
    const estimatedReturn = totalValue - totalInvested;
    const investedPercent = (totalInvested / totalValue) * 100;
    
    document.getElementById('sipResult').innerHTML = 
        `Invested Amount: **${formatCurrency(totalInvested)}**<br>
        Estimated Return: **${formatCurrency(estimatedReturn)}**<br>
        Total Value: **${formatCurrency(totalValue)}**`;
    

    const chart1 = document.querySelector('#revenueChart1 .chart');
    const centerText1 = document.querySelector('#revenueChart1 .center-text');
    const investedAmount1 = document.getElementById('investedAmount1');
    const estimatedReturn1 = document.getElementById('estimatedReturn1');

    updateDoughnutChart(chart1, investedPercent);
    centerText1.innerHTML = `${formatCurrency(totalValue)}<br>Total Value`;
    investedAmount1.textContent = formatCurrency(totalInvested);
    estimatedReturn1.textContent = formatCurrency(estimatedReturn);
}

function calculateLumpsum() {
    const amount = parseFloat(document.getElementById('lumpAmount').value);
    const years = parseFloat(document.getElementById('lumpYears').value);
    const rate = parseFloat(document.getElementById('lumpRate').value);

    if (isNaN(amount) || isNaN(years) || isNaN(rate) || amount <= 0 || years <= 0 || rate <= 0) {
        document.getElementById('lumpResult').textContent = "Please enter valid amounts.";
        return;
    }

    const { totalValue, totalInvested } = calculateInvestment(amount, rate, years, false);
    const estimatedReturn = totalValue - totalInvested;
    const investedPercent = (totalInvested / totalValue) * 100;

    document.getElementById('lumpResult').innerHTML = 
        `Invested Amount: **${formatCurrency(totalInvested)}**<br>
        Estimated Return: **${formatCurrency(estimatedReturn)}**<br>
        Total Value: **${formatCurrency(totalValue)}**`;


    const chart2 = document.querySelector('#revenueChart2 .chart');
    const centerText2 = document.querySelector('#revenueChart2 .center-text');
    const investedAmount2 = document.getElementById('investedAmount2');
    const estimatedReturn2 = document.getElementById('estimatedReturn2');

    updateDoughnutChart(chart2, investedPercent);
    centerText2.innerHTML = `${formatCurrency(totalValue)}<br>Total Value`;
    investedAmount2.textContent = formatCurrency(totalInvested);
    estimatedReturn2.textContent = formatCurrency(estimatedReturn);
}


document.addEventListener('DOMContentLoaded', () => {
    const chart1 = document.querySelector('#revenueChart1 .chart');
    const chart2 = document.querySelector('#revenueChart2 .chart');
    
    if (chart1) {
        const investedP1 = parseFloat(chart1.getAttribute('data-invested-percent'));
        updateDoughnutChart(chart1, investedP1);
    }
    if (chart2) {
        const investedP2 = parseFloat(chart2.getAttribute('data-invested-percent'));
        updateDoughnutChart(chart2, investedP2);
    }
});