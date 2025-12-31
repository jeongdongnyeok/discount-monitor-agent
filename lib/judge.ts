export interface Rule {
  type: 'element_exists' | 'price_below';
  value?: number;
}

export interface Target {
  selector: string;
  rule: Rule;
}

export function judge($: any, target: Target): boolean {
  const el = $(target.selector);

  if (target.rule.type === 'element_exists') {
    return el.length > 0;
  }

  if (target.rule.type === 'price_below') {
    const priceText = el.first().text();
    const price = parseInt(priceText.replace(/[^\d]/g, ''), 10);
    if (target.rule.value === undefined) {
      return false;
    }
    return price <= target.rule.value;
  }

  return false;
}
