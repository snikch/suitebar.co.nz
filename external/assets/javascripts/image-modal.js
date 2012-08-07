var ImageModal = function(image){
	var overlay = $('<div class="modal-overlay" />'), img = new Image, loading = $('<h1>Loading</h1>');

	$('body').prepend(overlay);
	overlay.append(loading);

	loading.css({ color: "#fff", textAlign: "center", marginTop: $(window).height()/2 })
	img.onload = function(){
		$img = $(img)
		
		loading.remove();
		overlay.append($img);
		$img.css({ position: 'absolute', display: "block", left: '50%', top: '50%', marginTop: (-1*($img.height()/2)) + "px", marginLeft: (-1*($img.width()/2)) + "px"  })
	
		$img.click(close);
	}
	img.src = image;

	var close = function(){ overlay.remove() }
	overlay.click(close);

}
