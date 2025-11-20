import React from 'react';
import ReactDOM from 'react-dom/client';
import { Widget } from './Widget';
import '@radix-ui/themes/styles.css';
import './styles/widget.css';

export interface GrailWidgetOptions {
  shopSlug: string;
  container: string | HTMLElement;
}

export function mountWidget(options: GrailWidgetOptions): void {
  const container =
    typeof options.container === 'string'
      ? document.querySelector(options.container)
      : options.container;

  if (!container) {
    throw new Error('Widget container not found');
  }

  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <Widget shopSlug={options.shopSlug} />
    </React.StrictMode>
  );
}

// Auto-mount if data-grail-widget attribute is present
if (typeof window !== 'undefined') {
  const widgetElements = document.querySelectorAll('[data-grail-widget]');
  widgetElements.forEach(element => {
    const shopSlug = element.getAttribute('data-shop-slug');
    if (shopSlug) {
      mountWidget({
        shopSlug,
        container: element as HTMLElement,
      });
    }
  });
}

export { Widget };
