/*
package.json
  "name": "physics_eeg_launch",
  "version": "1.0.0",
  "author": "Rishabh Shah",
  "license": "MIT",
  "dependencies": {
    "@neurosity/sdk": "^6.5.10",
    "dotenv": "^16.4.7"
  },

*/


// @ts-check
const { exec } = require("child_process");
const { test, expect } = require('@playwright/test');
require("dotenv").config();

const deviceId = process.env.DEVICE_ID || "";
const deviceNickname = process.env.DEVICE_NICKNAME || "";
const email = process.env.EMAIL || "";
const password = process.env.PASSWORD || "";

const verifyEnvs = (email, password, deviceId) => {
    const invalidEnv = (env) => {
        return env === "" || env === 0;
    };
    if (invalidEnv(email) || invalidEnv(password) || invalidEnv(deviceId)) {
        console.error(
            "Please verify deviceId, email and password are in .env file, quitting..."
        );
        process.exit(0);
    }
};

verifyEnvs(email, password, deviceId);

console.log(`${email} attempting to authenticate to ${deviceNickname}`);

test('neurosity launcher', async ({ page }) => {
    
    test.setTimeout(5 * 60000); // 5 min

    await page.goto('https://console.neurosity.co/login');

    await page.fill('input[type="email"]', email);
    await page.fill('input[type="password"]', password);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000); // wait on launch page

    await page.goto('https://console.neurosity.co/metrics');

    await page.locator("(//div[text()='awareness / calm'])[2]/..//following-sibling::div").first().click(); // exit out of awareness / calm
    await page.locator("//div[text()='Select or enter']").click();

    await expect(page.locator("[class*='menu']").last()).toBeVisible();
    await page.locator('[class*="menu"]').getByText('kinesis / bitingALemon').click(); // select bitingALemon by name

    await page.locator("//button[text()='Start']").last().click(); // metric predictions start button (3rd section)

    await page.locator("//button[text()='Stop']").last().scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);
    const valueLocator = page.locator(`//div[@label="bitingALemon"]/..//*[text()='bitingALemon']`);

    let value = 0.0; // default probability
    const pollingInterval = 200; // check every .2 second
    const timeout = 4 * 60000; // stop if no 1.00's after 4 minutes

    const startTime = Date.now();

    console.log('Polling started');

    while (Date.now() - startTime < timeout) {
        const text = await valueLocator.textContent(); // get 'bitingALemon: X.YZ'

        if (text) {
            value = parseFloat(text.split(': ')[1]);
            console.log(`Current value: ${value}`);

            if (value >= 0.9) {
                console.log('Probability = 1.00. Launching now');

                exec("arduino-cli upload -p /dev/cu.usbmodem1101 --fqbn arduino:avr:uno ~/NeuroLauncher", (error, stdout, stderr) => {
                    if (error) {
                        console.log(`error: ${error.message}`);
                        return;
                    }
                    if (stderr) {
                        console.log(`stderr: ${stderr}`);
                        return;
                    }
                    console.log(`${stdout}`);
                });

                break;
            }
        }

        // half second wait
        await page.waitForTimeout(pollingInterval);
    }
});