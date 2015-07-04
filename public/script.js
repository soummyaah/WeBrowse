var $nav = $('.navbar');
// var iframe= document.getElementById('xbox');
// var idoc= iframe.contentDocument || iframe.contentWindow.document; // ie compatibility




// var iframeShift = function(){

//     var htNavBar = $nav.height();
//     var delta  =  (htNavBar + $nav.offset().top);
//     console.log(htNavBar + ' -- margin : ' + $('.xbox').offset().top);
//     $('.xbox').css('margin-top',''+ delta +'px');
// }
var isChatOpen = 1

$(document).ready(function(){
    $('#live-chat header.chhh').on('click', function() {
    $('.chat.chhh').slideToggle(300, 'swing');
    isChatOpen = (isChatOpen + 1)%2;
    });
    $('#live-chat header.aaaa').on('click', function() {
    $('.chat.aaaa').slideToggle(300, 'swing');
    $('.chat-message-counter.aaaa').fadeToggle(300, 'swing');
});


$(document).ready(function(){
        // window.onkeyup = function(e) {
        idoc.onkeyup = function(e) {
        var key = e.keyCode ? e.keyCode : e.which;

        if (key == 72) {
        
          getMeHi();
        }
        }
});


function makeEditableAndHighlight(colour) {

    var range, sel = idoc.getSelection();
    if (sel.rangeCount && sel.getRangeAt) {
        range = sel.getRangeAt(0);
    }
    idoc.designMode = "on";
    if (range) {
        sel.removeAllRanges();
        sel.addRange(range);
    }
    console.log(range);
    // Use HiliteColor since some browsers apply BackColor to the whole block
    if (!idoc.execCommand("HiliteColor", false, colour)) {
        idoc.execCommand("BackColor", false, colour);
    }
    idoc.designMode = "off";
}

function highlightMe() {
    var range;
    var colour = '#ff5';
    if (idoc.getSelection) {
        // IE9 and non-IE
        try {
            if (!idoc.execCommand("BackColor", false, colour)) {
                makeEditableAndHighlight(colour);
            }
        } catch (ex) {
            makeEditableAndHighlight(colour)
        }
    } else if (idoc.selection && idoc.selection.createRange) {
        // IE <= 8 case
        range = idoc.selection.createRange();
        console.log(range);
        range.execCommand("BackColor", false, colour);
    }
}


    // $('.chat.chhh').slideToggle(30, 'swing');

        //Firefox
//      $(window).bind('DOMMouseScroll', function(e){
//          if(e.originalEvent.detail > 0) {
//              //scroll down
//              console.log('Down');
//              hideNavBar();
//          }else {
//              //scroll up
// //             console.log('Up');
//          }

//          //prevent page fom scrolling
//          return false;
//      });

//      //IE, Opera, Safari
//      $(window).bind('mousewheel', function(e){
//          if(e.originalEvent.wheelDelta < 0) {
//              //scroll down
//              console.log('Down');
//              hideNavBar();
//          }else {
//              //scroll up
// //             console.log('Up');
//          }

//          //prevent page fom scrolling
//          return false;
//      });
    
    // iframeShift();
    // $nav.hover(function(){
    //     $nav.css('top','0px');
    //     iframeShift();
    // },function(){

    //     $nav.css('top','-30px');
    //     iframeShift();
    // });
    
    
    
    
//      $("#my-iframe").bind("load",function(){
//        $(this).contents().find("[tokenid=" + token + "]").html();
//    });
    
    // var bodyIframe = $('.xbox').contents().find('body');
    // console.log(bodyIframe.scrollTop());
});

var hideNavBar = function(){
    $nav.css('top','-30px');
    iframeShift();
}