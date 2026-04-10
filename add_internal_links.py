"""
Internal linking plan — adds missing links to each content page.
Only adds a link if the target URL is not already present in the file.
Inserts a Related section before the final FAQ block.
"""
import os
import re

BASE = 'C:/Users/jobmu/myproject/cmi-assignment-help/src/content/pages'

# Plan: page_slug → list of (url, anchor_text) to add if missing
PLAN = {
    'cmi-command-verbs-explained': [
        ('/cmi-assignment-writing-service/', 'CMI assignment writing service'),
        ('/cmi-assignment-tutoring/', 'CMI assignment tutoring'),
        ('/guides/cmi-assignment-resubmission/', 'CMI assignment resubmission guide'),
    ],
    'cmi-assignment-structure': [
        ('/cmi-assignment-writing-service/', 'CMI assignment writing service'),
        ('/cmi-assignment-tutoring/', 'CMI assignment tutoring'),
        ('/cmi-report-writing-help/', 'CMI report writing help'),
        ('/cmi-assignment-examples/', 'CMI assignment examples'),
        ('/guides/cmi-assignment-resubmission/', 'CMI assignment resubmission guide'),
    ],
    'cmi-assignment-examples': [
        ('/cmi-level-3-assignment-help/', 'CMI Level 3 assignment help'),
        ('/cmi-level-4-assignment-help/', 'CMI Level 4 assignment help'),
        ('/cmi-level-5-assignment-help/', 'CMI Level 5 assignment help'),
        ('/cmi-level-6-assignment-help/', 'CMI Level 6 assignment help'),
        ('/cmi-level-7-assignment-help/', 'CMI Level 7 assignment help'),
        ('/cmi-assignment-tutoring/', 'CMI assignment tutoring'),
        ('/cmi-assignment-answers/', 'CMI assignment answers'),
        ('/cmi-report-writing-help/', 'CMI report writing help'),
        ('/cmi-essay-writing-help/', 'CMI essay writing help'),
    ],
    'faq-cmi-level-5-vs-level-7': [
        ('/cmi-assignment-tutoring/', 'CMI assignment tutoring'),
        ('/guides/cmi-qualification-levels-explained/', 'CMI qualification levels explained'),
        ('/guides/cmi-command-verbs-explained/', 'CMI command verbs explained'),
    ],
    'cheap-cmi-assignment-help': [
        ('/cmi-assignment-writing-service/', 'CMI assignment writing service'),
        ('/cmi-assignment-tutoring/', 'CMI assignment tutoring'),
        ('/pay-someone-to-do-my-cmi-assignment/', 'pay someone to do your CMI assignment'),
    ],
    'pay-someone-to-do-my-cmi-assignment': [
        ('/cmi-assignment-writing-service/', 'CMI assignment writing service'),
        ('/cheap-cmi-assignment-help/', 'affordable CMI assignment help'),
        ('/cmi-assignment-tutoring/', 'CMI assignment tutoring'),
    ],
    'cmi-essay-writing-help': [
        ('/cmi-level-6-assignment-help/', 'CMI Level 6 assignment help'),
        ('/cmi-level-7-assignment-help/', 'CMI Level 7 assignment help'),
        ('/cmi-assignment-writing-service/', 'CMI assignment writing service'),
        ('/cmi-assignment-tutoring/', 'CMI assignment tutoring'),
        ('/cmi-assignment-examples/', 'CMI assignment examples'),
    ],
    'cmi-report-writing-help': [
        ('/cmi-level-4-assignment-help/', 'CMI Level 4 assignment help'),
        ('/cmi-assignment-writing-service/', 'CMI assignment writing service'),
        ('/cmi-assignment-tutoring/', 'CMI assignment tutoring'),
        ('/cmi-assignment-examples/', 'CMI assignment examples'),
        ('/guides/cmi-assignment-structure/', 'CMI assignment structure guide'),
    ],
    'cmi-assignment-answers': [
        ('/cmi-assignment-tutoring/', 'CMI assignment tutoring'),
        ('/cmi-assignment-examples/', 'CMI assignment examples'),
        ('/guides/cmi-command-verbs-explained/', 'CMI command verbs explained'),
    ],
    'cmi-homework-help': [
        ('/cmi-assignment-answers/', 'CMI assignment answers'),
        ('/cmi-assignment-examples/', 'CMI assignment examples'),
        ('/guides/cmi-command-verbs-explained/', 'CMI command verbs explained'),
    ],
    'cmi-assignment-resubmission': [
        ('/cmi-assignment-examples/', 'CMI assignment examples'),
        ('/guides/cmi-assignment-structure/', 'CMI assignment structure guide'),
        ('/cmi-level-3-assignment-help/', 'CMI Level 3 assignment help'),
        ('/cmi-level-4-assignment-help/', 'CMI Level 4 assignment help'),
        ('/cmi-level-6-assignment-help/', 'CMI Level 6 assignment help'),
    ],
    'cmi-level-5-unit-501': [
        ('/guides/cmi-assignment-resubmission/', 'CMI assignment resubmission guide'),
        ('/cmi-assignment-examples/', 'CMI assignment examples'),
    ],
    'cmi-level-5-unit-506': [
        ('/guides/cmi-command-verbs-explained/', 'CMI command verbs explained'),
        ('/cmi-assignment-writing-service/', 'CMI assignment writing service'),
        ('/cmi-assignment-tutoring/', 'CMI assignment tutoring'),
        ('/guides/cmi-assignment-resubmission/', 'CMI assignment resubmission guide'),
    ],
    'cmi-level-5-unit-509': [
        ('/guides/cmi-assignment-resubmission/', 'CMI assignment resubmission guide'),
        ('/cmi-assignment-examples/', 'CMI assignment examples'),
    ],
    'cmi-level-7-unit-701': [
        ('/guides/cmi-assignment-resubmission/', 'CMI assignment resubmission guide'),
        ('/cmi-assignment-examples/', 'CMI assignment examples'),
    ],
    'cmi-level-7-unit-702': [
        ('/guides/cmi-command-verbs-explained/', 'CMI command verbs explained'),
        ('/faq/cmi-level-5-vs-level-7/', 'CMI Level 5 vs Level 7'),
        ('/guides/cmi-assignment-resubmission/', 'CMI assignment resubmission guide'),
    ],
    'cmi-level-7-unit-704': [
        ('/guides/cmi-command-verbs-explained/', 'CMI command verbs explained'),
        ('/faq/cmi-level-5-vs-level-7/', 'CMI Level 5 vs Level 7'),
        ('/guides/cmi-assignment-resubmission/', 'CMI assignment resubmission guide'),
    ],
    'cmi-level-7-unit-705': [
        ('/guides/cmi-command-verbs-explained/', 'CMI command verbs explained'),
        ('/faq/cmi-level-5-vs-level-7/', 'CMI Level 5 vs Level 7'),
        ('/guides/cmi-assignment-resubmission/', 'CMI assignment resubmission guide'),
    ],
    'cmi-level-7-unit-706': [
        ('/cmi-assignment-writing-service/', 'CMI assignment writing service'),
        ('/cmi-assignment-tutoring/', 'CMI assignment tutoring'),
        ('/guides/cmi-command-verbs-explained/', 'CMI command verbs explained'),
        ('/guides/cmi-assignment-resubmission/', 'CMI assignment resubmission guide'),
    ],
    'nhs-management-cmi-qualifications': [
        ('/guides/cmi-qualification-levels-explained/', 'CMI qualification levels explained'),
        ('/faq/cmi-level-5-vs-level-7/', 'CMI Level 5 vs Level 7'),
    ],
    'cmi-qualification-levels-explained': [
        ('/cmi-assignment-tutoring/', 'CMI assignment tutoring'),
        ('/guides/cmi-assignment-resubmission/', 'CMI assignment resubmission guide'),
        ('/guides/cmi-assignment-structure/', 'CMI assignment structure guide'),
        ('/cmi-homework-help/', 'CMI homework help'),
    ],
    # Level pages — add guide and cross-level links where missing
    'cmi-level-3-assignment-help': [
        ('/guides/cmi-qualification-levels-explained/', 'CMI qualification levels explained'),
        ('/cmi-assignment-examples/', 'CMI assignment examples'),
        ('/guides/cmi-assignment-resubmission/', 'CMI assignment resubmission guide'),
    ],
    'cmi-level-4-assignment-help': [
        ('/guides/cmi-qualification-levels-explained/', 'CMI qualification levels explained'),
        ('/cmi-assignment-examples/', 'CMI assignment examples'),
        ('/guides/cmi-assignment-resubmission/', 'CMI assignment resubmission guide'),
    ],
    'cmi-level-5-assignment-help': [
        ('/guides/cmi-qualification-levels-explained/', 'CMI qualification levels explained'),
        ('/cmi-assignment-examples/', 'CMI assignment examples'),
        ('/guides/cmi-assignment-resubmission/', 'CMI assignment resubmission guide'),
        ('/guides/cmi-assignment-structure/', 'CMI assignment structure guide'),
    ],
    'cmi-level-6-assignment-help': [
        ('/guides/cmi-qualification-levels-explained/', 'CMI qualification levels explained'),
        ('/cmi-assignment-examples/', 'CMI assignment examples'),
        ('/guides/cmi-assignment-resubmission/', 'CMI assignment resubmission guide'),
        ('/faq/cmi-level-5-vs-level-7/', 'CMI Level 5 vs Level 7'),
    ],
    'cmi-level-7-assignment-help': [
        ('/guides/cmi-qualification-levels-explained/', 'CMI qualification levels explained'),
        ('/cmi-assignment-examples/', 'CMI assignment examples'),
        ('/guides/cmi-assignment-resubmission/', 'CMI assignment resubmission guide'),
        ('/guides/cmi-assignment-structure/', 'CMI assignment structure guide'),
    ],
    'cmi-assignment-writing-service': [
        ('/cmi-assignment-examples/', 'CMI assignment examples'),
        ('/guides/cmi-command-verbs-explained/', 'CMI command verbs explained'),
        ('/guides/cmi-assignment-structure/', 'CMI assignment structure guide'),
    ],
    'cmi-assignment-tutoring': [
        ('/cmi-assignment-examples/', 'CMI assignment examples'),
        ('/guides/cmi-assignment-resubmission/', 'CMI assignment resubmission guide'),
    ],
    'cmi-coursework-help': [
        ('/guides/cmi-command-verbs-explained/', 'CMI command verbs explained'),
        ('/cmi-assignment-examples/', 'CMI assignment examples'),
        ('/guides/cmi-assignment-resubmission/', 'CMI assignment resubmission guide'),
    ],
    'cmi-assignment-help-online': [
        ('/guides/cmi-command-verbs-explained/', 'CMI command verbs explained'),
        ('/cmi-assignment-examples/', 'CMI assignment examples'),
    ],
}


def get_existing_links(content):
    """Extract all internal URLs already in the file."""
    return set(re.findall(r'\]\((/[^)]+)\)', content))


def build_related_block(missing_links):
    """Build a markdown related-pages block."""
    lines = ['', '---', '', '## Related Pages', '']
    for url, text in missing_links:
        lines.append(f'- [{text}]({url})')
    lines.append('')
    return '\n'.join(lines)


def find_faq_insert_point(content):
    """Find the position of the last --- before ## FAQ."""
    # Find the FAQ heading
    faq_match = re.search(r'\n---\n\n## FAQ', content)
    if faq_match:
        return faq_match.start()
    # Try variant without preceding ---
    faq_match = re.search(r'\n## FAQ', content)
    if faq_match:
        return faq_match.start()
    # Fall back to end of file (before trailing metadata line)
    last_line_match = re.search(r'\n\n\*[^\n]*\*\s*$', content)
    if last_line_match:
        return last_line_match.start()
    return len(content)


def check_existing_related(content):
    """Check if there's already a ## Related Pages section."""
    return '## Related Pages' in content


total_links_added = 0
files_updated = 0

for slug, link_list in sorted(PLAN.items()):
    path = os.path.join(BASE, slug + '.md')
    if not os.path.exists(path):
        print(f'SKIP (no file): {slug}.md')
        continue

    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    existing = get_existing_links(content)
    missing = [(url, text) for url, text in link_list if url not in existing]

    if not missing:
        print(f'OK   (no gaps): {slug}.md')
        continue

    if check_existing_related(content):
        # Append to existing Related Pages section
        for url, text in missing:
            content = content.replace(
                '## Related Pages\n',
                f'## Related Pages\n- [{text}]({url})\n',
                1
            )
        action = 'extended'
    else:
        # Insert a new Related Pages block before the FAQ
        insert_pos = find_faq_insert_point(content)
        block = build_related_block(missing)
        content = content[:insert_pos] + block + content[insert_pos:]
        action = 'added section'

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f'DONE ({action}, +{len(missing)} links): {slug}.md')
    total_links_added += len(missing)
    files_updated += 1

print(f'\nTotal: {total_links_added} links added across {files_updated} files')
