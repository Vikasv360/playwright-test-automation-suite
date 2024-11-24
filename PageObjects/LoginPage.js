class LoginPage {


    constructor(page) {

        this.page=page;
        this.emailAddress = page.getByPlaceholder("E-Mail Address");
        this.password = page.getByPlaceholder("Password");
        this.loginBtn = page.getByRole("button", { name: 'Login' });
        this.dashBoardMenu = page.locator("//a[text()='Qafox.com']");
    }


    async enterValidCredentials(username,password) {
        await this.emailAddress.fill(username);
        await this.password.fill(password);
    }

    async gotoDashboard() {
        await this.loginBtn.click();
        await this.dashBoardMenu.click();
    }


}
module.exports = { LoginPage };