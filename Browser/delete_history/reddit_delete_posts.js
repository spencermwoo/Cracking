// https://www.reddit.com/user/<username>/
let interval = setInterval(() => {
    let deleteButtons = $('a.togglebutton[data-event-action="delete"]');
    if (deleteButtons.length === 0) {
        location.reload()
    } else {
        deleteButtons[0].click();
        setTimeout(() => {
            $('span.option.error.active > a.yes').click();
        }, 300);
    }
}, 1000);
