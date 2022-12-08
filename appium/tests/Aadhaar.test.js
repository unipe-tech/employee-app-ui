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

describe("Aadhaar Test", () => {
  test("Aadhaar number does not have a mobile number registered with it", async () => {
    await driver.pause(3000);
    await driver.$("~AADHAAR").touchAction({ action: "tap" });
    await driver.$("~AadhaarForm").waitForDisplayed({ timeout: 8000 });
    await driver.$("~AadhaarInput").clearValue();
    await driver.$("~AadhaarInput").setValue("123452001008");
    await driver.$("~InfoCard").touchAction({ action: "tap" });
    await driver.$("~AadhaarOtpBtn").touchAction({ action: "tap" });
    await driver.pause(5000);

    await driver.acceptAlert();
  });

  test("Exceeded Maximum OTP generation Limit. Please try again in some time", async () => {
    await driver.$("~AadhaarForm").waitForDisplayed({ timeout: 8000 });
    await driver.$("~AadhaarInput").clearValue();
    await driver.$("~AadhaarInput").setValue("123452001011");
    await driver.$("~InfoCard").touchAction({ action: "tap" });
    await driver.$("~AadhaarOtpBtn").touchAction({ action: "tap" });
    await driver.pause(5000);

    await driver.acceptAlert();
  });

  test("Aadhaar number does not exist", async () => {
    await driver.$("~AadhaarForm").waitForDisplayed({ timeout: 8000 });
    await driver.$("~AadhaarInput").clearValue();
    await driver.$("~AadhaarInput").setValue("123452001012");
    await driver.$("~InfoCard").touchAction({ action: "tap" });
    await driver.$("~AadhaarOtpBtn").touchAction({ action: "tap" });
    await driver.pause(5000);

    await driver.acceptAlert();
  });

  test("Invalid Aadhaar Number", async () => {
    await driver.$("~AadhaarForm").waitForDisplayed({ timeout: 8000 });
    await driver.$("~AadhaarInput").clearValue();
    await driver.$("~AadhaarInput").setValue("123456000001");
    await driver.$("~InfoCard").touchAction({ action: "tap" });
    await driver.$("~AadhaarOtpBtn").touchAction({ action: "tap" });
    await driver.pause(5000);

    await driver.acceptAlert();
  });

  test("OTP already sent. Please try after 10 minutes", async () => {
    await driver.$("~AadhaarForm").waitForDisplayed({ timeout: 8000 });
    await driver.$("~AadhaarInput").clearValue();
    await driver.$("~AadhaarInput").setValue("123454000002");
    await driver.$("~InfoCard").touchAction({ action: "tap" });
    await driver.$("~AadhaarOtpBtn").touchAction({ action: "tap" });
    await driver.pause(5000);

    await driver.acceptAlert();
  });

  test("Valid Creds Back Button Testing", async () => {
    await driver.$("~AadhaarForm").waitForDisplayed({ timeout: 8000 });
    await driver.$("~AadhaarInput").clearValue();
    await driver.$("~AadhaarInput").setValue("123452001001");

    await driver.$("~InfoCard").touchAction({ action: "tap" });
    await driver.$("~AadhaarOtpBtn").touchAction({ action: "tap" });
    await driver.$("~AadhaarOtpInput").waitForDisplayed({ timeout: 8000 });

    await driver.$("~BackIcon").touchAction("tap");
    await driver.pause(4000);
    await driver.dismissAlert();

    await driver.$("~BackIcon").touchAction("tap");
    await driver.pause(4000);
    await driver.acceptAlert();
  });
  test("Valid Creds - Verify No Button", async () => {
    await driver.$("~AadhaarForm").waitForDisplayed({ timeout: 8000 });
    await driver.$("~AadhaarInput").clearValue();
    await driver.$("~AadhaarInput").setValue("123452001001");

    await driver.$("~InfoCard").touchAction({ action: "tap" });
    await driver.$("~AadhaarOtpBtn").touchAction({ action: "tap" });

    await driver.$("~AadhaarOtpInput").waitForDisplayed({ timeout: 8000 });
    await driver.$("~AadhaarOtpInput").setValue("201002");

    await driver.$("~AadhaarVerifyBtn").touchAction({ action: "tap" });

    await driver.$("~NoButton").waitForDisplayed({ timeout: 8000 });
    await driver.$("~NoButton").touchAction({ action: "tap" });
  });
  test("Valid Creds - Verify Yes Button", async () => {
    await driver.$("~AadhaarForm").waitForDisplayed({ timeout: 8000 });
    await driver.$("~AadhaarInput").clearValue();
    await driver.$("~AadhaarInput").setValue("123452001001");

    await driver.$("~InfoCard").touchAction({ action: "tap" });
    await driver.$("~AadhaarOtpBtn").touchAction({ action: "tap" });

    await driver.$("~AadhaarOtpInput").waitForDisplayed({ timeout: 8000 });
    await driver.$("~AadhaarOtpInput").setValue("201002");

    await driver.$("~AadhaarVerifyBtn").touchAction({ action: "tap" });

    await driver.$("~YesButton").waitForDisplayed({ timeout: 8000 });
    await driver.$("~YesButton").touchAction({ action: "tap" });
  });
});
