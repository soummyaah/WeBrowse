$( document ).ready(function() {
	$("#mainPostButton").click(function(){
		cont = $("#mainTextPostArea").val();
		data = {token:"1234" , place:$("#mainPostButton").attr('pageid') , uid:"1234", text:cont};
		$.post( "/api/post",data, function( res ) {
		  // alert( res );
		  $("#mainTextPostArea").val('');
		});


		// now preview this post
		$('#samplePostModel > .well > .postContent').text(cont);
		$('#samplePostModel > .well').clone().prependTo('#allPosts');




	});
});