import { Account } from '@Components/account';
import { Header } from '@Components/header';
import { Container } from '@Core/container';

export class AccountPage extends Container {
    protected LOCATORS = {
        header: this.page.locator('//header[contains(@Id, "page-header")]'),
        account: this.page.locator('//div[contains(@Class, "myAccountContent")]').first(),
    };

    public Header = new Header(this.LOCATORS.header, this.page);
    public Account = new Account(this.LOCATORS.account, this.page);

    public async open(): Promise<void> {
        await this.page.goto(`/customer/account`, { waitUntil: 'domcontentloaded' });
    }
}
