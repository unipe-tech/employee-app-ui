import { remote } from "webdriverio";
import jasmine from "jasmine";
import { DEV_APP_PATH } from "@env";
import "@testing-library/jest-dom";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
let driver;

beforeAll(async () => {
  driver = await remote({
    path: "/wd/hub",
    host: "localhost",
    port: 4723,
    capabilities: {
      platformName: "Android",
      platformVersion: "13",
      appium: { connectHardwareKeyboard: true },
      automationName: "UiAutomator2",
      autoGrantPermissions: true,
      app: DEV_APP_PATH,
      recordLogs: true,
    },
  });
});

afterAll(async () => {
  if (driver) {
    await driver.deleteSession();
  }
});

describe("Login Test", () => {
  test("InValid Credentials", async () => {
    await driver.pause(3000);
    const devMenuLoginBtn = await driver.$("~Login");
    await devMenuLoginBtn.touchAction({ action: "tap" });

    await driver.$("~MobileNumber").waitForDisplayed({ timeout: 8000 });
    const loginUsernameInput = await driver.$("~MobileNumber");
    await loginUsernameInput.setValue("9999999998");
    await driver.$("~LoginScreen").waitForDisplayed({ timeout: 8000 });
    await driver.$("~LoginScreen").click();

    await driver.$("~LoginNextBtn").waitForDisplayed({ timeout: 8000 });
    const loginNextButton = await driver.$("~LoginNextBtn");
    await loginNextButton.touchAction({ action: "tap" });

    await driver.pause(7000);

    await driver.acceptAlert();
  });

  test("Correct Credentials", async () => {
    // await driver.pause(3000);
    // const devMenuLoginBtn = await driver.$("~Login");
    // await devMenuLoginBtn.touchAction({ action: "tap" });

    await driver.$("~MobileNumber").waitForDisplayed({ timeout: 8000 });
    const loginUsernameInput = await driver.$("~MobileNumber");
    await loginUsernameInput.setValue("9999999999");
    await driver.$("~LoginScreen").waitForDisplayed({ timeout: 8000 });
    await driver.$("~LoginScreen").click();

    await driver.$("~LoginNextBtn").waitForDisplayed({ timeout: 8000 });
    const loginNextButton = await driver.$("~LoginNextBtn");
    await loginNextButton.touchAction({ action: "tap" });
    await driver.$("~BackIcon").touchAction("tap");
    await driver.pause(4000);
    await driver.acceptAlert();

    const OtpScreen = await driver.$("~OtpScreen");
    await OtpScreen.waitForDisplayed({ timeout: 8000 });

    const OtpInput = await driver.$("~OtpInput");
    await OtpInput.waitForDisplayed({ timeout: 6000 });
    await OtpInput.clearValue();
    await OtpInput.setValue("123456");
    await driver.$("~OtpText").waitForDisplayed({ timeout: 8000 });
    await driver.$("~OtpText").click();

    await driver.$("~OtpBtn").waitForDisplayed({ timeout: 8000 });
    const OtpButton = await driver.$("~OtpBtn");
    await OtpButton.touchAction({ action: "tap" });

    const WelcomeScreen = await driver.$("~WelcomePage");
    await WelcomeScreen.waitForDisplayed({ timeout: 8000 });

    const WelcomeButton = await driver.$("~WelcomeBtn");
    WelcomeButton.touchAction({ action: "tap" });
  }, 60000);
});
