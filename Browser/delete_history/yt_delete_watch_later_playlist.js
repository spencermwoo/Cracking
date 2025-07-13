// https://www.youtube.com/playlist?list=WL
function yt_delete_watch_later_playlist_items () {
    video = document.getElementsByTagName('ytd-playlist-video-renderer')[0];

    video.querySelector('#primary button[aria-label="Action menu"]').click();

    var things = document.evaluate(
        '//span[contains(text(),"Remove from")]',
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
    );

    for (var i = 0; i < things.snapshotLength; i++) 
    {
        things.snapshotItem(i).click();
    }
}

setInterval(yt_delete_watch_later_playlist_items, 500)
