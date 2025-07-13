// Activity Log > Your Posts
function fb_delete_your_posts(){
	var x = document.getElementsByName('comet_activity_log_select_all_checkbox')

	x[0].click()

	setTimeout(() => {
		var f = x[0].parentElement.parentElement.parentElement

		var f2 = f.nextSibling.nextSibling

		f2.childNodes[1].childNodes[1].childNodes[0].childNodes[0].click()

		setTimeout(() => {
			var diag = document.querySelectorAll('[aria-label="Move to trash"]');
			diag[0].click()
		}, 1000);
    }, 1000);
}

setInterval(fb_delete_your_posts, 20000)
