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

            if (cPos < topWindow + 200) {
                if (cc < 2) {
                    $('.number').addClass('viz');
                    $('div').each(function () {
                        var
                            i = 1,
                            num = $(this).data('num'),
                            step = 1000 * time / num,
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


(function ($) {

        "use strict";

        var DEBUG = false, // make true to enable debug output
            PLUGIN_IDENTIFIER = "RangeSlider";

        var RangeSlider = function (element, options) {
            this.element = element;
            this.options = options || {};
            this.defaults = {
                output: {
                    prefix: '', // function or string
                    suffix: '', // function or string
                    format: function (output) {
                        return output;
                    }
                },
                change: function (event, obj) {
                }
            };
            // This next line takes advantage of HTML5 data attributes
            // to support customization of the plugin on a per-element
            // basis.
            this.metadata = $(this.element).data('options');
        };

        RangeSlider.prototype = {

            ////////////////////////////////////////////////////
            // Initializers
            ////////////////////////////////////////////////////

            init: function () {
                if (DEBUG && console) console.log('RangeSlider init');
                this.config = $.extend(true, {}, this.defaults, this.options, this.metadata);

                var self = this;
                // Add the markup for the slider track
                this.trackFull = $('<div class="track track--full"></div>').appendTo(self.element);
                this.trackIncluded = $('<div class="track track--included"></div>').appendTo(self.element);
                this.inputs = [];

                $('input[type="range"]', this.element).each(function (index, value) {
                    var rangeInput = this;
                    // Add the ouput markup to the page.
                    rangeInput.output = $('<output>').appendTo(self.element);
                    // Get the current z-index of the output for later use
                    rangeInput.output.zindex = parseInt($(rangeInput.output).css('z-index')) || 1;
                    // Add the thumb markup to the page.
                    rangeInput.thumb = $('<div class="slider-thumb">').prependTo(self.element);
                    // Store the initial val, incase we need to reset.
                    rangeInput.initialValue = $(this).val();
                    // Method to update the slider output text/position
                    rangeInput.update = function () {
                        if (DEBUG && console) console.log('RangeSlider rangeInput.update');
                        var range = $(this).attr('max') - $(this).attr('min'),
                            offset = $(this).val() - $(this).attr('min'),
                            pos = offset / range * 100 + '%',
                            transPos = offset / range * -100 + '%',
                            prefix = typeof self.config.output.prefix == 'function' ? self.config.output.prefix.call(self, rangeInput) : self.config.output.prefix,
                            format = self.config.output.format($(rangeInput).val()),
                            suffix = typeof self.config.output.suffix == 'function' ? self.config.output.suffix.call(self, rangeInput) : self.config.output.suffix;

                        // Update the HTML
                        $(rangeInput.output).html(prefix + '' + format + '' + suffix);
                        $(rangeInput.output).css('left', pos);
                        $(rangeInput.output).css('transform', 'translate(' + transPos + ',0)');

                        // Update the IE hack thumbs
                        $(rangeInput.thumb).css('left', pos);
                        $(rangeInput.thumb).css('transform', 'translate(' + transPos + ',0)');

                        // Adjust the track for the inputs
                        self.adjustTrack();
                    };

                    // Send the current ouput to the front for better stacking
                    rangeInput.sendOutputToFront = function () {
                        $(this.output).css('z-index', rangeInput.output.zindex + 1);
                    };

                    // Send the current ouput to the back behind the other
                    rangeInput.sendOutputToBack = function () {
                        $(this.output).css('z-index', rangeInput.output.zindex);
                    };

                    ///////////////////////////////////////////////////
                    // IE hack because pointer-events:none doesn't pass the
                    // event to the slider thumb, so we have to make our own.
                    ///////////////////////////////////////////////////
                    $(rangeInput.thumb).on('mousedown', function (event) {
                        // Send all output to the back
                        self.sendAllOutputToBack();
                        // Send this output to the front
                        rangeInput.sendOutputToFront();
                        // Turn mouse tracking on
                        $(this).data('tracking', true);
                        $(document).one('mouseup', function () {
                            // Turn mouse tracking off
                            $(rangeInput.thumb).data('tracking', false);
                            // Trigger the change event
                            self.change(event);
                        });
                    });

                    // IE hack - track the mouse move within the input range
                    $('body').on('mousemove', function (event) {
                        // If we're tracking the mouse move
                        if ($(rangeInput.thumb).data('tracking')) {
                            var rangeOffset = $(rangeInput).offset(),
                                relX = event.pageX - rangeOffset.left,
                                rangeWidth = $(rangeInput).width();
                            // If the mouse move is within the input area
                            // update the slider with the correct value
                            if (relX <= rangeWidth) {
                                var val = relX / rangeWidth;
                                $(rangeInput).val(val * $(rangeInput).attr('max'));
                                rangeInput.update();
                            }
                        }
                    });

                    // Update the output text on slider change
                    $(this).on('mousedown input change touchstart', function (event) {
                        if (DEBUG && console) console.log('RangeSlider rangeInput, mousedown input touchstart');
                        // Send all output to the back
                        self.sendAllOutputToBack();
                        // Send this output to the front
                        rangeInput.sendOutputToFront();
                        // Update the output
                        rangeInput.update();
                    });

                    // Fire the onchange event
                    $(this).on('mouseup touchend', function (event) {
                        if (DEBUG && console) console.log('RangeSlider rangeInput, change');
                        self.change(event);
                    });

                    // Add this input to the inputs array for use later
                    self.inputs.push(this);
                });

                // Reset to set to initial values
                this.reset();

                // Return the instance
                return this;
            },

            sendAllOutputToBack: function () {
                $.map(this.inputs, function (input, index) {
                    input.sendOutputToBack();
                });
            },

            change: function (event) {
                if (DEBUG && console) console.log('RangeSlider change', event);
                // Get the values of each input
                var values = $.map(this.inputs, function (input, index) {
                    return {
                        value: parseInt($(input).val()),
                        min: parseInt($(input).attr('min')),
                        max: parseInt($(input).attr('max'))
                    };
                });

                // Sort the array by value, if we have 2 or more sliders
                values.sort(function (a, b) {
                    return a.value - b.value;
                });

                // call the on change function in the context of the rangeslider and pass the values
                this.config.change.call(this, event, values);
            },

            reset: function () {
                if (DEBUG && console) console.log('RangeSlider reset');
                $.map(this.inputs, function (input, index) {
                    $(input).val(input.initialValue);
                    input.update();
                });
            },

            adjustTrack: function () {
                if (DEBUG && console) console.log('RangeSlider adjustTrack');
                var valueMin = Infinity,
                    rangeMin = Infinity,
                    valueMax = 0,
                    rangeMax = 0;

                // Loop through all input to get min and max
                $.map(this.inputs, function (input, index) {
                    var val = parseInt($(input).val()),
                        min = parseInt($(input).attr('min')),
                        max = parseInt($(input).attr('max'));

                    // Get the min and max values of the inputs
                    valueMin = (val < valueMin) ? val : valueMin;
                    valueMax = (val > valueMax) ? val : valueMax;
                    // Get the min and max possible values
                    rangeMin = (min < rangeMin) ? min : rangeMin;
                    rangeMax = (max > rangeMax) ? max : rangeMax;
                });

                // Get the difference if there are 2 range input, use max for one input.
                // Sets left to 0 for one input and adjust for 2 inputs
                if (this.inputs.length > 1) {
                    this.trackIncluded.css('width', (valueMax - valueMin) / (rangeMax - rangeMin) * 100 + '%');
                    this.trackIncluded.css('left', (valueMin - rangeMin) / (rangeMax - rangeMin) * 100 + '%');
                } else {
                    this.trackIncluded.css('width', valueMax / (rangeMax - rangeMin) * 100 + '%');
                    this.trackIncluded.css('left', '0%');
                }
            }
        };

        RangeSlider.defaults = RangeSlider.prototype.defaults;

        $.fn.RangeSlider = function (options) {
            if (DEBUG && console) console.log('$.fn.RangeSlider', options);
            return this.each(function () {
                var instance = $(this).data(PLUGIN_IDENTIFIER);
                if (!instance) {
                    instance = new RangeSlider(this, options).init();
                    $(this).data(PLUGIN_IDENTIFIER, instance);
                }
            });
        };

    }
)(jQuery);


var rangeSlider = $('#facet-price-range-slider');
var rangeSlider2 = $('#facet-area-range-slider');
if (rangeSlider.length > 0) {
    rangeSlider.RangeSlider({
        output: {
            format: function (output) {
                return output.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            },
            suffix: function (input) {
                return parseInt($(input).val()) == parseInt($(input).attr('max')) ? this.config.maxSymbol : '';
            }
        }
    });
}

if (rangeSlider2.length > 0) {
    rangeSlider2.RangeSlider({
        output: {
            format: function (output) {
                return output.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            },
            suffix: function (input) {
                return parseInt($(input).val()) == parseInt($(input).attr('max')) ? this.config.maxSymbol : '';
            }
        }
    });
}


