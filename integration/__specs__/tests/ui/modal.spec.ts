import { faker } from '@faker-js/faker';
import { Mock } from '@Core/mock';
import { CartPage } from '@Components/cartPage/cartPage';
import { GetCartItemsMock } from '@Mocks/api/mockio/v1/id/get';
import { waitForDataLayer } from '@Utils/dataLayer';

describe('Add product and compare with data', () => {
    const mock = Mock.getInstance();
    let cartPage: CartPage;

    beforeAll(() => {
        cartPage = new CartPage();
        mock.addMocks(new GetCartItemsMock());
    });

    afterAll(() => {
        cartPage.destroy();
        mock.close();
    });

    const data = {
        name: faker.commerce.product(),
        price: `${faker.number.int({ min: 50, max: 200 })}`,
        quantity: `${faker.number.int({ min: 1, max: 5 })}`,
    };

    test('open modal and add product', async () => {
        await cartPage.fulfill();
        await cartPage.clickModalButton();

        reporter.startStep('FormInteraction event should fire after click modal button');
        expect(await waitForDataLayer({ name: 'FormInteraction' })).toStrictEqual({
            name: 'FormInteraction',
            value: 'Open',
        });
        reporter.endStep();

        const modal = await cartPage.getModal();

        const nameInput = await modal.getNameInput();
        const priceInput = await modal.getPriceInput();
        const quantityInput = await modal.getQuantityInput();

        nameInput.input(data.name);
        priceInput.input(data.price);
        quantityInput.input(data.quantity);

        await modal.clickCreateButton();

        reporter.startStep('Add product event should fire after click create button');
        expect(await waitForDataLayer({ name: `Add item - ${data.name}` })).toStrictEqual({
            name: `Add item - ${data.name}`,
            price: +data.price,
            quantity: +data.quantity,
            value: data.name,
        });
        reporter.endStep();

        const cartList = await cartPage.getCartList();
        const items = await cartList.getCartItems();
        const [item] = items;

        reporter.startStep('Item data should equal data object');
        expect(await item.getName()).toStrictEqual(data.name);
        expect((await item.getPriceForAll()) / (await item.getQuantity())).toStrictEqual(+data.price);
        expect(`${await item.getQuantity()}`).toStrictEqual(data.quantity);
        reporter.endStep();

        await item.delete();

        reporter.startStep('Delete item event should fire after click delete button');
        expect(await waitForDataLayer({ name: `Delete item - ${data.name}` })).toStrictEqual({
            name: `Delete item - ${data.name}`,
            value: data.name,
        });
        reporter.endStep();

        const newCartList = await cartPage.getCartList();
        const newItemsLength = (await newCartList.getCartItems()).length;

        reporter.startStep('New item should be deleted');
        expect(newItemsLength).toBe(3);
        reporter.endStep();

        const forClearCartList = await cartPage.getCartList();
        const forClearCartItems = await forClearCartList.getCartItems();

        for (const [key] of Object.entries(forClearCartItems)) {
            await forClearCartItems[key].delete();
        }

        reporter.startStep('Cart is empty event should fire after clear list');
        expect(await waitForDataLayer({ name: 'Cart is Empty' })).toStrictEqual({
            name: 'Cart is Empty',
            value: 'Quantity of products: 0',
        });
        reporter.endStep();
    });
});
