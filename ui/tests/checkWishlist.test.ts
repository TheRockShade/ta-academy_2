import { test, expect } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';

test.describe('check item in wishlist', () => {
    test('picked item should be in wishlist', async ({ page, baseURL }) => {
        await page.context().addCookies([
            {
                name: 'OptanonAlertBoxClosed',
                value: new Date().toISOString(),
                url: baseURL,
            },
        ]);

        await page.goto('sunglasses', { waitUntil: 'domcontentloaded' });

        const [product] = await page.locator('[data-test-name="product"]').all();
        const productId = await product.getAttribute('data-test-id');

        const pickButton = product.locator('[aria-label="myPick"]');
        await pickButton.click();

        expect(await pickButton.getAttribute('aria-pressed')).toBe('true');

        const dataLayer = new DataLayer(page);
        const expectedEvent = {
            event: 'CategoryInteraction',
            eventCategory: 'Category - D',
            eventAction: 'Product',
            eventLabel: 'Add to Wishlist',
        };
        const [event] = await dataLayer.waitForDataLayer(expectedEvent);

        expect(event).toStrictEqual(expectedEvent);

        await page.locator('//header//div[contains(@Class, "myPicks")]//button').click();

        const response = await page.waitForResponse(
            (response) => response.url().includes('/ms/elastic') && response.status() === 200
        );

        expect((await response.body()).includes(`"id":${productId}`)).toBe(true);
    });
});
