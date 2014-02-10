function create_bars(is_docked){
document.getElementById('bars').innerHTML=''; //reinit
	for (var i=1;i<=nb_bar_undock;i++){
	 document.getElementById('bars').innerHTML+='<img src="off.png" alt="|" id="bar_'+i+'" '+(i>nb_bar_dock && is_docked?'style="display:none"':'')+' />';
	}
}
create_bars(true); 

function API_SC2(data){

	document.getElementById('undocked6').innerHTML='<a href="'+data.devtracker[0].link+'" target="_blank">'+data.devtracker[0].author+' say : '+data.devtracker[0].msg+'</a><br />';

}

function API_SC(data) {

	bar_on = Math.floor(nb_bar_display * parseInt(data.current_pledge.percentless) / 100);

	if (bar_on == 0) { //no need animation for 0 'bar on' to display
		first_check = false;
		end_animation = true;
	}

	if (first_check) { //anim the progress bar for the first launch
		if (typeof document.getElementById('bar_' + current_anim) == 'undefined')
			return false;
		first_check = false;
		animation = setInterval(
				function() {
					document.getElementById('bar_' + current_anim).src = 'on.png';
					document.getElementById('percent').innerHTML = Math.floor(100 / nb_bar_display * current_anim)+ '%';
					document.getElementById('number_citizen').innerHTML = addCommas(data.stat.data.fans);

					var calc = addCommas((Math.floor(100 / nb_bar_display * current_anim) * 10000)
							+ Math.floor(Math.random() * 10000));
					var million = Math.floor(data.current_pledge.number / 1000000);
					if (Math.floor(100 / nb_bar_display * current_anim) * 10000 < 100000) {
						calc = '$' + million + ',0' + calc;
					} else {
						calc = '$' + million + ',' + calc;
					}
					document.getElementById('amount').innerHTML = calc;
					if (current_anim == bar_on) {
						clearInterval(animation);
						end_animation = true;
						document.getElementById('percent').innerHTML = data.current_pledge.percent;
						document.getElementById('number_citizen').innerHTML = addCommas(data.stat.data.fans);
						document.getElementById('amount').innerHTML = data.current_pledge.us;									
					}
					current_anim++;
				}, 150);

	} else if (end_animation) { // check every minutes, execute if the animation bar is not running
		for ( var i = 1; i <= nb_bar_display; i++) { // reset the bar to off ( when  the 18 bar are on, the next for don't reinit else )
			document.getElementById('bar_' + i).src = 'off.png';
		}
		for ( var i = 1; i <= bar_on; i++) {
			document.getElementById('bar_' + i).src = 'on.png';
		}
		document.getElementById('percent').innerHTML = data.current_pledge.percent;
		document.getElementById('number_citizen').innerHTML = addCommas(data.stat.data.fans);

	}
	//made even animation run
	document.getElementById('day').innerHTML =data.date.Austin.day;
	document.getElementById('month').innerHTML = array_month[parseInt(data.date.Austin.month)];
	document.getElementById('hour').innerHTML =data.date.Austin.hour;
	document.getElementById('min').innerHTML =data.date.Austin.min;
	document.getElementById('day2').innerHTML =data.date.Los_Angeles.day;
	document.getElementById('month2').innerHTML = array_month[parseInt(data.date.Los_Angeles.month)];
	document.getElementById('hour2').innerHTML =data.date.Los_Angeles.hour;
	document.getElementById('min2').innerHTML =data.date.Los_Angeles.min;
	document.getElementById('max_citizen').innerHTML = addCommas(parseInt(data.stat.data.fans)+  parseInt(data.stat.data.alpha_slots_left));
	document.getElementById('perc_citizen').innerHTML = data.stat.data.alpha_slots_percentage;				
	document.getElementById('amount').innerHTML = data.current_pledge.us;
	document.getElementById('load').style.display = 'none';
	document.getElementById('content').style.display = 'block';
	if(typeof data.day_passed !='undefined'){
		document.getElementById('undocked1').innerHTML=data.day_passed[0].day;
		document.getElementById('undocked2').innerHTML=data.day_passed[1].day;
	}
	
	updateData('action=home&callback=API_SC2');
}

function updateData(uri) { //execute the API for retreiving information
	if (cnt) {
		var scripts = document.getElementsByTagName('script');
		var scr = scripts[scripts.length - 1];
		scr.parentElement.removeChild(scr);
	}
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'http://www.starpirates.fr/API/API.php?_foo='
			+ new Date().getTime();
	if(uri){
	script.src +='&'+uri;
	}
	head.appendChild(script);
	cnt++;
	
	
};

function addCommas(n) {
	var rx = /(\d+)(\d{3})/;
	return String(n).replace(/^\d+/, function(w) {
		while (rx.test(w)) {
			w = w.replace(rx, '$1,$2');
		}
		return w;
	});
}

function treatAsUTC(year,month,day) {
	var result = null;
	if(year){
	result = new Date();
	result.setDate(day);
	result.setMonth(month-1);
	result.setYear(year);
	}
	else{
	result = new Date();
	}
	result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
	return result;
}


setTimeout(function() {
	updateData();
}, 1000);
setInterval(function() {
	updateData();
}, 60000);
