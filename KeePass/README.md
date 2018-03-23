# Background
My friend uses [KeePass](https://keepass.info/) as a password manager and unfortunately forgot the master password.  Normally it's a [lost cause](https://superuser.com/a/80380) to brute force however my friend believed they remembered a good chunk of the password.  Instead of resetting a multitiude of passwords we decided to try our hand at cracking the vault.  This is our attempt.

# Basic Crack
Our first step was to successfully crack a simple vault. If this was possible we had promise in cracking the real thing.

### Setup Vault
We visited [KeePass downloads](https://keepass.info/download.html) and installed KeePass version 2.38.  
We then created a basic database with a password from [pwqgen](https://pwqgen.herokuapp.com/)
```
Saudi7settle+Strap
```

![alt text](test/test.png)

And called it test.kbdx.

### Setup Crack
We now have our vault but still need (1) to convert it into a crackable hash and (2) a password list.

* Hash

We grabbed [HarmJ0y's keepass2john.py](https://github.com/spencermwoo/Cracking/blob/master/KeePass/keepass2john.py) and used it to generate a crackable hash from our test.kbdx vault, saving the hash as test.hash.

```$ py keepass2john.py test.kbdx```

```test:$keepass$*2*60000*222*a339edcdaf7d1216d4016b5d80c7e5560e1278f54c963d78cec26c8f388b87ec*f552cf7fd8209a99cdbc957bca9eda067c83d5c8f6bdcd810eb35628661dffa8*4cd47adb5446f6c95eebed4c34128f19*0fab1f230bf8b5b3c32ba5c33ec3cd2501c41dc7d07504651393c596d27f7357*4c7de0a343dfcac9cd62fdec0eb1b4ecc75366f750b0311d3729f4de004f6e91```

* Wordlist

We grabbed a wordlist from [berzerk0's Probable-Wordlists](https://github.com/berzerk0/Probable-Wordlists/blob/master/Real-Passwords/Top207-probable-v2.txt) and [added our password](https://github.com/spencermwoo/Cracking/blob/master/KeePass/wordlists/Top207-probable-v2.txt#L203) near the end.


### Running Hashcat

Now we ostensbily have a hash file that is compatible with hashcat and should be cracked by our wordlist.

We looked up the [types of hashes](https://hashcat.net/wiki/doku.php?id=example_hashes) that hashcat can handle and found the Keepass 2 section, specifically 13400 Keepass 2 AES / with keyfile.  We modified our test.hash (removing the "test" database reference in the beginning) to conform our hash to the provided example of a valid 13400 hash.

* Hash
```$keepass$*2*60000*222*a339edcdaf7d1216d4016b5d80c7e5560e1278f54c963d78cec26c8f388b87ec*f552cf7fd8209a99cdbc957bca9eda067c83d5c8f6bdcd810eb35628661dffa8*4cd47adb5446f6c95eebed4c34128f19*0fab1f230bf8b5b3c32ba5c33ec3cd2501c41dc7d07504651393c596d27f7357*4c7de0a343dfcac9cd62fdec0eb1b4ecc75366f750b0311d3729f4de004f6e91```

* Example Hash
```$keepass$*2*6000*222*15b6b685bae998f2f608c909dc554e514f2843fbac3c7c16ea3600cc0de30212*c417098b445cfc7a87d56ba17200836f30208d38f75a4169c0280bab3b10ca2a*0d15a81eadccc58b1d3942090cd0ba66*57c4aa5ac7295a97da10f8b2f2d2bfd7a98b0faf75396bc1b55164a1e1dc7e52*2b822bb7e7d060bb42324459cb24df4d3ecd66dc5fc627ac50bf2d7c4255e4f8*1*64*aaf72933951a03351e032b382232bcafbeeabc9bc8e6988b18407bc5b8f0e3cc```

We ran [hashcat](https://hashcat.net/hashcat/) on our hash file with our dictionary.

```$ ./hashcat64.exe -m 13400 test.hash Top207-probable-v2.txt```

Success!

![alt text](test/test_success.png)

We've successfully put the pieces together to crack a basic .kbdx file!


# Real Crack

It turns out the major pieces to crack a KeePass database are having a hash from our .kbdx file and a proper wordlist.  We already have my friend's .kbdx file so the only thing remaining is generating a proper wordlist.  Our remaining questions were 

* What's the best way to generate our wordlist?
* How does keepass2john.py work?
* Does an increased hash number change the process?
* Any other modifications to our basic crack for our real-world crack attempt?