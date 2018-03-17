from string import digits, ascii_letters
import itertools
import os
import re, requests

_ALPHABET = digits + ascii_letters + "!@#$%^&*()"

_FRONT = "front"
_MIDDLE = "middle"
_END = "end"

filepath = os.path.join(os.getcwd())
filename = "pwlist.txt"

def generate():
	content = _FRONT + _MIDDLE + _END
	write_file(filepath, filename, content)

#TODO
def brute_array(alphabet, num_tokens):
	ret = []
	# for i in range(0, num_tokens):


def write_file(path, name, content):
	try:
		with open(os.path.join(path, name),"w", encoding="UTF-8") as file:
			file.write(content)

		return True
	except IOError:
		return False

generate()