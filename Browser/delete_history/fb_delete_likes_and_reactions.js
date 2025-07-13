// Activity Log > Interactions > Likes and reactions
function fb_delete_likes_and_reactions(){
	document.querySelectorAll('[aria-label="Action options"]')[0].click();

	setTimeout(() => {
		document.querySelectorAll('[aria-hidden="false"]')[3].childNodes[0].children[0].children[0].children[0].click();
	}, 100);
}

setInterval(fb_delete_likes_and_reactions, 1000)
