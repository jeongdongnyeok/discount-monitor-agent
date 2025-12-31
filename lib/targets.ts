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
    name: 'Example product',
    url: 'https://example.com/product',
    selector: '.price',
    rule: { type: 'price_below', value: 10000 },
  },
];
