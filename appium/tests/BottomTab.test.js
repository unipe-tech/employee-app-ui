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

describe("Bottom Tab Navigation Testing", () => {
  test("Home Offer Card Present", async () => {
    await driver.$("~Home").touchAction({ action: "tap" });
    await driver.pause(4000);
    await driver.$("~HomeOfferCard").waitForDisplayed({ timeout: 8000 });
  });
  test("Documents Screen", async () => {
    await driver.$("~Documents").touchAction("tap");
    await driver.$("~Driving License").touchAction("tap");
    expect(driver.$("~InfoCard")).toBeTruthy();
  });
  test("PaySlips Screen", async () => {
    await driver.$("~Pay Slips").touchAction("tap");
    expect(driver.$("~MoreDetails")).toBeTruthy();
  });
  test("Portal Screen", async () => {
    await driver.$("~Benefits").touchAction("tap");
    await driver.$("~Portal").touchAction("tap");
    expect(driver.$("~MoreDetails")).toBeTruthy();
  });
  test("Family Details Screen", async () => {
    await driver.$("~Family Address").touchAction("tap");
    expect(driver.$("~MoreDetails")).toBeTruthy();
  });
  test("Your Address Screen", async () => {
    await driver.$("~Your Address").touchAction("tap");
    expect(driver.$("~MoreDetails")).toBeTruthy();
  });
  test("Nominee Address Screen", async () => {
    await driver.$("~Nominee Address").touchAction("tap");
    expect(driver.$("~MoreDetails")).toBeTruthy();
  });
  test("EPFO Screen", async () => {
    await driver.$("~EPFO").touchAction("tap");
    expect(driver.$("~MoreDetails")).toBeTruthy();
  });
  test("Money Screen", async () => {
    await driver.$("~Money").touchAction("tap");
    expect(driver.$("~EWAText")).toBeTruthy();
  });
});
