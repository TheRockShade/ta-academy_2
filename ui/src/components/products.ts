import { Component } from '@Core/component';

import type { Locator } from '@playwright/test';

export class Products extends Component {
    protected LOCATORS = {
        product: this.page.locator('[data-test-name="product"]'),
        footer: this.page.locator('//footer[contains(., "Live Chat" )]'),
    };

    public async scrollToProducts(): Promise<void> {
        await this.locator.scrollIntoViewIfNeeded();
    }

    public async scrollProducts(): Promise<void> {
        await this.LOCATORS.footer.scrollIntoViewIfNeeded();
    }

    public async getProducts(): Promise<Locator[]> {
        return await this.LOCATORS.product.all();
    }

    public async isPickButtonPressed(button: Locator): Promise<boolean> {
        return (await button.getAttribute('aria-pressed')) === 'true';
    }
}
