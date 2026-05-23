import { test, expect, chromium, Dialog } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

const name:string="Admin"
const surname:string="Admin"
const username:string="PolarBear15"   // Do CHANGE the username everytime you run testcases
const password:string="Bazinga"
const url = 'https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC'
const testData = [
  { username: 'user111', password:'', name:'Polar', surname:'Admin'},// checking login FAILS if null password is sent to login
  { username: '', password:'password1', name:'PolarBear', surname:'Admin'},// checking login FAILS if null username is sent to login
  { username: 'user211', password:'password1', name:'', surname:'Admin'},// checking login FAILS if null name is sent to customer registration
  { username: 'user311', password:'password1', name:'NewPolarBear', surname:''}// checking login FAILS if null surname is sent to customer registration
];

test.fail('Unsuccessful login with unregistered credentials', async ({ page }) => {
  const originPag = new LoginPage(page, url);
  await originPag.goto()
  await originPag.customerLogin("Choco chip", "muffin")
})

test.fail('Unsuccessful login with empty username', async ({ page }) => {
  const originPag = new LoginPage(page, url);
  await originPag.goto()
  await originPag.customerLogin("Choco chip", "muffin")
})

test.fail('Unsuccessful login with empty password', async ({ page }) => {
  const originPag = new LoginPage(page, url);
  await originPag.goto()
  await originPag.customerLogin("Choco chip", "")
})

test('Positive Scenario', async ({ page }) => { //Positive Test Scenario
  const originPag = new LoginPage(page, url);
  await originPag.goto()
  await originPag.customerRegistration(name, surname, username, password)
  await originPag.logOut()
  await originPag.customerLogin(username, password)
  await originPag.accountOverview()
  await originPag.logOut()
});

test.fail(`Negative Scenario for registration with no firstname`, async ({ page }) => {
  const originPag = new LoginPage(page, url);
  await originPag.goto()
  await originPag.customerRegistration('','Muffin','MuffinParty', 'MuffinParty123')
  await originPag.logOut()
  await originPag.customerLogin('MuffinParty', 'MuffinParty123')
  await originPag.accountOverview()
});

