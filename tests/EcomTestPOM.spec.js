const { test, expect } = require("@playwright/test")
const { LoginPage } = require("../PageObjects/LoginPage");
const { DashboardPage } = require("../PageObjects/DashboardPage");
const { LogoutPage } = require("../PageObjects/LogoutPage");
const { WishListPage } = require("../PageObjects/WishListPage");
const testData = JSON.parse(JSON.stringify(require("../testData.json")));

// test.describe.configure({mode:'parallel'})
test('Validate the functionality of adding item to cart from featured section of dashboard', async ({ page }) => {

    const dashboardPage = new DashboardPage(page);
    await page.goto("https://tutorialsninja.com/demo/index.php");
    await dashboardPage.goToLoginPage();
    const loginPage = new LoginPage(page);
    await loginPage.enterValidCredentials(testData.username, testData.password);
    await loginPage.gotoDashboard();

    //Dashboard screen:
    await dashboardPage.addFeaturedItemIntoCart(testData.productItem);
    const successTxt = await dashboardPage.getSuccessMsgOnAddToCart();
    await expect(await successTxt)
        .toContainText(testData.productItem);
    await dashboardPage.goToShoppingCart();

    //Shopping cart screen
    await dashboardPage.waitForShoppingCartMenuToAppear();
    expect(await dashboardPage.getOutOfStockErrorMsg())
        .toContainText(testData.outOfStockNotifcationMsg);
    await dashboardPage.removeOutOfStockItem();
    const emptyCartMsg = await dashboardPage.getEmptyShoppingCartMsg();
    expect(await emptyCartMsg.nth(0)).toHaveText(testData.emptyCartMsgTxt);

    //Return to Dashboard
    await dashboardPage.goToDashboard();
    await dashboardPage.waitForDashboardMenu();


    //Logout
    await dashboardPage.goToLogoutPage();
    const logoutPage = new LogoutPage(page);
    await logoutPage.gotoDashboardFromLogoutPage();
});

test('Validate the functionality of adding item to wishlist from featured section of dashboard ', async ({ page }) => {

    const dashboardPage = new DashboardPage(page);
    await page.goto("https://tutorialsninja.com/demo/index.php");
    await dashboardPage.goToLoginPage();
    const loginPage = new LoginPage(page);
    await loginPage.enterValidCredentials(testData.username, testData.password);
    await loginPage.gotoDashboard();

    //Adding feature to cart
    await dashboardPage.addFeaturedItemIntoWishList(testData.productItem);
    await dashboardPage.waitForItemToAddInWishList();
    await dashboardPage.goToWishList();

    //WishList page
    const wishListPage=new WishListPage(page);
    await wishListPage.removeOutOfStockItemFromWishList();
    const modifiedSuccessMsg=await wishListPage.getModifiedWishListSuccessMsg();

    expect(await modifiedSuccessMsg).toContainText(testData.modifiedSuccessMsg);

    await wishListPage.returnToDashboardFromWishList();

    await dashboardPage.goToLogoutPage();
    const logoutPage = new LogoutPage(page);
    await logoutPage.gotoDashboardFromLogoutPage();

});

test('Verify the validation messages for all the fields in Contact form', async ({page})=>{

    await page.goto("https://tutorialsninja.com/demo/index.php");
    await page.locator("div ul li a").first().click();
    await page.locator("[class='btn btn-primary']").click();
    expect(await page.locator("[class='text-danger']").nth(0)).toHaveText("Name must be between 3 and 32 characters!");
    expect(await page.locator("[class='text-danger']").nth(1)).toHaveText("E-Mail Address does not appear to be valid!");
    expect(await page.locator("[class='text-danger']").nth(2)).toHaveText("Enquiry must be between 10 and 3000 characters!");

});

test('Validate submitting the contact form', async ({page})=>{

    await page.goto("https://tutorialsninja.com/demo/index.php");
    await page.locator("div ul li a").first().click();
    await page.locator("//h1[text()='Contact Us']").waitFor();
    await page.locator("[id='input-name']").fill("vikas");
    await page.locator("[id='input-email']").fill("vikasv360test@gmail.com");
    await page.locator("[id='input-enquiry']").fill("Test@123456");
    await page.locator("[class='btn btn-primary']").click();

});
