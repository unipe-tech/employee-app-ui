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

describe("Profile Test", () => {
  test("Demo Creds", async () => {
    await driver.$("~Profile").touchAction({ action: "tap" });
    await driver.$("~ProfileForm").waitForDisplayed({ timeout: 8000 });
    await driver.$("~BackIcon").touchAction("tap");
    await driver.pause(2000);
    await driver.acceptAlert();
    await driver.$("~WelcomeBtn").touchAction("tap");
  });
  test("Demo Creds", async () => {
    await driver.$("~ProfileForm").waitForDisplayed({ timeout: 8000 });
    const EducationDropdown = await driver.$("~EducationDropdown");
    const MaritalStatusDropdown = await driver.$("~MaritalStatusDropdown");
    const MotherNameInput = await driver.$("~MotherNameInput");
    const AltPhoneNumberInput = await driver.$("~AltPhoneNumberInput");
    const EmailAddressInput = await driver.$("~EmailAddressInput");
    await EducationDropdown.touchAction({ action: "tap" });
    await driver.$("~12th Pass").waitForDisplayed({ timeout: 8000 });
    await driver.$("~12th Pass").touchAction({ action: "tap" });
    await driver.$("~DropdownBtn").touchAction("tap");

    await MaritalStatusDropdown.touchAction({ action: "tap" });

    await driver.$("~Married").waitForDisplayed({ timeout: 8000 });
    await driver.$("~Married").touchAction({ action: "tap" });
    await driver.$("~DropdownBtn").touchAction("tap");

    await MotherNameInput.setValue("Wonder Woman");
    await AltPhoneNumberInput.setValue("9999999998");
    await EmailAddressInput.setValue("abc@gmail.com");

    await driver.$("~ProfileBtn").touchAction({ action: "tap" });
  });
});
