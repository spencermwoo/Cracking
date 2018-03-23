from string import digits, ascii_letters
import itertools
import os
import re, requests
import time

_ALPHABET = digits + ascii_letters + "!@#$%^&*()"

filepath = os.path.join(os.getcwd())
filename = "pwlist.txt"

def generate():
	write_file(filepath, filename, "", "w")
	content = brute_array(_ALPHABET, 1, "first", -1)

	write_file(filepath, filename, content, "a")

#TODO - can be way better
def brute_array(alphabet, num_tokens, base, index):
	alpha_len = len(alphabet)
	num = alpha_len ** num_tokens
	offset = num_tokens * alpha_len
	
	total_content = base

	count = 0
	pause_count = 1000000000

	for i in range(offset, offset + num):
		total_content += "\n" + base + get_alphabet_string(alphabet, i);	

		count += 1
		if count > pause_count:
			write_file(filepath, filename, total_content, "a")
			time.sleep(5)

			count = 0
			total_content = ""

	return total_content

def get_alphabet_string(alphabet, num):
	alpha_len = len(alphabet)
	
	index = num % alpha_len
	num = (int)(num / alpha_len)
	if(num > 0):
		return alphabet[index] + get_alphabet_string(alphabet, num)
	else:
		return alphabet[index]

def write_file(path, name, content, f_type):
	try:
		with open(os.path.join(path, name), f_type, encoding="UTF-8") as file:
			file.write(content)

		return True
	except IOError:
		return False

# print(brute_array(_ALPHABET, 2, "test", 0))
# print(57/72)
# for i in range(19000, 20000):
# 	print(get_alphabet_string(_ALPHABET, i))
generate()