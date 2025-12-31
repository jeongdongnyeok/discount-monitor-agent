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

export const targets: Target[] = [
  {
    name: 'ZARA AARON LEVINE search',
    url: 'https://www.zara.com/kr/ko/search?searchTerm=AARON%20LEVINE&section=MAN',
    selector: 'del',
    rule: { type: 'element_exists' },
  },
];
