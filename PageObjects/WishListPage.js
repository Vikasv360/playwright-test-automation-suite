class WishListPage{

    constructor(page){

        this.wishListTableRow= page.locator("table tbody tr");
        this.modifiedWishListSuccessMsg=page.locator("div[class*='alert-success']");
        this.wishListcontinueBtn=page.locator("[class='btn btn-primary']");
        this.dashboardMenuForWishList=page.locator("//a[text()='Qafox.com']");
    }

    async removeOutOfStockItemFromWishList(){
        const rows = await this.wishListTableRow;
    const rowCount = await rows.count();

    for (let i = 0; i < rowCount; i++) {
        const row = await rows.nth(i);
        const rowText = await row.textContent();

        if (rowText.includes("Out Of Stock")) {
            await row.locator("a[class='btn btn-danger']").click();
        }
    }

    }

    async getModifiedWishListSuccessMsg(){
        return this.modifiedWishListSuccessMsg;
    }

async returnToDashboardFromWishList(){
    await this.wishListcontinueBtn.click();
    await  this.dashboardMenuForWishList.click();
}
    
    

}
module.exports={WishListPage}