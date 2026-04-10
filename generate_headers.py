import os

BASE = 'C:/Users/jobmu/myproject/cmi-assignment-help/public/cmi-headers'
IMG_BASE = 'file:///c:/Users/jobmu/my-skills/data/input/cipd_blog_images'
IMGS = ['Screenshot_1.png','Screenshot_3.png','Screenshot_4.png','Screenshot_5.png','Screenshot_6.png','Screenshot_7.png','Screenshot_8.png']
COLOR = '#1a2e4a'

pages = [
    ('cmi-home-header.html',                                                   'CMI ASSIGNMENT',    'HELP',                        'Expert Support for All Levels',               0, 3),
    ('cmi-cmi-level-3-assignment-help-header.html',                            'CMI LEVEL 3',       'ASSIGNMENT HELP',             'First Line Management',                       1, 4),
    ('cmi-cmi-level-4-assignment-help-header.html',                            'CMI LEVEL 4',       'ASSIGNMENT HELP',             'Management and Leadership',                   2, 5),
    ('cmi-cmi-level-5-assignment-help-header.html',                            'CMI LEVEL 5',       'ASSIGNMENT HELP',             'Management and Leadership Diploma',           3, 6),
    ('cmi-cmi-level-6-assignment-help-header.html',                            'CMI LEVEL 6',       'ASSIGNMENT HELP',             'Professional Management and Leadership',      4, 0),
    ('cmi-cmi-level-7-assignment-help-header.html',                            'CMI LEVEL 7',       'ASSIGNMENT HELP',             'Strategic Management and Leadership',         5, 1),
    ('cmi-cmi-assignment-writing-service-header.html',                         'CMI ASSIGNMENT',    'WRITING SERVICE',             'Professional UK Writers, All Levels',         6, 2),
    ('cmi-cmi-assignment-tutoring-header.html',                                'CMI ASSIGNMENT',    'TUTORING',                    'Expert Guidance for Every Unit',              0, 4),
    ('cmi-cmi-coursework-help-header.html',                                    'CMI COURSEWORK',    'HELP',                        'All Units, All Levels Covered',               1, 5),
    ('cmi-cmi-essay-writing-help-header.html',                                 'CMI ESSAY',         'WRITING HELP',                'Command Verb Compliant Essays',               2, 6),
    ('cmi-cmi-report-writing-help-header.html',                                'CMI REPORT',        'WRITING HELP',                'Professional Management Reports',             3, 0),
    ('cmi-cmi-homework-help-header.html',                                      'CMI HOMEWORK',      'HELP',                        'Expert Support for Every CMI Task',           4, 1),
    ('cmi-cmi-assignment-answers-header.html',                                 'CMI ASSIGNMENT',    'ANSWERS',                     'Professional Written Responses',              5, 2),
    ('cmi-cmi-assignment-examples-header.html',                                'CMI ASSIGNMENT',    'EXAMPLES',                    'Real Samples Across All Levels',              6, 3),
    ('cmi-cmi-assignment-help-online-header.html',                             'CMI ASSIGNMENT',    'HELP ONLINE',                 'Remote Expert Support, UK Writers',           0, 5),
    ('cmi-cheap-cmi-assignment-help-header.html',                              'AFFORDABLE CMI',    'ASSIGNMENT HELP',             'Competitive UK Pricing',                      1, 6),
    ('cmi-pay-someone-to-do-my-cmi-assignment-header.html',                    'PAY SOMEONE',       'TO DO MY CMI ASSIGNMENT',     'Trusted UK Writers, All Levels',              2, 4),
    ('cmi-cmi-level-5-unit-501-principles-management-leadership-header.html',  'CMI UNIT 501',      'PRINCIPLES OF MANAGEMENT',    'Level 5 Assignment Help',                     3, 1),
    ('cmi-cmi-level-5-unit-502-developing-managing-leading-teams-header.html', 'CMI UNIT 502',      'LEADING TEAMS',               'Level 5 Assignment Help',                     4, 2),
    ('cmi-cmi-level-5-unit-503-managing-leading-teams-success-header.html',    'CMI UNIT 503',      'MANAGING TEAMS',              'Level 5 Assignment Help',                     5, 3),
    ('cmi-cmi-level-5-unit-504-managing-performance-header.html',              'CMI UNIT 504',      'MANAGING PERFORMANCE',        'Level 5 Assignment Help',                     6, 4),
    ('cmi-cmi-level-5-unit-506-managing-resources-finance-header.html',        'CMI UNIT 506',      'MANAGING RESOURCES',          'Level 5 Assignment Help',                     0, 2),
    ('cmi-cmi-level-5-unit-509-managing-stakeholder-relationships-header.html','CMI UNIT 509',      'STAKEHOLDER RELATIONSHIPS',   'Level 5 Assignment Help',                     1, 3),
    ('cmi-cmi-level-5-unit-512-change-management-header.html',                 'CMI UNIT 512',      'CHANGE MANAGEMENT',           'Level 5 Assignment Help',                     2, 4),
    ('cmi-cmi-level-5-unit-513-managing-projects-header.html',                 'CMI UNIT 513',      'MANAGING PROJECTS',           'Level 5 Assignment Help',                     3, 5),
    ('cmi-cmi-level-7-unit-701-strategic-leadership-header.html',              'CMI UNIT 701',      'STRATEGIC LEADERSHIP',        'Level 7 Assignment Help',                     4, 6),
    ('cmi-cmi-level-7-unit-702-leading-developing-people-header.html',         'CMI UNIT 702',      'LEADING PEOPLE',              'Level 7 Assignment Help',                     5, 0),
    ('cmi-cmi-level-7-unit-704-developing-organisational-strategy-header.html','CMI UNIT 704',      'ORGANISATIONAL STRATEGY',     'Level 7 Assignment Help',                     6, 1),
    ('cmi-cmi-level-7-unit-705-leading-strategic-change-header.html',          'CMI UNIT 705',      'STRATEGIC CHANGE',            'Level 7 Assignment Help',                     0, 3),
    ('cmi-cmi-level-7-unit-706-ethical-leadership-header.html',                'CMI UNIT 706',      'ETHICAL LEADERSHIP',          'Level 7 Assignment Help',                     1, 4),
    ('cmi-cmi-level-7-unit-708-strategic-risk-management-header.html',         'CMI UNIT 708',      'STRATEGIC RISK',              'Level 7 Assignment Help',                     2, 5),
    ('cmi-faq-cmi-level-5-vs-level-7-header.html',                             'CMI LEVEL 5',       'VS LEVEL 7',                  'Which Qualification Is Right for You',        3, 6),
    ('cmi-guides-cmi-assignment-resubmission-header.html',                     'CMI ASSIGNMENT',    'RESUBMISSION',                'How to Pass on Your Second Attempt',          4, 0),
    ('cmi-guides-cmi-assignment-structure-header.html',                        'CMI ASSIGNMENT',    'STRUCTURE GUIDE',             'How to Build Every Section',                  5, 1),
    ('cmi-guides-cmi-command-verbs-explained-header.html',                     'CMI COMMAND',       'VERBS EXPLAINED',             'From Describe to Critically Analyse',         6, 2),
    ('cmi-guides-cmi-qualification-levels-explained-header.html',              'CMI QUALIFICATION', 'LEVELS EXPLAINED',            'Level 3 to Level 7 Guide',                    0, 4),
    ('cmi-guides-nhs-management-cmi-qualifications-header.html',               'NHS MANAGEMENT',    'CMI QUALIFICATIONS',          'Band-by-Band Qualification Guide',            1, 5),
    ('cmi-how-it-works-header.html',                                           'HOW CMI',           'ASSIGNMENT HELP WORKS',       '5 Steps From Brief to Submission',            2, 6),
    ('cmi-our-writers-header.html',                                            'OUR CMI',           'WRITERS AND TUTORS',          'CMI-Qualified UK Professionals',              3, 0),
    ('cmi-privacy-policy-header.html',                                         'PRIVACY',           'POLICY',                      'CMIassignmenthelp.org.uk',                    4, 1),
    ('cmi-reviews-header.html',                                                'CMI ASSIGNMENT',    'HELP REVIEWS',                'What Our Students Say',                       5, 2),
    ('cmi-terms-header.html',                                                  'TERMS OF',          'SERVICE',                     'CMIassignmenthelp.org.uk',                    6, 3),
]

HTML_TEMPLATE = """<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * {{ margin: 0; padding: 0; box-sizing: border-box; }}
  body {{ width: 960px; height: 480px; overflow: hidden; font-family: sans-serif; background: #0a1628; }}
  .header {{ position: relative; width: 960px; height: 480px; overflow: hidden; }}
  .bg, .grid-container {{ position: absolute; inset: 0; }}
  .grid-container {{ display: grid; gap: 2px; background: {color}; grid-template-columns: 1fr 1fr; }}
  .grid-item {{ background-size: cover; background-position: center; filter: brightness(0.58) saturate(0.8); }}
  .color-overlay {{ position: absolute; inset: 0; background: linear-gradient(135deg, rgba(26,46,74,0.42) 0%, rgba(10,22,40,0.32) 100%); z-index: 3; }}
  .border-frame {{ position: absolute; inset: 14px; border: 1px solid rgba(255,255,255,0.10); pointer-events: none; z-index: 5; }}
  .title-panel {{
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    background: rgba(10, 20, 40, 0.88); padding: 32px 52px; backdrop-filter: blur(18px); z-index: 20;
    box-shadow: 0 28px 60px rgba(0,0,0,0.6); width: 82%; max-width: 680px; text-align: center;
    border: 1px solid rgba(255,255,255,0.06); border-top: 3px solid {color};
  }}
  .title-line1 {{ font-family: 'Cinzel', serif; font-size: 13px; font-weight: 400; color: rgba(255,255,255,0.55); text-transform: uppercase; letter-spacing: 0.28em; margin-bottom: 7px; }}
  .title-line2 {{ font-family: 'Cinzel', serif; font-size: 34px; font-weight: 700; color: #ffffff; text-transform: uppercase; letter-spacing: 0.05em; line-height: 1.15; margin-bottom: 14px; }}
  .subtitle {{ font-family: 'Cinzel', serif; font-size: 11.5px; font-weight: 400; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 0.22em; line-height: 1.5; }}
  .logo-area {{ position: absolute; top: 34px; right: 36px; z-index: 25; color: white; text-align: right; }}
  .logo-domain {{ font-family: 'Cinzel', serif; font-size: 8.5px; letter-spacing: 0.16em; color: rgba(255,255,255,0.5); border-bottom: 1px solid rgba(255,255,255,0.15); padding-bottom: 5px; margin-bottom: 3px; text-transform: uppercase; }}
  .logo-tag {{ font-family: sans-serif; font-size: 7.5px; opacity: 0.35; letter-spacing: 0.1em; text-transform: uppercase; }}
  .geo-pattern {{ position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 10; }}
  .accent-bar {{ position: absolute; bottom: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, {color} 0%, rgba(26,46,74,0.0) 100%); z-index: 25; }}
</style>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>
<div class="header">
  <div class="grid-container">
    <div class="grid-item" style="background-image: url('{img_a}')"></div>
    <div class="grid-item" style="background-image: url('{img_b}')"></div>
  </div>
  <div class="color-overlay"></div>
  <svg class="geo-pattern" xmlns="http://www.w3.org/2000/svg">
    <defs><pattern id="geo" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
      <polygon points="15,0 30,15 15,30 0,15" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="0.7"/>
      <circle cx="15" cy="15" r="1.2" fill="rgba(255,255,255,0.035)"/>
    </pattern></defs>
    <rect x="0" y="0" width="960" height="20" fill="url(#geo)"/>
    <rect x="0" y="460" width="960" height="20" fill="url(#geo)"/>
    <rect x="0" y="0" width="20" height="480" fill="url(#geo)"/>
    <rect x="940" y="0" width="20" height="480" fill="url(#geo)"/>
  </svg>
  <div class="border-frame"></div>
  <div class="title-panel">
    <div class="title-line1">{line1}</div>
    <div class="title-line2">{line2}</div>
    <div class="subtitle">{subtitle}</div>
  </div>
  <div class="logo-area">
    <div class="logo-domain">CMIassignmenthelp</div>
    <div class="logo-tag">.org.uk</div>
  </div>
  <div class="accent-bar"></div>
</div>
</body>
</html>"""

count = 0
for p in pages:
    fname, line1, line2, subtitle, ia, ib = p
    html = HTML_TEMPLATE.format(
        color=COLOR,
        img_a=IMG_BASE + '/' + IMGS[ia],
        img_b=IMG_BASE + '/' + IMGS[ib],
        line1=line1,
        line2=line2,
        subtitle=subtitle,
    )
    out = os.path.join(BASE, fname)
    with open(out, 'w', encoding='utf-8') as f:
        f.write(html)
    count += 1

print(f'Generated {count} HTML header files')
