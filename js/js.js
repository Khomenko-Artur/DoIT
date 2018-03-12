  window.onload = function() {
	  setTimeout(function(){ document.getElementById('preload').style.opacity='0'; }, 800);
	  setTimeout(function(){ document.getElementById('show_site').style.opacity='1'; }, 1400);
  };

//валидация формы, если введенные данные проходят проверку на стороне клиента, то кнопка меняется на Success
	function validate(){
	var prof=0;
	var x=document.forms['form']['form_name'].value;
	var y=document.forms['form']['form_phone'].value;
	var pattern1 = /^(\w+\.?\w+)+@([A-Za-z0-9]+\.[A-Za-z0-9]+)+$/ig;
	var pattern2 = /^\+?[0-9)( -]*$/;
	if (x.length<3 || x.length>40 || document.forms['form']['form_name'].value=='Name'){ document.getElementById('form_name').style.border='2px solid red'; } 
	else { prof+=1; document.getElementById('form_name').style.border='2px solid #00ED96'; }
	if (y.length<6 || y.length>14 || document.forms['form']['form_phone'].value=='Phone'){ document.getElementById('form_phone').style.border='2px solid red'; }
	else if (!pattern2.test(document.getElementById('form_phone').value)) { document.getElementById('form_phone').style.border='2px solid red'; } 
	else { prof+=1; document.getElementById('form_phone').style.border='2px solid #00ED96';}
	if (prof!=2){ return false } else { document.getElementById('submit').setAttribute('value', 'Success'); return false }
}

$(document).ready(function() {
	
	$("#slider").slider({
		range: true,
		values: [ 20, 80 ]
	});
	
	var s2s=0,slide_l,wides=0,slide_w,current,tempo,d = new Date(), curent_temp=6, temp, sub_suber_h=$(".sub_suber").outerHeight(), sub_h, sub_n=0;
	
	//функции для выпадающего меню
	$(".sub_punkt_hidder").each(function(){ 
		$(this).children('.sub_suber').children('span').each(function(){ sub_n+=parseInt($(this).text()); });
		$(this).children('.sub_punkt').children('span').text(sub_n);
		sub_n=0;
	});
	
	$(".sub_punkt_hidder").click(function() {  
		$(".sub_punkt_hidder").each(function(){ $(this).css("height","40px"); });
		sub_h=$(this).children('.sub_suber').length*sub_suber_h;
		$(this).css("height",sub_h+40+"px");
	});
	
	//перевод цельсия в фаренгейты x=x*1.8+32. По дефолту температуру указал в перечне переменных curent_temp=6
	$(".curent_weather span").text(curent_temp+"°");
	temp=parseInt($(".curent_weather span").text());
	$("#temp span").click(function() {
		if (!$(this).hasClass("selected_t")) { 
		if ($(this).text().indexOf("F")!=-1) { temp=temp*1.8+32;  $(".curent_weather span").text(temp.toFixed()+"°").animate(300); $("#temp span").removeClass('selected_t'); $(this).addClass('selected_t'); }
		else { $(".curent_weather span").text(curent_temp+"°").animate(300); temp=curent_temp; $("#temp span").removeClass('selected_t'); $(this).addClass('selected_t'); }
		} 
	});
	
	//вписывает в календарь дату и находит число. Полностью календарь не реализовывал
	$('#month h3').text(d.toDateString());
	$('td').eq(d.getDate()-1).append('<div id="selected_d"></div>');
	
	//слайдер универсальный
	slide_l=$('#img_inner img').length;
	for (var i=1;i<=slide_l;i++) {$('#selector').append('<div class="select_slide"></div>');}
	slide_w=$('#img_inner img').width();
	function clear_num() { $('.select_slide').each(function() { $(this).removeClass('selected_item'); }); }
	clear_num(); $(".select_slide:first").addClass('selected_item');
  
	$(".select_slide").click(function() {
		clear_num();
		s2s=$(this).index();
		wides=slide_w*s2s*-1;
		$("#img_inner").css({"margin-left":wides});
		$(this).addClass('selected_item');
	});

	$("#right_b").click(function() {
		clear_num();
		s2s=s2s+1;
		$(".select_slide").eq(s2s).addClass('selected_item');
		wides=slide_w*s2s*-1;
		if(s2s>=slide_l){
			s2s=0;
			wides=0;
			$(".select_slide").eq(s2s).addClass('selected_item');
			$("#img_inner").css({"margin-left":wides});}
		else {
				$("#img_inner").css({"margin-left":wides});
		}
	}); 
	
	$("#left_b").click(function() {
		clear_num();
		s2s=s2s-1;
		$(".select_slide").eq(s2s).addClass('selected_item');
		wides=slide_w*s2s*-1;
		if(s2s<0){
			s2s=slide_l-1;
			wides=slide_w*s2s*-1;
			$("#img_inner").css({"margin-left":wides});}
		else {
		$("#img_inner").css({"margin-left":wides});
		}
	});
	
	$('.valid').bind('click', function(){
	$(this).css("border","2px solid #00B2B2");
	tempo=$(this).val();
  	if ($(this).val()=='Name' || $(this).val()=='Phone') 
	{ $(this).val(''); }
	});
	$('.valid').blur('click', function(){
	$(this).css("border","2px solid #EEEEEE");
	if ($(this).val()=='') { $(this).val(tempo); } 
	});	
});