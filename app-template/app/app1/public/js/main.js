var  scrollThreshold;

    $( document ).ready(function() {
       
       scrollThreshold = $( "#floatingColl" ).position().top + 20;
         //alert(scrollThreshold);
        $(window).scroll(function(){
            threshold = scrollThreshold;
           if($(window).scrollTop()> threshold)
              // startFloat(); // for now
            else
              stopFloat();

        });
    });

    function startFloat()
    {
        $( "#floatingColl" ).width($( "#floatingColl" ).width());
        $( "#floatingColl" ).height($( "#floatingColl" ).height());
        $( "#floatingColl" ).css( "position", "fixed" );
        $( "#floatingColl" ).css( "top", ($("#main-navbar").height()+15) + "px" );
    }

    function stopFloat()
    {
         
        $( "#floatingColl" ).css( "position", "static " );
      
    }