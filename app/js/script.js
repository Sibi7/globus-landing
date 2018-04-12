$(document).ready(function () {
    $('#table').tablesorter();

    $('.owl-carousel-header').owlCarousel({
        loop: true,
        margin: 0,
        autoplay: true,
        nav: false,
        dots: true,
        mouseDrag: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });

    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 0,
        autoplay: true,
        nav: true,
        dots: false,
        navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            320: {
                items: 3
            },
            770: {
                items: 4
            },
            1455: {
                items: 5
            },
            1650: {
                items: 6
            }
        }
    });

    $('.property-selection__numbers').click(function () {
        $(this).toggleClass('active')
    });

    $('.menu').click(function () {
        $(this).toggleClass('open');
        $('.sidebar').toggleClass('active-bar');
        $('body').toggleClass('overflow-hidden')
    });

    var time = 2, cc = 1;

    $(window).scroll(function () {
        $('.progress__wrap').each(function () {
            var
            cPos = $(this).offset().top,
            topWindow = $(window).scrollTop();

            if (cPos < topWindow + 700) {
                if (cc < 2) {
                    $('.number').addClass('viz');
                    $('div').each(function () {
                        var
                        i = 1,
                        num = $(this).data('num'),
                        step = 100 * time / num,
                        that = $(this),
                        int = setInterval(function () {
                            if (i <= num) {
                                that.html(i);
                            }
                            else {
                                cc = cc + 2;
                                clearInterval(int);
                            }
                            i++;
                        }, step);
                    });
                }

            }
        });
    });

    $('.aside-content__form-telm, .js_modal-mask').inputmask({ alias: "phoneru"});

    $(window).resize(function () {
        if ($(window).width() < 770) {
            $('.housing__item-text').after($('.property-selection'))
        }
    })
    if ($(window).width() < 770) {
        $('.housing__item-text').after($('.property-selection'))
    }


});
var x, i, j, selElmnt, a, b, c;
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < selElmnt.length; j++) {
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function (e) {
            var i, s, h;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            h = this.parentNode.previousSibling;
            for (i = 0; i < s.length; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    break;
                }
            }
            h.click();
        });
        b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });
}

function closeAllSelect(elmnt) {
    var x, y, i, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    for (i = 0; i < y.length; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < x.length; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}

document.addEventListener("click", closeAllSelect);

$(".slider")
.slider({ 
    min: 0,
    max: 10,
    range: true,
    values: [0, 10],
    step: 0.1
})
.slider("pips", {
    rest: false,
    suffix: " млн."
})
.slider("float", {
    rest: "label",
    suffix: " млн."
})
.draggable();

$(".slider_area")
.slider({ 
    min: 0,
    max: 120,
    range: true,
    values: [0, 120],
    step: 1
})
.slider("pips", {
    rest: false,
    suffix: " м<sup>2</sup>"
})
.slider("float", {
    suffix: " м<sup>2</sup>"
})
.draggable();

// tabs

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove('visible-content');
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" activeTab", "");
    }
    var tab = document.getElementById(tabName);
    tab.style.display = "flex";
    tab.classList.add('visible-content');
    evt.currentTarget.className += " activeTab";

    if(tab.querySelector('.tabcontent-1')) {
        tab.querySelector('.tabcontent-1').style.display = "flex";
        tab.querySelector('.tablinks-1').classList.add('activeInsideTab');

        tab.querySelector('.tabcontentStyle').style.display = "flex";
        tab.querySelector('.tab-style__nav-btn').classList.add('activeStyleTab');
    }

    var maybe = document.querySelector('.interesting');

    if (tab.classList.contains('tab-style') || tab.classList.contains('tab-gallery') || tab.classList.contains('tab-stock') || tab.classList.contains('tab-progress') || tab.classList.contains('tab-partners') || tab.classList.contains('tab-calc')) {
        maybe.style.display = "none"
    } else {
        maybe.style.display = "block"
    }

}

function openTabInside(evt, tabName) {
    var tabcontentInside = document.getElementsByClassName("tabcontent-1");
    for (i = 0; i < tabcontentInside.length; i++) {
        tabcontentInside[i].style.display = "none";
    }
    var tablinksInside = document.getElementsByClassName("tablinks-1");
    for (i = 0; i < tablinksInside.length; i++) {
        tablinksInside[i].className = tablinksInside[i].className.replace(" activeInsideTab", "");
    }
    var tabInside = document.getElementById(tabName);
    tabInside.style.display = "flex";
    evt.currentTarget.className += " activeInsideTab";
}

function styleNav(evt, tabName) {
    var tabcontentStyle = document.getElementsByClassName("tabcontentStyle");
    for (i = 0; i < tabcontentStyle.length; i++) {
        tabcontentStyle[i].style.display = "none";
    }
    var tablinksStyle = document.getElementsByClassName("tab-style__nav-btn");
    for (i = 0; i < tablinksStyle.length; i++) {
        tablinksStyle[i].className = tablinksStyle[i].className.replace(" activeStyleTab", "");
    }
    var tabStyle = document.getElementById(tabName);
    tabStyle.style.display = "flex";
    evt.currentTarget.className += " activeStyleTab";

    tabStyle.querySelector('.tabcontent-1').style.display = "flex";
    tabStyle.querySelector('.tablinks-1').classList.add('activeInsideTab');

}

// Get the element with id="defaultOpen" and click on it
if(document.getElementById("default")) {
    document.getElementById("default").click();
}
$(".slider_time")
.slider({
    max: 25,
    min: 1,
    range: "min",
    step: 0.5
})
.slider('pips', {
    rest: "label",
    step: 50
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
    step: 250
})
.slider('float', {
    rest: "label"
});

if($(window).width() < 576) {
    $(".slider_time")
    .slider({
        max: 25,
        min: 1,
        range: "min",
        step: 0.5
    })
    .slider('pips', {
        rest: "label",
        step: 10
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
        step: 50
    })
    .slider('float', {
        rest: "label"
    });
}

$(document).on('click', '.js_open-modal', function() {
    $('.js_modal').fadeIn('fast');
});

$(document).on('click', '.js_open-call-modal', function() {
    $('.js_call-modal').fadeIn('fast');
});

$(document).on('click', '.js_close-modal', function() {
    $('.modal').fadeOut('fast');
});

// calculator
if(document.getElementById('cost')) {
    var realtyCost = document.getElementById('cost');
    var firstPayment = document.getElementById('first-payment');
    var amountOfCredit = document.querySelector('.calc__final-credit');
    var monthPayment = document.querySelector('.calc__month-payment');

    var realtyCostNumber = 0, firstPaymentNumber = 0, currentRate, currentYear;

    realtyCost.oninput = function () {
        if (realtyCostNumber >= 0) {
            realtyCostNumber = parseInt(realtyCost.value, 10);
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
    };

    function getCurrentSliderNumbers() {
        currentYear = parseInt(document.querySelector('.slider_time .ui-slider-tip').innerHTML, 10);
        currentRate = parseInt(document.querySelector('.slider_rate .ui-slider-tip').innerHTML, 10);
        return currentRate, currentYear;
    };

    function calcCredit() {
        getCurrentSliderNumbers();
        amountOfCredit.innerHTML = (realtyCostNumber - firstPaymentNumber + ' руб.');
    };

    function calcMonthPayment() {
        getCurrentSliderNumbers();
        var first = (realtyCostNumber - firstPaymentNumber) / (currentYear * 12);
        var second = (realtyCostNumber - firstPaymentNumber) * (currentRate * 0.001)

        monthPayment.innerHTML = (Math.round((first + second) * 100) / 100 + ' руб.');
    };


    $(document).on('click', '.calc__btn', function() {
        calcCredit();
        calcMonthPayment();
    });
}

var city = document.getElementById('city');
var outOfTown = document.getElementById('out-of-town');
var discounts = document.getElementById('discounts');

function toggleList(subject, subjectList, filterWrap) {
    var list = subject.querySelector('.' + subjectList);
    var wrap = subject.querySelector('.' + filterWrap);

    if(list.classList.contains('open_list')) {
        list.classList.remove('open_list');
        wrap.classList.remove('filter__select_opened');
    }
    else {
        list.classList.add('open_list');
        wrap.classList.add('filter__select_opened');
    }

    if (list.style.maxHeight) {
        list.style.maxHeight = null;
    }
    else {
        list.style.maxHeight = list.scrollHeight + 30 + "px";
    }
}

city.onmouseenter = function(event){
    toggleList(city, 'filter__select_list', 'filter__select');
};

city.onmouseleave = function(event){
    toggleList(city, 'filter__select_list', 'filter__select');
};

outOfTown.onmouseenter = function(event){
    toggleList(outOfTown, 'filter__select_list', 'filter__select');
};

outOfTown.onmouseleave = function(event){
    toggleList(outOfTown, 'filter__select_list', 'filter__select');
};
