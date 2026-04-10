import glob
import os

CONTENT_DIR = 'C:/Users/jobmu/myproject/cmi-assignment-help/src/content/pages'

files = sorted(glob.glob(os.path.join(CONTENT_DIR, '*.md')))
total_files = 0
total_fixes = 0

for path in files:
    with open(path, 'rb') as f:
        content = f.read()

    original = content
    # Replace \*\* (literal backslash-star-backslash-star) at end of lines
    count = content.count(b'\\*\\*')
    if count:
        content = content.replace(b'\\*\\*', b'**')
        with open(path, 'wb') as f:
            f.write(content)
        print(f'Fixed {count}x in {os.path.basename(path)}')
        total_files += 1
        total_fixes += count

print(f'\nTotal: {total_fixes} fixes across {total_files} files')
