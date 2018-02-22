$(document).ready(function () {

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
    $('.partners__wrap').owlCarousel({
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
            600: {
                items: 3
            },
            1000: {
                items: 5
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

            if (cPos < topWindow + 300) {
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

    $( ".map__btn" ).click(function() {
        $( ".map__wrap" ).slideToggle( "slow", function() {
        });
        $('.map__btn').toggleClass('active');
    });

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
    });

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
    });