var body = document.body
var removeLoading = function() {
	setTimeout(function() {
		body.className = body.className.replace(/loading/, '');
	}, 1500);
};
removeLoading();