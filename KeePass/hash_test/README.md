# Hash Crack
When creating the keepass vault one can increase the hash iterations.  This tutorial details cracking a vault with increased hash iterations.

### Testing Hash
We were able to crack a basic vault but will our steps work if we increase the hash iterations?

We create the database using password ```Saudi7settle+Strap``` and increase the iterations.

![alt text](hash_test/hash_test.png)

We run the python script, remove the database name, and save the hash as hash_test.hash

```$ py keepass2john.py hash_test.kdbx```

```$keepass$*2*27648*222*5bad084314051bc38d439d3211317fdba5dca739eac923ccaa2bb21d1de5178f*835ccf2cd3db3874be7d655c1f31887248d2e7025bfd61bb5c19862a0cb0d3d8*9cc0b342fce5cfa55ec830f1443efa69*0fbe057ea7fc655800ab354cbdc3b79eaf1a6eb5fce14312e6ab450bb445d139*f6f984c16ffaedacb2aaedd70c7e54136ccc31fe78bd31c17996e0647453a6ef```

We run hashcat with our same [wordlist](https://github.com/spencermwoo/Cracking/blob/master/KeePass/wordlists/Top207-probable-v2.txt#L203).

```$ ./hashcat64.exe -m 13400 hash_test.hash Top207-probable-v2.txt```

And the list is exhausted.

![alt text](hash_test/failure.png)

What!? Our password is in the wordlist, why isn't it found?!  It seems increasing the hash iterations breaks our use case.  Let's find out what's happening!

### Investigation
Explain intuition.  Hashes (#todo)

We compare the two hashes
* Default
```$keepass$*2*60000*222*a339edcdaf7d1216d4016b5d80c7e5560e1278f54c963d78cec26c8f388b87ec*f552cf7fd8209a99cdbc957bca9eda067c83d5c8f6bdcd810eb35628661dffa8*4cd47adb5446f6c95eebed4c34128f19*0fab1f230bf8b5b3c32ba5c33ec3cd2501c41dc7d07504651393c596d27f7357*4c7de0a343dfcac9cd62fdec0eb1b4ecc75366f750b0311d3729f4de004f6e91```

* Iterations
```$keepass$*2*13056*222*8566bee050e1a69bd90044013c36a76ed0cda2e85133c2f0ea95018cf97a5982*e1bbc858fc6ad4d726e778e1db6dfb6d84143f96be51f387ba89610c4c1cefe7*7ceed46e2420ec4c68a1d6cc8bb872ec*7bc6c7a6398e3d7ad472fc9afedb58578ccf04d9e7d03eda3d20a9d02e1932a2*fbbf4725cf5bc99b928ad2cbddef00d4a20ef4a73bf56ba5a68ba31047ed440b```

We note that the third parameter (asterisk-delimited) has changed and seems to relate to the hash iterations.  This is confirmed when we view the code and see that the third parameter output is [transformRounds](https://github.com/spencermwoo/Cracking/blob/master/KeePass/test/keepass2john.py#L114).  We conjecture that this transform rounds should be our ```17052416``` value from using the 1 Second Delay and our basic crack worked because ```60000``` is the default transformRounds.

We test this hypothesis by manually replacing the transformRounds value with our expected value in our hash file.

```$keepass$*2*17052416*222*5bad084314051bc38d439d3211317fdba5dca739eac923ccaa2bb21d1de5178f*835ccf2cd3db3874be7d655c1f31887248d2e7025bfd61bb5c19862a0cb0d3d8*9cc0b342fce5cfa55ec830f1443efa69*0fbe057ea7fc655800ab354cbdc3b79eaf1a6eb5fce14312e6ab450bb445d139*f6f984c16ffaedacb2aaedd70c7e54136ccc31fe78bd31c17996e0647453a6ef```

We run hashcat again, fingers crossed.

```$ ./hashcat64.exe -m 13400 hash_test.hash Top207-probable-v2.txt```

Hashcat runs for a signficiantly longer time...

![alt text](hash_test/success.png)

Success!


### Debugging
We've now determined that the only issue with our process is that the python script incorrectly calculates the ```transformRounds``` value.  If we can properly calculate this value we can successfully attack the real vault!

We play around with different databases with increased hash sizes and note that everytime the ```transformRounds``` value is different.  This is reassuring because it indaicates that our script knows that the keepass.kdbx file's ```transformRounds``` isn't the default ```60000``` and is trying to calculate the proper value.


We dive into the python program and look at the code, specifically looking at how [transformRounds is calculated](https://github.com/spencermwoo/Cracking/blob/master/KeePass/test/keepass2john.py#L101).

```transformRounds = struct.unpack("H", data[index:index+2])[0]```

We look at [Python's struct](https://docs.python.org/2/library/struct.html#struct.unpack) and specifically that the first parameter is a [format character](https://docs.python.org/2/library/struct.html#format-characters).

We looked at all our transformRounds values (```13056```, ```27088```, etc) and notice they're all lower than the default ```60000```.  Wait.  ```H``` is an unsigned int -- it's too small!

Looking at the [Python format characters](https://docs.python.org/2/library/struct.html#format-characters)

```
H	unsigned short	integer	2	(3)
```

```H``` is an unsigned short which is 2 bytes or 16 bits.  This can only hold values up to 2^16 or ```65536```.  Our value of ```17052416``` is larger than ```65536``` and it turns out that ```17052416 % 65536 = 13056```.  We were overflowing the unsigned short!

```
Q	unsigned long long	integer	8	(2), (3)
```

```Q``` is an unsigned long long which holds 8 bytes or 64 bits.  This can hold values up to 2^64 or ```18446744073709551616```.  Much better!

We update [transformRounds](https://github.com/spencermwoo/Cracking/blob/master/KeePass/hash_test/keepass2john.py#L101) to use ```Q```.

```transformRounds = struct.unpack("Q", data[index:index+8])[0]```

And we also remove the [database print](https://github.com/spencermwoo/Cracking/blob/master/KeePass/hash_test/keepass2john.py#L114) because we can.

```return "$keepass$*2*%s*%s*%s*%s*%s*%s*%s" %(transformRounds, dataStartOffset, masterSeed, transformSeed, initializationVectors, expectedStartBytes, firstEncryptedBytes)```

We run the python file to generate the database hash again

```$keepass$*2*17052416*222*5bad084314051bc38d439d3211317fdba5dca739eac923ccaa2bb21d1de5178f*835ccf2cd3db3874be7d655c1f31887248d2e7025bfd61bb5c19862a0cb0d3d8*9cc0b342fce5cfa55ec830f1443efa69*0fbe057ea7fc655800ab354cbdc3b79eaf1a6eb5fce14312e6ab450bb445d139*f6f984c16ffaedacb2aaedd70c7e54136ccc31fe78bd31c17996e0647453a6ef```

We can produce the correct crackable hash!