import { test, expect } from '@Test';

test.describe('check event in Datalayer', () => {
    test('event should fire after fill email input and press sign up button', async ({
        homePage,
        dataLayer,
    }) => {
        await homePage.open();
        await homePage.Newsletter.scrollToSection();
        await homePage.Newsletter.fillEmail();
        await homePage.Newsletter.clickSendButton();

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
