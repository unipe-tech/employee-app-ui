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

describe("EWA test", () => {
  test("Offer Page Back Button Testing", async () => {
    await driver.$("~Home").touchAction("tap");
    await driver.pause(2000);
    await driver.$("~Home").touchAction("tap");
    await driver.$("~WithdrawNowBtn").waitForDisplayed({ timeout: 8000 });
    await driver.$("~WithdrawNowBtn").touchAction("tap");
    await driver.pause(2000);
    await driver.$("~GetMoneyNowBtn").waitForDisplayed({ timeout: 8000 });
    await driver.$("~GetMoneyNowBtn").touchAction("tap");
    await driver.$("~BackIcon").touchAction("tap");
    await driver.pause(2000);
    await driver.$("~GetMoneyNowBtn").waitForDisplayed({ timeout: 8000 });
    await driver.$("~GetMoneyNowBtn").touchAction("tap");
  });

  test("KYC Page back button testing", async () => {
    await driver.$("~MoneyInput").setValue("1000");
    await driver.$("~ContinueBtn").touchAction("tap");
    await driver.pause(2000);
    await driver.$("~BackIcon").touchAction("tap");
    await driver.$("~MoneyInput").setValue("1000");
    await driver.$("~ContinueBtn").touchAction("tap");
    await driver.$("~KYCContinueBtn").waitForDisplayed({ timeout: 8000 });
    await driver.pause(2000);
    await driver.$("~KYCContinueBtn").touchAction("tap");
  });

  test("KYC Page back button testing", async () => {
    await driver.$("~AgreementScreen").waitForDisplayed({ timeout: 8000 });
    await driver.pause(2000);
    await driver.$("~BackIcon").touchAction("tap");
    await driver.$("~KYCContinueBtn").touchAction("tap");
  });

  test("Success", async () => {
    await driver.$("~AgreementScreen").waitForDisplayed({ timeout: 8000 });
    await driver.$("~Loan Amount Key").waitForDisplayed({ timeout: 8000 });
    expect(await driver.$("~₹1000 Value").getText()).toEqual("₹1000");
    expect(await driver.$("~₹45 Value").getText()).toEqual("₹45");
    expect(await driver.$("~₹955 Value").getText()).toEqual("₹955");
    expect(await driver.$("~KARAN XXXX Value").getText()).toEqual("KARAN XXXX");
    expect(await driver.$("~ABCDE2000F Value").getText()).toEqual("ABCDE2000F");
    expect(await driver.$("~01-01-1990 Value").getText()).toEqual("01-01-1990");
    expect(await driver.$("~YES BANK Value").getText()).toEqual("YES BANK");
    expect(await driver.$("~SANTACRUZ, MUMBAI Value").getText()).toEqual(
      "SANTACRUZ, MUMBAI"
    );
    expect(await driver.$("~123456789012 Value").getText()).toEqual(
      "123456789012"
    );
    expect(await driver.$("~ABCD0200000 Value").getText()).toEqual(
      "ABCD0200000"
    );
    await driver.$("~FinishBtn").touchAction("tap");
  });
  test("If DisbursementScreen is Present", async () => {
    await driver.$("~DisbursementScreen").waitForDisplayed({ timeout: 8000 });
    await driver.pause(2000);
    await driver.$("~BackIcon").touchAction("tap");
  });
});
