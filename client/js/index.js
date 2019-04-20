window.onload = function() {
    $(window).bind('scroll', update);
    adjustPlacement();
    };



function update(){ 
    var velocity = 0.5;
    var pos = $(window).scrollTop(); 
    $('.module1').each(function() { 
        var $element = $(this);
        // subtract some from the height b/c of the padding
        var height = $element.height()-18;
        $(this).css('backgroundPosition', '50% ' + ((Math.round((height - pos) * velocity))-413) + 'px'); 
    }); 
     $('.module').each(function() { 
        var $element = $(this);
        // subtract some from the height b/c of the padding
        var height = $element.height()-18;
        $(this).css('backgroundPosition', '50% ' + Math.round((height - pos) * velocity) + 'px'); 
    }); 
}

function adjustPlacement() {
    //jQuery
    /*var headerPlacement = getDivPlacement('divNavBar');*/
    /*var headerPlacement = currentDiv('divNavBar');*/
    $("#header").css({ top: headerPlacement + 'px' });
    
    var contentPlacement = getDivPlacement('header');
    /*var contentPlacement = currentDiv('header');*/
    $('#content').css('margin-top',contentPlacement);
}



function currentDiv(n) {
  showDivs(slideIndex = n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" w3-opacity-off", "");
  }
  /*
  x[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " w3-opacity-off";
  */
}