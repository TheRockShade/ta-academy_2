import { Component } from '@Core/component';
import { faker } from '@faker-js/faker';

export class Newsletter extends Component {
    protected LOCATORS = {
        email: this.locator.locator('//input'),
        sendButton: this.locator.locator('//button'),
    };

    public async scrollToSection(): Promise<void> {
        await this.locator.scrollIntoViewIfNeeded();
    }

    public async fillEmail(): Promise<void> {
        return await this.LOCATORS.email.fill(faker.internet.email());
    }

    public async clickSendButton(): Promise<void> {
        await this.LOCATORS.sendButton.click();
    }
}
