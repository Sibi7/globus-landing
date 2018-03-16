$(".slider_time")
    .slider({
    	max: 25,
        min: 1,
        range: "min",
        step: 0.5
    })
    .slider('pips', {
    	rest: "label",
    	step: 2.5
    })
    .slider('float', {
    	rest: "label"
    });

$(".slider_rate")
    .slider({
    	max: 25,
        min: 1,
        range: "min",
        step: 0.1
    })
    .slider('pips', {
    	rest: "label",
    	step: 15
    })
    .slider('float', {
    	rest: "label"
    });

// current year
var currentYear = parseInt(document.querySelector('.slider_time .ui-slider-tip').innerHTML, 10);

// current rate
var currentRate = parseInt(document.querySelector('.slider_rate .ui-slider-tip').innerHTML, 10);

var realtyCost = document.getElementById('cost');
var firstPayment = document.getElementById('first-payment');
var amountOfCredit = document.querySelector('.calc__final-credit');
var monthPayment = document.querySelector('.calc__month-payment');

var realtyCostNumber = 0, firstPaymentNumber = 0;

realtyCost.oninput = function () {
	if (realtyCostNumber >= 0) {
		realtyCostNumber = parseInt(realtyCost.value, 10);
        console.log(realtyCost.value)
	}
	else {
		realtyCostNumber = 0;
	}
	return realtyCostNumber;
}

firstPayment.oninput = function () {
	if (firstPaymentNumber >= 0) {
		firstPaymentNumber = parseInt(firstPayment.value, 10)
	}
	else {
		firstPaymentNumber = 0;
	}
	return firstPaymentNumber;
}

function calcCredit() {
	amountOfCredit.innerHTML = (realtyCostNumber - firstPaymentNumber);
}

function calcMonthPayment() {
    var first = (realtyCostNumber - firstPaymentNumber) / (currentYear * 12);
    var second = (realtyCostNumber - firstPaymentNumber) * (currentRate * 0.001)

    monthPayment.innerHTML = (Math.round((first + second) * 100) / 100);
}


$(document).on('click', '.calc__btn', function() {
	calcCredit();
    calcMonthPayment();
})