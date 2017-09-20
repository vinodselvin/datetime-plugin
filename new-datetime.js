
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

var _weeks = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

if (document.addEventListener) {
    document.addEventListener("click", handleClick, false);
} else if (document.attachEvent) {
    document.attachEvent("onclick", handleClick);
}

function handleClick(event) {
    event = event || window.event;
    event.target = event.target || event.srcElement;

    var element = event.target;

    while (element) {
        if (element.className === "vi-datetime") {
            bindViewToInput(element);
            break;
        }

        element = element.parentNode;
    }
}

function bindViewToInput(input) {
    
    var date = input.value.split("/");
    
    var d = new Date(date[0], date[1]-1, date[2]);
    console.log(d);
    _generateCalendar(d);
    __attachEvents();
    /*if(isValidInput(date)){
        alert('gee');
    }
    else{
		_generateCalendar(d);
	}*/
    
}

function _generateCalendar(d){
		
		var day, date, month, year;
		
		day = d.getDay();
		date = d.getDate();
		month = d.getMonth();
		year = d.getFullYear();
		
		var container = document.createElement("div");
		container.setAttribute("class", "container _vi_calendar");
		
		var _header = _generateCalendarHeader(d);
		
		var _calbody = _generateCalendarDates(d);
		
		container.appendChild(_header);
		container.appendChild(_calbody);
		
		document.getElementById("output").innerHTML = "";
		
		document.getElementById("output").appendChild(container);
	
	//document.write(_calbody);
	console.log(container);
}

function _generateCalendarHeader(d){
	
	var day, date, month, year;
		
	day = d.getDay();
	date = d.getDate();
	month = d.getMonth();
	year = d.getFullYear();
	
	var row = document.createElement("div");
	row.setAttribute("class", "row _cal_header");
	
	var _years = document.createElement("div");
	_years.setAttribute("class", "col-xs-12 _years");
	_years.appendChild(document.createTextNode(year));
	
	var _months = document.createElement("div");
	_months.setAttribute("class", "col-xs-12 _months");
	_months.appendChild(document.createTextNode(_weeks[day] + ", " + date + " " + year));
	
	row.appendChild(_years);
	row.appendChild(_months);
	
	return row;
}

function _generateCalendarDates(d){
	
	var day, date, month, year;
		
	day = d.getDay();
	date = d.getDate();
	month = d.getMonth();
	year = d.getFullYear();
	
	var _months = ["S", "M", "T", "W", "T", "F", "S"];
	
	var _calbody = document.createElement("div");
	_calbody.setAttribute("class", "row _cal_body");
	
	var row_body = document.createElement("div");
	row_body.setAttribute("class", "row");
	
	var _lt_gt_header = document.createElement("div");
	_lt_gt_header.setAttribute("class", "col-xs-3 _lt_gt_header");
	
	var _cal_lt = document.createElement("div");
	_cal_lt.setAttribute("class", "glyphicon glyphicon-menu-left _cal_lt");
	
	var _month_label = document.createElement("div");
	_month_label.setAttribute("class", "col-xs-6 _month_label");
	_month_label.appendChild(document.createTextNode(monthNames[month] + " " + year));
	
	_lt_gt_header.appendChild(_cal_lt);
	
	row_body.appendChild(_lt_gt_header);
	
	_lt_gt_header = document.createElement("div");
	_lt_gt_header.setAttribute("class", "col-xs-3 _lt_gt_header");
	
	row_body.appendChild(_month_label);
	
	var _cal_gt = document.createElement("div");
	_cal_gt.setAttribute("class", "glyphicon glyphicon-menu-right _cal_gt");
	
	_lt_gt_header.appendChild(_cal_gt);
	
	row_body.appendChild(_lt_gt_header);
	
	var _dates_header = document.createElement("div");
	_dates_header.setAttribute("class", "row _dates_header");
	
	var _day_header = document.createElement("div");
	_day_header.setAttribute("class", "_day_header");
	
	for (var i = 0; i < _months.length; i++) { 
		var _months_name = document.createElement("div");
		_months_name.setAttribute("class", "col-xs-1-5");
		_months_name.appendChild(document.createTextNode(_months[i]));
		
		_day_header.appendChild(_months_name);
	}
	
	var _days_view = document.createElement("div");
	_days_view.setAttribute("class", "_days_view");
	
	var weeks = _countWeeks(month, year);
	
	var days_in_month = _daysInMonth(month, year);
	var start_day = new Date(year, month, 1).getDay();
	var counter = 1;

	for (var i = 0; i < weeks; i++) { 
		
		var _actual_days = document.createElement("div");
		_actual_days.setAttribute("class", "_actual_days");
		
		for(var j = 0; j < 7; j++){
			
			var _actual_dates = document.createElement("div");
			_actual_dates.setAttribute("class", "col-xs-1-5");
			
			var _node = "";
			
			if((start_day > j && i == 0) || (days_in_month <= counter)){
				_node = document.createTextNode("");
			}
			else{
				_node = document.createTextNode(counter);
				
				if(counter == date){				
					_actual_dates.setAttribute("class", _actual_dates.getAttribute("class") + " selected");	
					console.log(_actual_dates.getAttribute("class"));
				}
				
				counter++;
			}

			_actual_dates.appendChild(_node);
			
			_actual_days.appendChild(_actual_dates);
		}
		
		_days_view.appendChild(_actual_days);
	}
	
	_dates_header.appendChild(_day_header);
	_dates_header.appendChild(_days_view);
	
	//row_body.appendChild(_dates_header);
	
	_calbody.appendChild(row_body);
	_calbody.appendChild(_dates_header);
	//_calbody.appendChild(_dates_header.appendChild(_days_view));
	
	return _calbody;
}

function _daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}

function _countWeeks(month, year) {

    var firstOfMonth = new Date(year, month-1, 1);
    var lastOfMonth = new Date(year, month, 0);

    var days = firstOfMonth.getDay() + 6 + lastOfMonth.getDate();

    return Math.ceil(days / 7);
}

function __attachEvents(){
	var _selected = document.querySelectorAll("._actual_days div");

	for (var i = 0; i < _selected.length; i++) {
		_selected[i].addEventListener('click', function(event) {
			this.classList.add("selected");
		});
	}
}
