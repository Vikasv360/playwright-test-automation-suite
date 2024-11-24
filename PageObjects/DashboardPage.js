
class DashboardPage {

    constructor(page) {

        this.page = page;
        this.myAccountMenu = page.locator("//span[text()='My Account']");
        this.loginMenu = page.getByText("Login");
        this.featuredProductList = page.locator("h4 a");
        this.addToCartSuccessMsg = page.locator("[class*='alert-success']");
        this.shoppingCartMenu = page.locator("//span[text()='Shopping Cart']");
        this.shoppingCartAllMenuList = page.locator("li a");
        this.outOfStockErrorMsg = page.locator("[class*='alert-danger']");
        this.shoppingCartTableRows = page.locator("table tbody tr");
        this.itemIndicatorBtn = page.locator("[id='cart-total']");
        this.emptyShoppingCartMsg = page.locator("p");
        this.shoppingCartContinueBtn = page.locator("[class='btn btn-primary']");
        this.DashboardMenu = page.locator("h1 a");
        this.LogOutBtnMenu = page.getByText("Logout");
        this.wishListTotalItemMenu = page.locator("a[title='Wish List (1)']");
        this.wishListMenu =page.locator("a[id='wishlist-total']");

    }

    async goToLandingPage() {
        await page.goto("https://tutorialsninja.com/demo/index.php");
    }

    async goToLoginPage() {

        await this.myAccountMenu.click();
        await this.loginMenu.click();
    }


    async addFeaturedItemIntoCart(productItem) {

        const productCountDash = await this.featuredProductList.count();

        for (let i = 0; i < productCountDash; i++) {
            const productElement = await this.featuredProductList.nth(i);
            const productText = await productElement.textContent();
            console.log(productText);
            if (productText.trim() === productItem.trim()) {
                const addToCartButton = await this.page.locator(
                    `//h4/a[text()='${productText.trim()}']/ancestor::div[@class='caption']//following-sibling::div[@class='button-group']//button[contains(@onclick, 'cart.add')]`
                );
                await addToCartButton.click();
                break;
            }

        }
    }

    async getSuccessMsgOnAddToCart() {

        return this.addToCartSuccessMsg;
    }


    async goToShoppingCart() {
        await this.shoppingCartMenu.click();
    }

    async waitForShoppingCartMenuToAppear() {
        await this.shoppingCartAllMenuList.first().waitFor();
    }

    async getOutOfStockErrorMsg() {
        return this.outOfStockErrorMsg
    }

    async removeOutOfStockItem() {

        const rows = await this.shoppingCartTableRows;
        const rowCount = await rows.count();

        for (let i = 0; i < rowCount; i++) {
            const row = await rows.nth(i);
            const rowText = await row.textContent();

            if (rowText.includes("***")) {
                await row.locator("button[class='btn btn-danger']").click();
            }
        }

        await this.itemIndicatorBtn.waitFor();
    }

    async getEmptyShoppingCartMsg() {
        return this.emptyShoppingCartMsg;
    }

    async goToDashboard() {
        await this.shoppingCartContinueBtn.click();
    }

    async waitForDashboardMenu() {
        await this.DashboardMenu.waitFor();
    }

    async goToLogoutPage() {
        await this.myAccountMenu.click();
        await this.LogOutBtnMenu.click();
    }

    async addFeaturedItemIntoWishList(productItem) {

        const productCountDash = await this.featuredProductList.count();
        for (let i = 0; i < productCountDash; i++) {
            const productElement = await this.featuredProductList.nth(i);
            const productText = await productElement.textContent();
            console.log(productText);
            if (productText.trim() === productItem.trim()) {
                const addToWishListButton = this.page.locator(
                    `//h4/a[text()='${productText.trim()}']/ancestor::div[@class='caption']//following-sibling::div[@class='button-group']//button[@data-original-title='Add to Wish List']`
                );
                await addToWishListButton.click();
                break;
            }

        }
    }

    async waitForItemToAddInWishList(){
        await this.wishListTotalItemMenu.waitFor();
    }

    async goToWishList(){
        await this.wishListMenu.click();
    }

}
module.exports = { DashboardPage };