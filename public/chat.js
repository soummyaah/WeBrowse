 
  var socket = io();
      var tokenId;
      var userName = prompt("State Thy Name And Ye Shall Pass ");
      var chatMSGCounttt = 0;
      var isChatOpen = 0;
      function startRoom()
      {
        tokenId = $(location).attr('pathname').substring(1);
        socket.emit('initRoom', tokenId );

         socket.on('chat' + tokenId, function(msg){
            $('.chat-history.chaat').append($(getChatMsgElem(msg  )));
 
            var d = $('.chat-history.chaat');
            d.scrollTop(d.prop("scrollHeight"));

          });

           socket.on('notes' + tokenId, function(msg){
            $('.chat-history.notty').append($(getChatMsgElemNOTTYY(msg  )));
 
            var d = $('.chat-history.notty');
            d.scrollTop(d.prop("scrollHeight"));

          });

         socket.on('mouse' + tokenId, function(msg){
           setMouse(msg.x , msg.y , msg.userName);
          });


         socket.on('highlight' + tokenId, function(msg){
           setHighlight(msg.data , getColor(msg.userName)  );
          });

         socket.on('scroll' + tokenId, function(msg){
           setScroll(msg.data  );
          });

          socket.on('link' + tokenId, function(msg){
           setPageUrl(msg.data  );
          });


      }

      function setScroll(scrll)
      {
        $('.xbox').contents().scrollTop(scrll);
      }

      function getColor(str)
      {
          
            var hash = 0;
            if (str.length == 0) return hash;
            for (i = 0; i < str.length; i++) {
                char = str.charCodeAt(i);
                hash = ((hash<<5)-hash)+char;
                hash = hash & hash; // Convert to 32bit integer
            }

            hash = hash.toString();
            hash = '0.' + hash;
            hash = parseFloat(hash);
            
            return  "#"+((1<<24)*hash|0).toString(16);
         
      }



      $(document).ready(function(){
       //alert("hello")
        //setTimeout(function(){ startRoom(); }, 3000);
        startRoom(); 

      });

      $('form.chaat').submit(function(){
        socket.emit('chat' + tokenId, {userName : userName ,  data : $('#qqqq.chaat').val()   });
        $('#qqqq.chaat').val('');
        return false;
      });

      $('form.notty').submit(function(){
        socket.emit('notes' + tokenId, {userName : userName ,  data : $('#qqqq.notty').val()   });
        $('#qqqq.notty').val('');
        return false;
      });

      function onHighlightButtonClick()
      {
        var highlitedObject =  getHighlited();
         console.log(highlitedObject);

        setTimeout(function(){
          socket.emit('highlight' + tokenId, {userName : userName ,  data : highlitedObject });
        } , 3000)

          
      }

      function sendMouseCoordinates(x , y)
      {
          socket.emit('mouse' + tokenId, {userName : userName ,  x:x , y:y   });
      } 

      function sendScrollCoordinates(data)
      {
          socket.emit('scroll' + tokenId, {userName : userName ,  data: data   });
      }

      function sendURLToAll(data)
      {
           socket.emit('link' + tokenId, {userName : userName ,  data: data   });
      }

      var virtualMouses = {};
      function setMouse(x , y , id)
      {
        if(id == userName) return;

        if(!(virtualMouses[id]))
        {
          virtualMouses[id] = $('  <div id="cursor" style = "background-color:red ; top:-100 ; left : -100;width : 10px ; height : 10px ; position:absolute"> </div>');
          color = getColor(id);
          $(virtualMouses[id]).css({'background-color' : color });

          $('body').append( virtualMouses[id]);
        }
        console.log()
        $(virtualMouses[id]).css({top : y , left : x});
      }


      $(document).ready(function(){


   

        //GetCursorPosition
        var currentMousePos = { x: -1, y: -1 };
            $(document).on('mousemove',function(event) {

                currentMousePos.x = event.pageX;
                currentMousePos.y = event.pageY;

               // console.log(currentMousePos.x +','+ currentMousePos.y);
                sendMouseCoordinates(currentMousePos.x , currentMousePos.y)
            });


            document.getElementById('xbox').onload = function() {
              // alert("Alert");

                   var cssLink = document.createElement("link") 
        cssLink.href = "style.css"; 
        cssLink .rel = "stylesheet"; 
        cssLink .type = "text/css"; 
       // document.getElementById('xbox').contents().find('body').appendChild(cssLink);

                  $('.xbox').contents().scroll(function(){
                   var d = ($('.xbox').contents().scrollTop());
                   console.log("hallo");
                   sendScrollCoordinates(d);
                });
                      // put your awesome code here


                      // Get the iframe element we want to track mouse movements on
                      var myIframe = document.getElementById("xbox");

                      // Run it through the function to setup bubbling
                      bubbleIframeMouseMove(myIframe);




              }

          

            




    });





  function getChatMsgElem(msg  )
  {
    var strVar="";
    strVar += "<div class=\"chat-message clearfix\">";
    strVar += "          ";
    strVar += "          <img src=\"1.png\" alt=\"\" width=\"32\" height=\"32\" style='background-color:{{crl}}'  >";
    strVar += "";
    strVar += "          <div class=\"chat-message-content clearfix\">";
    strVar += "            ";
    strVar += "            <span class=\"chat-time\">{{time}}<\/span>";
    strVar += "";
    strVar += "            <h5>{{userName}}<\/h5>";
    strVar += "";
    strVar += "            <p>{{text}}<\/p>";
    strVar += "";
    strVar += "          <\/div>  ";
    strVar += "";
    strVar += "        <\/div> <hr> ";

    var data = {  crl : getColor( msg.userName)  ,    text : msg.data , time : new Date().toLocaleTimeString().toString() , userName : msg.userName };

     return  Mustache.to_html(strVar, data);
   
  }

  function getChatMsgElemNOTTYY(msg  )
  {
    var strVar="";
    strVar += "<div class=\"chat-message clearfix\">";
    strVar += "          ";
    // strVar += "          <img src=\"http:\/\/lorempixum.com\/32\/32\/people\" alt=\"\" width=\"32\" height=\"32\">";
    strVar += "";
    strVar += "          <div class=\"chat-message-content zerMar clearfix\">";
    strVar += "            ";
    strVar += "            <span class=\"chat-time\">{{time}}<\/span>";
    strVar += "";
    strVar += "            <h5>{{userName}}<\/h5>";
    strVar += "";
    strVar += "            <p>{{text}}<\/p>";
    strVar += "";
    strVar += "          <\/div>  ";
    strVar += "";
    strVar += "        <\/div> <hr> ";

    var data = {text : msg.data , time : new Date().toLocaleTimeString().toString() , userName : msg.userName };

     return  Mustache.to_html(strVar, data);
   
  }

  

function bubbleIframeMouseMove(iframe){
    // Save any previous onmousemove handler
    var existingOnMouseMove = iframe.contentWindow.onmousemove;

    // Attach a new onmousemove listener
    iframe.contentWindow.onmousemove = function(e){
        // Fire any existing onmousemove listener 
        if(existingOnMouseMove) existingOnMouseMove(e);

        // Create a new event for the this window
        var evt = document.createEvent("MouseEvents");

        // We'll need this to offset the mouse move appropriately
        var boundingClientRect = iframe.getBoundingClientRect();

        // Initialize the event, copying exiting event values
        // for the most part
        evt.initMouseEvent( 
            "mousemove", 
            true, // bubbles
            false, // not cancelable 
            window,
            e.detail,
            e.screenX,
            e.screenY, 
            e.clientX + boundingClientRect.left, 
            e.clientY + boundingClientRect.top, 
            e.ctrlKey, 
            e.altKey,
            e.shiftKey, 
            e.metaKey,
            e.button, 
            e.onscroll,
            null // no related element
        );

        // Dispatch the mousemove event on the iframe element
        iframe.dispatchEvent(evt);
    };
}






//// GIGHLITE

var iframe= document.getElementById('xbox');
var idoc= iframe.contentDocument || iframe.contentWindow.document; // ie compatibility

function sendSelectedData() {
    var range, localObject;
    if(idoc.getSelection.toString().length == 0 || !idoc.getSelection.toString() || /^\s*$/.test(idoc.getSelection.toString()) || !idoc.getSelection.toString().trim()) {
    } else if (idoc.getSelection) {
        var range = idoc.getSelection();
        if(range!=null){
          var b = [range.anchorNode.parentElement.getAttribute('id'),range.anchorNode.parentElement.getAttribute('class'),range.toString()];    
        }
    }
    return b;
}

function recieveSelectedData(b){
  if(b[0]){
    console.log("ID FOUND");
      $('.xbox').contents().find('#' + b[0]).highlight(b[2]);
  }
  else if(b[1]){
    console.log("CLASS FOUND");
    $('.xbox').contents().find('.' + b[1]).highlight(b[2]);
  }
  else {
    console.log("NO CLASS FOUND NO ID FOUND");
    $('.xbox').contents().find('body').highlight(b[2]);
  }
}












//// URL PARTTYTTTTT
// $('#xbox').onload = function(){




  $('#xbox').contents().find('a').click(function(e) {
      e.preventDefault();
          console.log($(this).attr('href'));
      // aTagRedirect($(this).attr('href'));
      var anchorURL = $(this).attr('href');
      var newurl = '/';
  var r = new RegExp('^(?:[a-z]+:)?//', 'i');
  if(r.test(anchorURL))
  {
    //absolute
    newurl = anchorURL;

  }
  else //relative
  {
    var domainURL = $('#xbox').contents().get(0).location.href;
    var arr = domainURL.split('?url=')[1].split('/');
    arr.pop();
    arr.push(anchorURL);
    newurl = arr.join('/');
    
  }
  console.log(newurl);
  // iFrame.src = newurl;

  sendURLToAll(newurl);
      });


function setPageUrl(url){
  var str = '/pr?url='+url;
  $('#xbox').attr('src',str);
  $inputField = $('#usr');
  $inputField.val(url);
}

// };
 
$inputField = $('#usr');
$inputField.keyup(function(e) {
    var newUserLink = $(this).val();
    if (e.which == 13){
      alert(newUserLink);
        sendURLToAll(newUserLink);
    } 
});