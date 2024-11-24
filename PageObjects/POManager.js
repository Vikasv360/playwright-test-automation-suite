const { LoginPage } = require("./LoginPage");
const { DashboardPage } = require("./DashboardPage");
const { LogoutPage } = require("./LogoutPage");
class POManager{

    constructor(page){
        this.page=page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.logoutPage = new LogoutPage(this.page);
    }

    async getLoginPage(){
        return this.loginPage;
    }

    async getDashboardPage(){
        return this.dashboardPage;
    }

    async getLogoutPage(){
        return this.logoutPage;
    }

}
module.exports={POManager}