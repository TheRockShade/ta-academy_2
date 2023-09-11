import { Component } from '@Core/component';

export class Header extends Component {
    protected LOCATORS = {
        myAccountButton: this.page.locator('//button[contains(*//@class, "myAccountAndOrders")]'),
        myAccountWindow: this.page.locator('//div[contains(@Class, "myAccountAndOrders")]').first(),
        signUp: this.page.locator('//a[contains(., "Create Account")]'),
        myAccount: this.page.locator(
            '//a[contains(., "My Account") and contains(@class, "accountDropdown")]'
        ),
        myPicksButton: this.page.locator('//div[contains(@Class, "myPicks")]//button'),
    };

    public async clickMyPicksButton(): Promise<void> {
        await this.LOCATORS.myPicksButton.click();
    }

    public async hoverMyAccountButton(): Promise<void> {
        await this.LOCATORS.myAccountButton.hover();
    }

    public async clickCreateAccount(): Promise<void> {
        await this.LOCATORS.signUp.click();
    }

    public async clickMyAccount(): Promise<void> {
        await this.LOCATORS.myAccount.click();
    }
}
