//JavaScript for disabling form submissions if there are invalid fields
								(function() {
									'use strict';
									window.addEventListener('load', function() {
										// Fetch all the forms we want to apply custom Bootstrap validation styles to
										var forms = document.getElementsByClassName('needs-validation');
										// Loop over them and prevent submission
										var validation = Array.prototype.filter.call(forms, function(form) {
											form.addEventListener('submit', function(event) {
												if (form.checkValidity() === false) {
													event.preventDefault();
													event.stopPropagation();
												}
												form.classList.add('was-validated');
											}, false);
										});
									}, false);
								})();

//unhide send button for email submission
var fields = "#fn2, #ln2, #pn2, #ea2, #add2, #bd2, #message2, #captcha2";

$(fields).on('change', function() {
    if (allFilled()) {
        $('#sendMail').removeAttr('disabled');
			alert('allFilled triggered')
    } else {
        $('#sendMail').attr('disabled', 'disabled');
    }
});
function checkEmpty(){
	//alert('checkEmpty was triggered')
	var filled = true;
	$(fields).each(function() {
		if ($(this).val() == '') {
			filled = false;
		}
	});
	return filled;
}
// check fields for empty
function check4empty() {
	//alert('check4Empty was triggered')
	var count = 0;
	var fields = $(".cbe")

	.find("input, textarea").serializeArray();
	
	$.each(fields, function(i, field) {
		if(count<10){
			if (!field.value){
				//alert('check4empty if was triggered at iteration value' + ' '+i)
				alert(field.name + ' is required');				
			}
			else if(field.value){
				//alert('check4empty else was triggered')
				count++;
				//alert(count +' '+ 'field(s) out of 9 are good');
				
				if(count==9){
					alert('form checks out - will submit now');
					document.getElementById('mailOut').submit();			
				}
			}
		}
	});
}

//Populate submitted inputs on labels in right container
function popForm() {
	// Get Data form Iframes
  var ifr_add = document.getElementById("add_ifr");
	var ifr_cap = document.getElementById("captcha_ifr");
  // Populate Labels
  var address = ifr_add.contentWindow.document.getElementById("pac-input").value;
	var zipCode = ifr_add.contentWindow.document.getElementById("postal_code").value;
  var cap = ifr_cap.contentWindow.document.getElementById("puzz").value;
  
  document.getElementById("fn").innerHTML = document.getElementById("FirstName").value;
	document.getElementById("fn2").value = document.getElementById("FirstName").value;
  document.getElementById("ln").innerHTML = document.getElementById("LastName").value;
	document.getElementById("ln2").value = document.getElementById("LastName").value;
  document.getElementById("ea").innerHTML = document.getElementById("Email").value;
	document.getElementById("ea2").value = document.getElementById("Email").value;
  document.getElementById("pn").innerHTML = document.getElementById("PhoneNumber").value;
	document.getElementById("pn2").value = document.getElementById("PhoneNumber").value;
  document.getElementById("add").innerHTML = address; 
	document.getElementById("add2").value = address;
	document.getElementById("zip").innerHTML = zipCode; 
	document.getElementById("zip2").value = zipCode;
  document.getElementById("bd").innerHTML = document.getElementById("datepicker").value;
	document.getElementById("bd2").value = document.getElementById("datepicker").value;
  document.getElementById("captcha").innerHTML = cap;
	document.getElementById("captcha2").value = cap; 
  document.getElementById("message").innerHTML = document.getElementById("textarea").value;
	document.getElementById("message2").value = document.getElementById("textarea").value;
}
// datepicker function
$('#datepicker').datepicker({endDate: "today"});
$('#datepicker').on('changeDate', function() {
  $('#date').val(
        $('#datepicker').datepicker('getFormattedDate')
    );   
});
// Input-mask for phone number




