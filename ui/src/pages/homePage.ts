import { FeaturedIn } from '@Components/featuredIn';
import { Newsletter } from '@Components/newsletter';
import { Container } from '@Core/container';

export class HomePage extends Container {
    protected LOCATORS = {
        featuredIn: this.page.locator('//section[contains(., "As featured in.")]'),
        newsletter: this.page
            .locator('//footer//div[contains(@Class, "subscribeSection")]')
            .first(),
    };

    public FeaturedIn = new FeaturedIn(this.LOCATORS.featuredIn, this.page);
    public Newsletter = new Newsletter(this.LOCATORS.newsletter, this.page);

    public async open(): Promise<void> {
        await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    }
}
