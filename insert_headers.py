import os
import re

CONTENT_DIR = 'C:/Users/jobmu/myproject/cmi-assignment-help/src/content/pages'
WEBP_DIR = '/cmi-headers/webp'  # Public URL path

# Map: content filename (no extension) -> webp filename (no extension)
PAGE_MAP = {
    'homepage':                                     'cmi-home-header',
    'cmi-level-3-assignment-help':                  'cmi-cmi-level-3-assignment-help-header',
    'cmi-level-4-assignment-help':                  'cmi-cmi-level-4-assignment-help-header',
    'cmi-level-5-assignment-help':                  'cmi-cmi-level-5-assignment-help-header',
    'cmi-level-6-assignment-help':                  'cmi-cmi-level-6-assignment-help-header',
    'cmi-level-7-assignment-help':                  'cmi-cmi-level-7-assignment-help-header',
    'cmi-assignment-writing-service':               'cmi-cmi-assignment-writing-service-header',
    'cmi-assignment-tutoring':                      'cmi-cmi-assignment-tutoring-header',
    'cmi-coursework-help':                          'cmi-cmi-coursework-help-header',
    'cmi-essay-writing-help':                       'cmi-cmi-essay-writing-help-header',
    'cmi-report-writing-help':                      'cmi-cmi-report-writing-help-header',
    'cmi-homework-help':                            'cmi-cmi-homework-help-header',
    'cmi-assignment-answers':                       'cmi-cmi-assignment-answers-header',
    'cmi-assignment-examples':                      'cmi-cmi-assignment-examples-header',
    'cmi-assignment-help-online':                   'cmi-cmi-assignment-help-online-header',
    'cheap-cmi-assignment-help':                    'cmi-cheap-cmi-assignment-help-header',
    'pay-someone-to-do-my-cmi-assignment':          'cmi-pay-someone-to-do-my-cmi-assignment-header',
    'cmi-level-5-unit-501':                         'cmi-cmi-level-5-unit-501-principles-management-leadership-header',
    'cmi-level-5-unit-506':                         'cmi-cmi-level-5-unit-506-managing-resources-finance-header',
    'cmi-level-5-unit-509':                         'cmi-cmi-level-5-unit-509-managing-stakeholder-relationships-header',
    'cmi-level-7-unit-701':                         'cmi-cmi-level-7-unit-701-strategic-leadership-header',
    'cmi-level-7-unit-702':                         'cmi-cmi-level-7-unit-702-leading-developing-people-header',
    'cmi-level-7-unit-704':                         'cmi-cmi-level-7-unit-704-developing-organisational-strategy-header',
    'cmi-level-7-unit-705':                         'cmi-cmi-level-7-unit-705-leading-strategic-change-header',
    'cmi-level-7-unit-706':                         'cmi-cmi-level-7-unit-706-ethical-leadership-header',
    'faq-cmi-level-5-vs-level-7':                   'cmi-faq-cmi-level-5-vs-level-7-header',
    'cmi-assignment-resubmission':                  'cmi-guides-cmi-assignment-resubmission-header',
    'cmi-assignment-structure':                     'cmi-guides-cmi-assignment-structure-header',
    'cmi-command-verbs-explained':                  'cmi-guides-cmi-command-verbs-explained-header',
    'cmi-qualification-levels-explained':           'cmi-guides-cmi-qualification-levels-explained-header',
    'nhs-management-cmi-qualifications':            'cmi-guides-nhs-management-cmi-qualifications-header',
}

inserted = 0
skipped = 0
already_has = 0

for slug, webp_stem in PAGE_MAP.items():
    md_path = os.path.join(CONTENT_DIR, slug + '.md')
    if not os.path.exists(md_path):
        print(f'SKIP (no file): {slug}.md')
        skipped += 1
        continue

    with open(md_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip if already has a header image
    if 'cmi-headers/webp' in content:
        print(f'SKIP (already has header): {slug}.md')
        already_has += 1
        continue

    # Find the H1 line
    h1_match = re.search(r'^(# .+)$', content, re.MULTILINE)
    if not h1_match:
        print(f'SKIP (no H1): {slug}.md')
        skipped += 1
        continue

    h1_text = h1_match.group(1)[2:].strip()  # strip "# "
    webp_url = f'{WEBP_DIR}/{webp_stem}.webp'

    img_tag = (
        f'\n<figure style="margin:0 0 2rem 0">\n'
        f'  <img\n'
        f'    src="{webp_url}"\n'
        f'    alt="{h1_text}"\n'
        f'    title="{h1_text}"\n'
        f'    width="960"\n'
        f'    height="480"\n'
        f'    style="width:100%;height:auto;display:block;border-radius:8px;"\n'
        f'    loading="eager"\n'
        f'  />\n'
        f'</figure>'
    )

    # Insert after the H1 line
    new_content = content.replace(h1_match.group(0), h1_match.group(0) + img_tag, 1)

    with open(md_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f'OK: {slug}.md -> {webp_stem}.webp')
    inserted += 1

print(f'\nDone: {inserted} inserted, {already_has} already had header, {skipped} skipped')
