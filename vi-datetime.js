/*
 * @Author: Vinod Selvin
 * @Description: Simple Date plugin
 */
$(function () {

    $('.vi-date').wrap('<div class="wrap-date"></div>');

    var formats = ['dd-mm-yyyy', 'yyyy-mm-dd', 'mm-dd-yyyy', 'dd-yyyy-mm', 'yyyy-dd-mm', 'mm-yyyy-dd',
                   'mm-yyyy', 'yyyy-mm', 
                   'dd-yyyy', 'yyyy-dd', 
                   'mm-dd', 'dd-mm',
                   'yyyy', 'dd', 'mm'];

    var tgday = '<select class="vdays"></select>';
    var tgmonth = '<select class="vmonths"></select>';
    var tgyears = '<select class="vyears"></select>';

    for (var i = 0; i < formats.length; i++) {

        var format = formats[i];
        var final_format = '.vi-date[data-vi-format="' + format + '"]';
        var fgdate = '';
        
        var exp_format = format.split("-");
        var len = exp_format.length;
        
        for(var j=0; j<= len-1; j++){
            
            if (exp_format[j] == 'dd') {
                fgdate += tgday;
            }
            else
            if (exp_format[j] == 'mm') {
                fgdate += tgmonth;
            }
            else
            if (exp_format[j] == 'yyyy') {
                fgdate += tgyears;
            }
        }
        
        $(final_format).hide();
        $(final_format).after(fgdate);

        populateYears(format);
        populateMonths(format);
        updateNumberOfDays();

    }
});

/*
 * @Author: Vinod Selvin
 * @Description: populate years select box
 * @params: format-> Date format
 */

function populateYears(format) {

    var final_format = '.vi-date[data-vi-format="' + format + '"]';

    $(final_format).parent().find('.vyears').append($('<option />').val(0).html('yyyy'));

    for (i = new Date().getFullYear(); i > 1900; i--) {
        $(final_format).parent().find('.vyears').append($('<option />').val(i).html(i));
    }
}

/*
 * @Author: Vinod Selvin
 * @Description: populate months select box
 * @params: format-> Date format
 */

function populateMonths(format) {

    var final_format = '.vi-date[data-vi-format="' + format + '"]';

    $(final_format).parent().find('.vmonths').append($('<option />').val(0).html('mm'));

    for (i = 1; i < 13; i++) {
        $(final_format).parent().find('.vmonths').append($('<option />').val(i).html(i));
    }
}

/*
 * @Author: Vinod Selvin
 * @Description: function to update the days
 */

function updateNumberOfDays() {

    $('.vdays').html('');

    month = $('.vmonths').val();
    year = $('.vyears').val();

    days = daysInMonth(month, year);

    $('.vdays').append($('<option />').val(0).html('dd'));

    for (i = 1; i < days + 1; i++) {
        $('.vdays').append($('<option />').val(i).html(i));
    }
}

/*
 * @Author: Vinod Selvin
 * @Description: helper function
 */

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

$(document).ready(function () {

    $('.vi-date').nextAll('select').on('change', function (e) {

        var pval = $(this).prevAll('.vi-date').val();
        var cval = $(this).val();
        var dclass = $(this).attr('class');
        var format = $(this).prevAll('.vi-date').data('vi-format');
        var inp_tag = $(this).prevAll('.vi-date');

        var final_date = processDate(pval, cval, dclass, format);

        inp_tag.val(final_date);

    });
});

/*
 * @Author: Vinod Selvin
 * @Description: Processing Date to require format
 * @Params: pval-> Previous Input in textbox, cval-> current value from select field, dclass-> Class of select field, format-> Date format.
 */

function processDate(pval, cval, dclass, format) {

    var final_date = format;
    var map_date = {'vmonths': 'mm', 'vdays': 'dd', 'vyears': 'yyyy'};

    $.each(map_date, function (key, value) {

        if (key == dclass) {

            if (pval != '') {

                var arr = format.split('-');
                var arr2 = pval.split('-');
                var decis = value;

                $.each(arr, function (key1, value1) {

                    if (value1 == value) {

                        if (arr2[key1] == arr2[key1 - 1]) {

                            decis = "-" + arr2[key1 - 1];
                            cval = "-" + cval;
                            final_date = pval.replace(decis, cval);
                        } else {
                            decis = arr2[key1];
                            final_date = pval.replace(decis, cval);
                        }

                    }

                });


            } else {
                final_date = final_date.replace(value, cval);
            }
        }
    });

    return final_date;
}

/*
 * @Author: Vinod Selvin
 * @Description: Simple Date plugin (END OF SCRIPT)
 */
