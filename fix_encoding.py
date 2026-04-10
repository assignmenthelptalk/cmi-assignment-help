import os
import glob

CONTENT_DIR = 'C:/Users/jobmu/myproject/cmi-assignment-help/src/content/pages'

# Double-encoded UTF-8 byte sequences -> correct Unicode characters
replacements = [
    (b'\xc3\xa2\xc2\x80\xc2\x94', '\u2014'),  # em dash —
    (b'\xc3\xa2\xc2\x80\xc2\x93', '\u2013'),  # en dash –
    (b'\xc3\xa2\xc2\x80\xc2\x99', '\u2019'),  # right single quote '
    (b'\xc3\xa2\xc2\x80\xc2\x98', '\u2018'),  # left single quote '
    (b'\xc3\xa2\xc2\x80\xc2\x9c', '\u201c'),  # left double quote "
    (b'\xc3\xa2\xc2\x80\xc2\x9d', '\u201d'),  # right double quote "
    (b'\xc3\xa2\xc2\x80\xc2\xa2', '\u2022'),  # bullet •
    (b'\xc3\xa2\xc2\x80\xc2\xa6', '\u2026'),  # ellipsis …
]

files = sorted(glob.glob(os.path.join(CONTENT_DIR, '*.md')))
total_fixed = 0

for path in files:
    with open(path, 'rb') as f:
        raw = f.read()

    original = raw
    for bad_bytes, good_char in replacements:
        raw = raw.replace(bad_bytes, good_char.encode('utf-8'))

    if raw != original:
        with open(path, 'wb') as f:
            f.write(raw)
        print(f'Fixed: {os.path.basename(path)}')
        total_fixed += 1

print(f'Total files fixed: {total_fixed}')
