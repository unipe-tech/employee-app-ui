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

describe("PAN Test", () => {
  test("PAN Back Testing", async () => {
    await driver.pause(3000);
    await driver.$("~PAN").touchAction({ action: "tap" });
    await driver.$("~BackIcon").touchAction("tap");
    await driver.pause(2000);
    await driver.acceptAlert();
    await driver.$("~YesButton").waitForDisplayed({ timeout: 8000 });
    await driver.$("~YesButton").touchAction("tap");
  });
  test("PAN does not exist", async () => {
    await driver.pause(3000);
    await driver.$("~PanInput").waitForDisplayed({ timeout: 8000 });
    await driver.$("~PanInput").setValue("ABCDE2004F");
    await driver.$("~InfoCard").touchAction({ action: "tap" });
    await driver.$("~PanVerifyBtn").touchAction({ action: "tap" });
    await driver.pause(4000);
    await driver.acceptAlert();
  });
  test("Invalid PAN number", async () => {
    await driver.$("~PanInput").waitForDisplayed({ timeout: 8000 });
    await driver.$("~PanInput").setValue("ABCDE4000F");
    await driver.$("~InfoCard").touchAction({ action: "tap" });
    await driver.$("~PanVerifyBtn").touchAction({ action: "tap" });
    await driver.pause(4000);
    await driver.acceptAlert();
  });
  test("Forward Icon Testing", async () => {
    await driver.$("~PanInput").waitForDisplayed({ timeout: 8000 });
    await driver.$("~ForwardIcon").touchAction("tap");
    await driver.pause(2000);
    await driver.acceptAlert();
    await driver.$("~BackIcon").touchAction("tap");
    await driver.acceptAlert();
  });
  test("Valid Pan - No button", async () => {
    await driver.$("~PanInput").waitForDisplayed({ timeout: 8000 });
    await driver.$("~PanInput").setValue("ABCDE2000F");
    await driver.$("~InfoCard").touchAction({ action: "tap" });
    await driver.$("~PanVerifyBtn").touchAction({ action: "tap" });
    await driver.pause(4000);
    await driver.acceptAlert();
    await driver.$("~PanNoBtn").waitForDisplayed({ timeout: 8000 });
    await driver.$("~PanNoBtn").touchAction({ action: "tap" });
  });
  test("Valid Pan - Yes button", async () => {
    await driver.$("~PanInput").waitForDisplayed({ timeout: 8000 });
    await driver.$("~PanInput").setValue("ABCDE2000F");
    await driver.$("~InfoCard").touchAction({ action: "tap" });
    await driver.$("~PanVerifyBtn").touchAction({ action: "tap" });
    await driver.pause(4000);
    await driver.acceptAlert();
    await driver.$("~PanYesBtn").waitForDisplayed({ timeout: 8000 });
    await driver.$("~PanYesBtn").touchAction({ action: "tap" });
  });
});
