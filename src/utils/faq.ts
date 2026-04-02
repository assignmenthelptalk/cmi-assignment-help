import { readFileSync } from 'fs';
import { join } from 'path';

export interface FaqItem {
  question: string;
  answer: string;
}

export function extractFaqs(slug: string): FaqItem[] {
  const filePath = join(process.cwd(), 'src', 'content', 'pages', `${slug}.md`);
  let content: string;
  try {
    content = readFileSync(filePath, 'utf-8');
  } catch {
    return [];
  }

  // Find the FAQ section — no `m` flag so $ matches true end of string
  const faqMatch = content.match(/##\s+FAQ[^\n]*\n([\s\S]+?)(?=\n---\s*\n|\n## (?!FAQ)|$)/);
  if (!faqMatch) return [];

  const faqSection = faqMatch[1];
  const faqs: FaqItem[] = [];

  // Split on bold question lines **Question?**
  const lines = faqSection.split('\n');
  let currentQuestion = '';
  let currentAnswer: string[] = [];

  function flush() {
    if (currentQuestion && currentAnswer.length > 0) {
      const answer = currentAnswer
        .join(' ')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // strip markdown links
        .replace(/\*\*/g, '')
        .trim();
      if (answer) {
        faqs.push({ question: currentQuestion, answer });
      }
    }
  }

  for (const line of lines) {
    const questionMatch = line.match(/^\*\*(.+\?)\*\*\s*$/);
    if (questionMatch) {
      flush();
      currentQuestion = questionMatch[1].trim();
      currentAnswer = [];
    } else if (currentQuestion && line.trim() && !line.startsWith('#')) {
      currentAnswer.push(line.trim());
    }
  }
  flush();

  return faqs;
}

export function buildFaqSchema(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
