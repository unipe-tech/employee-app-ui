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

test("Correct Credentials", async () => {
  await driver.pause(3000);
  const devMenuLoginBtn = await driver.$("~Login");
  await devMenuLoginBtn.touchAction({ action: "tap" });

  await driver.$("~MobileNumber").waitForDisplayed({ timeout: 8000 });
  const loginUsernameInput = await driver.$("~MobileNumber");
  await loginUsernameInput.setValue("9999999999");
  await driver.$("~LoginScreen").waitForDisplayed({ timeout: 8000 });
  await driver.$("~LoginScreen").click();

  await driver.$("~LoginNextBtn").waitForDisplayed({ timeout: 8000 });
  const loginNextButton = await driver.$("~LoginNextBtn");
  await loginNextButton.touchAction({ action: "tap" });

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
}, 60000);

describe("EWA test", () => {
  test("Offer Page Back Button Testing", async () => {
    // await driver.$("~Home").touchAction("tap");
    // await driver.pause(2000);
    // await driver.$("~Home").touchAction("tap");
    await driver.pause(3000);
    await driver.$("~GetMoneyNowBtn").waitForDisplayed({ timeout: 8000 });
    await driver.$("~GetMoneyNowBtn").touchAction("tap");
    await driver.pause(2000);
    await driver.$("~BackIcon").touchAction("tap");
    await driver.pause(2000);
    await driver.$("~GetMoneyNowBtn").waitForDisplayed({ timeout: 8000 });
    await driver.$("~GetMoneyNowBtn").touchAction("tap");
  });

  test("KYC Page back button testing", async () => {
    await driver.$("~MoneyInput").setValue("20");
    await driver.$("~ContinueBtn").touchAction("tap");
    await driver.pause(2000);
    await driver.$("~BackIcon").touchAction("tap");
    await driver.$("~MoneyInput").setValue("20");
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
    expect(await driver.$("~₹20 Value").getText()).toEqual("₹20");
    expect(await driver.$("~₹1 Value").getText()).toEqual("₹1");
    expect(await driver.$("~₹19 Value").getText()).toEqual("₹19");
    expect(await driver.$("~KARAN XXXX Value").getText()).toEqual("KARAN XXXX");
    expect(await driver.$("~ABCDE2000F Value").getText()).toEqual("ABCDE2000F");
    expect(await driver.$("~1990-10-10 Value").getText()).toEqual("1990-10-10");
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
