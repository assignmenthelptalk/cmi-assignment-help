import glob, os

CONTENT_DIR = 'C:/Users/jobmu/myproject/cmi-assignment-help/src/content/pages'
files = sorted(glob.glob(os.path.join(CONTENT_DIR, '*.md')))

pattern = b'\\*\\*'  # literal: backslash asterisk backslash asterisk

for path in files:
    with open(path, 'rb') as f:
        content = f.read()
    count = content.count(pattern)
    if count:
        print(f'{count:3d}  {os.path.basename(path)}')
        # Show first occurrence in context
        idx = content.find(pattern)
        print(f'     Context: {repr(content[max(0,idx-30):idx+30])}')
