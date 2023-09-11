import { test, expect } from '@Test';

test.describe('check item in wishlist', () => {
    test('picked item should be in wishlist', async ({ page, categoryPage, dataLayer }) => {
        await categoryPage.open('sunglasses');

        const [product] = await categoryPage.Products.getProducts();
        const productId = await product.getAttribute('data-test-id');

        const pickButton = product.locator('[aria-label="myPick"]');
        await pickButton.click();

        expect(await categoryPage.Products.isPickButtonPressed(pickButton)).toBe(true);

        const expectedEvent = {
            event: 'CategoryInteraction',
            eventCategory: 'Category - D',
            eventAction: 'Product',
            eventLabel: 'Add to Wishlist',
        };
        const [event] = await dataLayer.waitForDataLayer(expectedEvent);

        expect(event).toStrictEqual(expectedEvent);

        await categoryPage.Header.clickMyPicksButton();

        expect(
            (await categoryPage.MyPicksPopup.getMyPicksResponse()).includes(`"id":${productId}`)
        ).toBe(true);
    });
});
