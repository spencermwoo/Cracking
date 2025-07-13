// Activity Log
function activity_log_delete(){
	document.querySelectorAll('[aria-label="Action options"]')[0].click();

	setTimeout(() => {
		document.querySelectorAll('[aria-hidden="false"]')[3].childNodes[0].children[0].children[0].children[0].click();

		setTimeout(() => {
			document.querySelectorAll('[aria-label="Delete"]')[0].click();
		}, 1000);
	}, 1000);
}

setInterval(activity_log_delete, 3000)
