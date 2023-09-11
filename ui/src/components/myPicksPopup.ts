import { Component } from '@Core/component';

export class MyPicksPopup extends Component {
    protected LOCATORS = {};

    public async getMyPicksResponse(): Promise<Buffer> {
        const response = await this.page.waitForResponse(
            (response) => response.url().includes('/ms/elastic') && response.status() === 200
        );

        return await response.body();
    }
}
