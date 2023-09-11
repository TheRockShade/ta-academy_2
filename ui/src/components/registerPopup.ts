import { Component } from '@Core/component';

export class RegisterPopup extends Component {
    protected LOCATORS = {
        emailInput: this.page.locator('//input[contains(@type, "email")]'),
        firstNameInput: this.page.locator('//input[contains(@id, ":r1:")]'),
        lastNameInput: this.page.locator('//input[contains(@id, ":r2:")]'),
        passwordInput: this.page.locator('//input[contains(@id, ":r3:")]'),
        sumbitButton: this.page.locator(
            '//form[contains(@id, "form-popup-register")]//button[contains(@type, "submit")]'
        ),
    };

    public async fillInput(key: string, value: string): Promise<void> {
        await this.LOCATORS[`${key}Input`].fill(value); // Help me please :D
    }

    public async clickSubmitButton(): Promise<void> {
        await this.LOCATORS.sumbitButton.click();
    }
}
