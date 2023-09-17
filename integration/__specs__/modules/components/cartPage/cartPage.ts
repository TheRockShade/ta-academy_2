import { Container } from '@Core/container';
import { CartList } from '@Components/cartPage/cartList/cartList';
import { CartModal } from '@Components/cartPage/cartModal/cartModal';

export class CartPage extends Container {
    private selectors = {
        title: 'h1',
        cartList: './/div[@class="cart__list"]',
        modalButton: './/button[contains(., "Add Cart Item")]',
        modal: '[data-testid="modal"]',
    };

    public async fulfill(): Promise<void> {
        await super.fulfill();
    }

    public async getHeaderTitle(): Promise<string> {
        const [title] = await document.waitForQuerySelector(this.selectors.title);
        return title.textContent;
    }

    public async getModalButton(): Promise<Element> {
        const [modalButton] = await document.waitForXpath(this.selectors.modalButton);
        return modalButton;
    }

    public async getModal(): Promise<CartModal> {
        const [cartModal] = await document.waitForQuerySelector(this.selectors.modal);
        return new CartModal(cartModal);
    }

    public async clickModalButton(): Promise<void> {
        await document.clickByXpath(this.selectors.modalButton);
    }

    public async getCartList(): Promise<CartList> {
        const [cartListElement] = await document.waitForXpath(this.selectors.cartList);
        return new CartList(cartListElement);
    }
}
