import { test, expect } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';
import { faker } from '@faker-js/faker';

test.describe('check event in Datalayer', () => {
    test('event should fire after fill email input and press sign up button', async ({
        page,
        baseURL,
    }) => {
        await page.context().addCookies([
            {
                name: 'OptanonAlertBoxClosed',
                value: new Date().toISOString(),
                url: baseURL,
            },
        ]);

        await page.goto('/', { waitUntil: 'domcontentloaded' });

        const [newsSection] = await page
            .locator('//footer//div[contains(@Class, "subscribeSection")]')
            .all();
        await newsSection.scrollIntoViewIfNeeded();
        await newsSection.locator('//input').fill(faker.internet.email());
        await newsSection.locator('//button').click();

        const dataLayer = new DataLayer(page);
        const expectedEvent = {
            event: 'GeneralInteraction',
            eventCategory: 'Footer - D',
            eventAction: 'Newsletter Subscription',
            eventLabel: 'Success',
        };
        const [event] = await dataLayer.waitForDataLayer(expectedEvent);

        expect(event).toStrictEqual(expectedEvent);
    });
});
