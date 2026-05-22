import { Browser, expect, type Locator, type Page, chromium } from '@playwright/test';

export class LoginPage {
  originURL: string;
  readonly page: Page;

  constructor(page: Page, url: string) {
    this.originURL = url;
    this.page = page
  }

  async goto() {
    await this.page.goto(this.originURL);

  }

  async logOut(){
    await this.page.locator("//a[text()='Log Out']").click()
  }

  async accountOverview(){
    await this.page.locator("//a[text()='Accounts Overview']").click()
    console.log(await this.page.locator("//table[@id='accountTable']/tbody/tr[2]/td[2]").textContent())
  }

  async customerRegistration(firstName:string, lastName:string, username:string, password:string){
    await this.page.locator("//a[text()='Register']").click()
    expect(await this.page.locator("//h1[@class='title']").textContent()).toContain('Signing up is easy!')
    await this.page.locator("//input[@id='customer.firstName']").fill(firstName)
    await this.page.locator("//input[@id='customer.lastName']").fill(lastName)
    await this.page.locator("//input[@id='customer.address.street']").fill("dummy street")
    await this.page.locator("//input[@id='customer.address.city']").fill("dummy city")
    await this.page.locator("//input[@id='customer.address.street']").fill("dummy street")
    await this.page.locator("//input[@id='customer.address.state']").fill("dummy state")
    await this.page.locator("//input[@id='customer.address.zipCode']").fill("dummy zipcode")
    await this.page.locator("//input[@id='customer.phoneNumber']").fill("dummy phoneNumber")
    await this.page.locator("//input[@id='customer.ssn']").fill("dummy ssn")
    await this.page.locator("//input[@id='customer.username']").fill(username)
    await this.page.locator("//input[@id='customer.password']").fill(password)
    await this.page.locator("//input[@id='repeatedPassword']").fill(password)
    await this.page.getByRole('button', { name: 'Register' }).click()
    expect(await this.page.locator("//p[contains(text(),'created successfully. ')]").textContent()).toContain(" You are now logged in.")

  }

  async customerLogin(username: string, password: string){
    await this.page.locator("//input[@name='username']").fill(username)
    await this.page.locator("//input[@name='password']").fill(password)
    await this.page.getByText('Log In').click()
  }
}

