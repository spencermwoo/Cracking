front = "Saudi7se"
#real password is Saudi7settle+Strap, but we don't know that
a = ["7", "t"]
b = ["I", "L", "1", "l", "i"]
c = ["E", "e"]
d = ["?", "!", "+"]
e = ["S", "s"]
f = ["r", "R"]
g = ["a"]
h = ["p", "P"]


langList = [a, a, b, c, d, e, a, f, g, h]
#[a,b,c,d,c,b]

def recursiveGen(currentString="", counter=0):
	if counter == len(langList):
		print front + currentString
		
		return
	else:
		for i in range(0, len(langList[counter])):
			recursiveGen(currentString+ langList[counter][i], counter+1)

recursiveGen()