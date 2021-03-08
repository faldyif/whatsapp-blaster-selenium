const { Builder, By, Key, until } = require('selenium-webdriver');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const phoneNumbers = [
    '+628123456789',
];
const content = 'coba';

const firstLogIn = async (driver) => {
    await driver.get('https://web.whatsapp.com/');
    await driver.wait(until.titleContains(') WhatsApp'), 100 * 1000);
    await delay(1000);
}

const sendMessage = async (driver, phoneNumber) => {
    try {
        await driver.get(`https://web.whatsapp.com/send?phone=${phoneNumber}&text=${content}&app_absent=0`);
        await driver.wait(until.titleContains(') WhatsApp'), 100 * 1000);
        await delay(500);
        await driver.findElement(By.xpath('//*[@id="main"]/footer/div[1]/div[2]/div/div[2]')).sendKeys(Key.ENTER);
        await delay(2500);
    } catch (e) {
        console.log(`Failed on phone number ${phoneNumber}`);
    }
}

const finish = async (driver) => {
    await driver.quit();
}

(async () => {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await firstLogIn(driver);
        for await (const phoneNumber of phoneNumbers) {
            await sendMessage(driver, phoneNumber);
        }
    } finally {
        await finish(driver);
    }
})();
