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
               
    var table = $('<table></table>').addClass('vi-calendar');

//    for(i=0; i<3; i++){
//    
//        var row = $('<tr></tr>').addClass('bar').text('result ' + i);
//    
//        table.append(row);
//}
//
//$('#here_table').append(table);

//    var calendar = <table class="vi-calendar">
            

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
console.log(getDaysArray(2017, 4));

function getDaysArray(year, month) {
    
    var numDaysInMonth, daysInWeek, daysIndex, index, i, l, daysArray, monthArray;
    
    monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    numDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    daysIndex = { 'Sun': 0, 'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5, 'Sat': 6 };
    
    index = daysIndex[(new Date(year, month - 1, 1)).toString().split(' ')[0]];
    daysArray = [];
    
    var table = $('<table></table>').addClass('vi-calendar');
    var month_name = $('<th></th>').addClass('vi-month-name').attr('colspan',5).text(monthArray[month-1]);
    var next_month = $('<th></th>').addClass('vi-next-month').text('+');
    var previous_month = $('<th></th>').addClass('vi-prev-month').text('-');
    
    var table_header = $('<tr></tr>').append(month_name).append(previous_month).append(next_month);
    
    var table_days_header, temp;
    
    var daysAbr = ["Su","Mo","Tu","We","Th","Fr","Sa",];
    
    var tr = $('<tr></tr>');
    
    for(i=0; i <= 6; i++){
        
        if(i == 0 || i == 6){
            
           temp = 'vi-sun';
        }
        else{
            temp = 'vi-xxx';
        }
        
        table_days_header = tr.append($('<td></td>').addClass(temp).text(daysAbr[i]));
    }
    
    table.append(table_header).append(table_days_header);
    
//    console.log(table_header.html());
    
    var tr = $('<tr></tr>');
    
    for(i=0;i<=index;i++){
        daysArray.unshift('s');
    }
    index=0;
    for (i = 0, l = numDaysInMonth[month - 1]; i < l; i++) {
        
        daysArray.push((i + 1) + '. ' + [index++]);
        
        var td = tr.append($('<td></td>').addClass('vi-d-' + (i)).text(i+1)) ;
        
        if (index == 7){
            
            index = 0;
            
            table.append(tr);
            
            tr = $('<tr></tr>');
        } 
    }
console.log(table.html());
    return daysArray;
}
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
