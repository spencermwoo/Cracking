// Activity Log > Interactions > Your posts on others' timelines
function fb_delete_posts_others_timeline(){
	document.querySelectorAll('[aria-label="Action options"]')[0].click();

	setTimeout(() => {
		document.querySelectorAll('[aria-hidden="false"]')[3].childNodes[0].childNodes[0].childNodes[0].childNodes[1].click()

		setTimeout(() => {
			document.querySelectorAll('[aria-label="Delete"]')[0].click();
			
		}, 100);
	}, 100);
}

setInterval(fb_delete_posts_others_timeline, 1000)
