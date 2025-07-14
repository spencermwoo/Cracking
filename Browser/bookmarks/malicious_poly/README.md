```
curl -L -H "Referer: https://polymarket.com/" https://polynews.blog/\?news\=ldq7xkm29e1b
```

This website in the wild attempts to trick users into executing a malicious bookmark.  Similiar to Chrome Extension vulnerabilities, bookmarks running locally bypass basic browser protections.

When executed it does basic clickjacking and GUI automation sequences to execute the Polymarket GUI withdraw functionality to move the currently logged-in/session/authenticated Polymarket user's funds to the attacker's address.