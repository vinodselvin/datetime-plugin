/*
 * @Author: Vinod Selvin
 * @Description: Simple Date plugin
 */
	$(function(){

		$('.vi-date').wrap('<div class="wrap-date"></div>');

		var formats = ['dd-mm-yyyy', 'mm-yyyy', 'dd-yyyy', 'yyyy', 'dd', 'mm', 'dd-mm' ];
		var tgday = '<select class="vdays"></select>';
		var tgmonth = '<select class="vmonths"></select>';
		var tgyears = '<select class="vyears"></select>';
		
		for(var i=0;i< formats.length; i++){
			
			var format = formats[i];
			var final_format = '.vi-date[data-vi-format="'+format+'"]';
			var fgdate = '';

			if(format.includes('dd')){
				fgdate += tgday;
			}
			if(format.includes('mm')){
				fgdate += tgmonth;
			}
			if(format.includes('yyyy')){
				fgdate += tgyears;
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
	 
	function populateYears(format){
		
		var final_format = '.vi-date[data-vi-format="'+format+'"]';
		
		$(final_format).parent().find('.vyears').append($('<option />').val(0).html('yyyy'));
		
		for (i = new Date().getFullYear(); i > 1900; i--){
			$(final_format).parent().find('.vyears').append($('<option />').val(i).html(i));
		}
	}
	
	/*
	 * @Author: Vinod Selvin
	 * @Description: populate months select box
	 * @params: format-> Date format
	 */
	 
	function populateMonths(format){

		var final_format = '.vi-date[data-vi-format="'+format+'"]';
		
		$(final_format).parent().find('.vmonths').append($('<option />').val(0).html('mm'));
		
		for (i = 1; i < 13; i++){
			$(final_format).parent().find('.vmonths').append($('<option />').val(i).html(i));
		}
	}

	/*
	 * @Author: Vinod Selvin
	 * @Description: function to update the days
	 */

	function updateNumberOfDays(){
		
		$('.vdays').html('');
		
		month = $('.vmonths').val();
		year = $('.vyears').val();
		
		days = daysInMonth(month, year);
		
		$('.vdays').append($('<option />').val(0).html('dd'));
		
		for(i=1; i < days+1 ; i++){
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
	
/*
 * @Author: Vinod Selvin
 * @Description: Simple Date plugin (END OF SCRIPT)
 */
