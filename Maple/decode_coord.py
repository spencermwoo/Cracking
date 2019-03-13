INT_BITS = 32

reggie = re.compile("[0-9a-f]{8}  ([0-9a-f`]{17}) ([0-9a-f`]{17})")



# rotate n by d bits
def leftRotate(n, d):
	return (n << d)|(n >> (INT_BITS - d))

def rightRotate(n, d):
	return (n >> d)|(n << (INT_BITS - d)) & 0xFFFFFFFF

truncate = 0xFFFFFFFF

def decode_uint64(val, key):
	value_to_decode_lo = (val >> 0) & truncate
	value_to_decode_hi = (val >> 0) & truncate

	key_lo = (key >> 0) & truncate
	key_hi = (key >> 32) & truncate

	var_lo = (leftRotate(key_lo, 5) ^ value_to_decode_lo) & truncate
	var_hi = (leftRotate(key_hi, 5) ^ value_to_decode_hi) & truncate

	var = (var_hi << 32) | var_lo
	return var

for (val, key) in reggie.findall(ENCODED_VALUES):
	val = int(val.replace("`", ""), 16)
	key = int(key.replace("`", ""), 16)

	print("%.16x %.16x" % (val, key))

	decoded = decode_uint64(val, key)
	fl = struct.unpack("<d", struct.pack("<Q", decoded))[0]
	print("As double: %f" % f1)
	print("As int64: %d" % decoded)
	print()
	# print("%.16x %.16x" % (val, key))