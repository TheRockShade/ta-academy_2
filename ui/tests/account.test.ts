import { test, expect } from '@Test';
import { faker } from '@faker-js/faker';

test.describe('Do registration and change personal information', () => {
    test('Personal information should be changed', async ({ homePage, accountPage, dataLayer }) => {
        await homePage.open();

        const email = faker.internet.email();
        const userData = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            password: faker.internet.password(),
        };

        await test.step('Event should fire after registration', async () => {
            await homePage.Header.hoverMyAccountButton();
            await homePage.Header.clickCreateAccount();

            await homePage.RegisterPopup.fillInput('email', email);
            await homePage.RegisterPopup.clickSubmitButton();

            for (const [key, value] of Object.entries(userData)) {
                await homePage.RegisterPopup.fillInput(key, value);
            }
            await homePage.RegisterPopup.clickSubmitButton();

            const expectedEvent = {
                event: 'GeneralNonInteraction',
                eventCategory: 'Login',
                eventAction: 'Login Status',
                eventLabel: 'Registered - Email',
            };

            const [event] = await dataLayer.waitForDataLayer(expectedEvent);

            expect(event).toStrictEqual(expectedEvent);
        });

        await test.step('Change information and compare', async () => {
            await homePage.Header.hoverMyAccountButton();
            await homePage.Header.clickMyAccount();
            await accountPage.Account.clickDetailsAnchor();
            await accountPage.Account.clickEditButton();

            const newUserData = {
                firstName: { new: faker.person.firstName(), old: userData.firstName },
                lastName: { new: faker.person.lastName(), old: userData.lastName },
                email: { new: faker.internet.email(), old: email },
            };

            for (const [key, value] of Object.entries(newUserData)) {
                await accountPage.Account.fillInput(key, value.new);
            }

            await accountPage.Account.clickSaveButton();
            await accountPage.Account.clickCloseButton();
            await accountPage.Account.clickDetailsAnchor();
            await accountPage.Account.clickEditButton();

            let isDataChanged = false;

            for (const [key, value] of Object.entries(newUserData)) {
                isDataChanged = value.old !== (await accountPage.Account.getInputValue(key));
            }

            expect(isDataChanged).toBe(true);
        });
    });
});
