import { FeaturedIn } from '@Components/featuredIn';
import { Header } from '@Components/header';
import { Newsletter } from '@Components/newsletter';
import { RegisterPopup } from '@Components/registerPopup';
import { Container } from '@Core/container';

export class HomePage extends Container {
    protected LOCATORS = {
        header: this.page.locator('//header[contains(@Id, "page-header")]'),
        registerPopup: this.page.locator(
            '//div[contains(@Class, "ReactModal" and contains(., "Sing up."))]'
        ),
        featuredIn: this.page.locator('//section[contains(., "As featured in.")]'),
        newsletter: this.page
            .locator('//footer//div[contains(@Class, "subscribeSection")]')
            .first(),
    };

    public Header = new Header(this.LOCATORS.header, this.page);
    public RegisterPopup = new RegisterPopup(this.LOCATORS.registerPopup, this.page);
    public FeaturedIn = new FeaturedIn(this.LOCATORS.featuredIn, this.page);
    public Newsletter = new Newsletter(this.LOCATORS.newsletter, this.page);

    public async open(): Promise<void> {
        await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    }
}
