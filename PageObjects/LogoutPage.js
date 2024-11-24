class LogoutPage{

    constructor(page){
        this.logoutPageContinueBtn=page.locator("[class='btn btn-primary']");
    }

    async gotoDashboardFromLogoutPage(){
        await this.logoutPageContinueBtn.click();
    }
    
}
module.exports={LogoutPage}