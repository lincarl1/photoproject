
    
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
    var headerPlacement = getDivPlacement('divNavBar');
    $("#header").css({ top: headerPlacement + 'px' });
    
    var contentPlacement = getDivPlacement('header');
    $('#content').css('margin-top',contentPlacement);
}



