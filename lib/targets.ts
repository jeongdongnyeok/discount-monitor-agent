export interface Rule {
  type: 'element_exists' | 'price_below';
  value?: number;
}

export interface Target {
  name: string;
  url: string;
  selector: string;
  rule: Rule;
}

const targetUrl = process.env.TARGET_URL ?? 'https://www.zara.com/kr/ko/search?searchTerm=AARON%20LEVINE&section=MAN';

export const targets: Target[] = [
  {
    name: 'ZARA search',
    url: targetUrl,
    selector: 'del',
    rule: { type: 'element_exists' },
  },
];
