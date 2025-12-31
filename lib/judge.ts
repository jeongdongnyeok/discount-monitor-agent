export interface Rule {
  type: 'element_exists' | 'price_below';
  value?: number;
}

export interface Target {
  selector: string;
  rule: Rule;
}

export function judge(root: any, target: Target): boolean {
  const elements = root.querySelectorAll(target.selector);

  if (target.rule.type === 'element_exists') {
    return elements.length > 0;
  }

  if (target.rule.type === 'price_below') {
    if (elements.length === 0) {
      return false;
    }
    const priceText = elements[0].text;
    const price = parseInt(priceText.replace(/[^\d]/g, ''), 10);
    if (target.rule.value === undefined) {
      return false;
    }
    return price <= target.rule.value;
  }

  return false;
}
