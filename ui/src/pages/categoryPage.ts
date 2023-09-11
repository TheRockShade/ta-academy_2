import { MyPicksPopup } from './../components/myPicksPopup';
import { Header } from '@Components/header';
import { Products } from '@Components/products';
import { Container } from '@Core/container';

export class CategoryPage extends Container {
    protected LOCATORS = {
        header: this.page.locator('//header[contains(@Id, "page-header")]'),
        productsSection: this.page.locator('//main'),
        myPicksPopup: this.page.locator('//div[contains(@Class, "mypicks-tab-container-wrapper")]'),
    };

    public Header = new Header(this.LOCATORS.header, this.page);
    public MyPicksPopup = new MyPicksPopup(this.LOCATORS.myPicksPopup, this.page);
    public Products = new Products(this.LOCATORS.productsSection, this.page);

    public async open(
        url: 'contact-lenses' | 'sunglasses' | 'eyeglasses-collection'
    ): Promise<void> {
        await this.page.goto(`/${url}`, { waitUntil: 'domcontentloaded' });
    }
}
