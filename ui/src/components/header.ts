import { Component } from '@Core/component';

export class Header extends Component {
    protected LOCATORS = {
        myPicksButton: this.page.locator('//div[contains(@Class, "myPicks")]//button'),
    };

    public async clickMyPicksButton(): Promise<void> {
        await this.LOCATORS.myPicksButton.click();
    }
}
