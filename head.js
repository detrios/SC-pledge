// globals.
var first_check = true;
var end_animation = false;
var animation = null;
var current_anim = 1;
var bar_on = 0;
var nb_bar_dock = 18;
var nb_bar_undock = 37;
var nb_bar_display = nb_bar_dock;
var cnt = 0;
var cnt2 = 0;			
var array_month = new Array('NULL','JAN','FEB', 'MAR', 'APR', 'MAY', 'JUN' ,'JUL', 'AUG', 'SEP', 'OCT','NOV','DEC' );
var timeTransition = 2;

function init()
{
		create_bars(false);
		document.getElementById('undocked1').style.display='block';
		document.getElementById('undocked2').style.display='block';
		document.getElementById('undocked3').style.display='inline';
		document.getElementById('undocked4').style.display='block';
		document.getElementById('undocked5').style.display='inline';
		document.getElementById('undocked6').style.display='block';
		document.getElementById('undocked7').style.display='block';
		document.getElementById('content').style.padding='18px 0 0 13px';
		document.getElementById('amount').style.paddingLeft='80px';

    
	//refresh the data with animate
	first_check = true;
	end_animation = false;
	clearInterval(animation);
	current_anim = 1;
	updateData();
}

			
			
			