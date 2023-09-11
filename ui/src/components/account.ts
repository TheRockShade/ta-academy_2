import { Component } from '@Core/component';

export class Account extends Component {
    protected LOCATORS = {
        detailsAnchor: this.page.locator('//a[contains(@data-id, "myDetails")]'),
        detailsSection: this.page.locator('//div[contains(@data-testid, "section-myDetails")]'),
        editButton: this.page.locator('//button[contains(., "Edit Information")]'),
        firstNameInput: this.page.locator('//input[@placeholder="First Name"]'),
        lastNameInput: this.page.locator('//input[@placeholder="Last Name"]'),
        emailInput: this.page.locator('//input[@placeholder="Email Address"]'),
        saveButton: this.page.locator('//button[contains(., "Save")]'),
        closeButton: this.page.locator('//button[contains(., "Close")]'),
    };

    public async fillInput(key: string, value: string): Promise<void> {
        await this.LOCATORS[`${key}Input`].fill(value); // Help me please :D
    }

    public async clickDetailsAnchor(): Promise<void> {
        await this.LOCATORS.detailsAnchor.click();
    }

    public async clickEditButton(): Promise<void> {
        await this.LOCATORS.editButton.click();
    }

    public async clickSaveButton(): Promise<void> {
        await this.LOCATORS.saveButton.click();
    }

    public async clickCloseButton(): Promise<void> {
        await this.LOCATORS.closeButton.click();
    }

    public async getInputValue(key: string): Promise<string> {
        return await this.LOCATORS[`${key}Input`].inputValue(); // Help me please :D
    }
}
