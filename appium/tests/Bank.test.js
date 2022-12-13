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

test("Aadhaar Test", async () => {
  await driver.pause(3000);
  await driver.$("~AADHAAR").touchAction({ action: "tap" });
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

test("Pan Test", async () => {
  await driver.$("~PanInput").waitForDisplayed({ timeout: 8000 });
  await driver.$("~PanInput").setValue("ABCDE2000F");
  await driver.$("~InfoCard").touchAction({ action: "tap" });
  await driver.$("~PanVerifyBtn").touchAction({ action: "tap" });
  await driver.pause(4000);
  await driver.acceptAlert();
  await driver.$("~PanYesBtn").waitForDisplayed({ timeout: 8000 });
  await driver.$("~PanYesBtn").touchAction({ action: "tap" });
});

describe("Bank Test", () => {
  test("Bank Back Testing", async () => {
    await driver.pause(3000);
    await driver.$("~BackIcon").touchAction("tap");
    await driver.pause(2000);
    await driver.acceptAlert();
    await driver.$("~PanYesBtn").waitForDisplayed({ timeout: 8000 });
    await driver.$("~PanYesBtn").touchAction("tap");
  });
  test("Provided invalid Account Number", async () => {
    await driver.pause(3000);
    await driver.$("~AccHolderName").waitForDisplayed({ timeout: 8000 });
    await driver.$("~AccHolderName").setValue("KARAN XXXX");
    await driver.$("~AccNumber").setValue("123456789012");
    await driver.$("~IfscCode").setValue("ABCD0200001");
    await driver.$("~UpiId").setValue("abc@xyz");
    await driver.$("~BankFormBtn").touchAction({ action: "tap" });
    await driver.pause(5000);
    await driver.acceptAlert();
  });
  test("Provided invalid IFSC", async () => {
    await driver.$("~AccHolderName").waitForDisplayed({ timeout: 8000 });
    await driver.$("~IfscCode").setValue("ABCD0200002");
    await driver.$("~BankFormBtn").touchAction({ action: "tap" });
    await driver.pause(5000);
    await driver.acceptAlert();
  });
  test("Account is blocked", async () => {
    await driver.$("~AccHolderName").waitForDisplayed({ timeout: 8000 });
    await driver.$("~IfscCode").setValue("ABCD0200003");
    await driver.$("~BankFormBtn").touchAction({ action: "tap" });
    await driver.pause(5000);
    await driver.acceptAlert();
  });
  test("Account is closed", async () => {
    await driver.$("~AccHolderName").waitForDisplayed({ timeout: 8000 });
    await driver.$("~IfscCode").setValue("ABCD0200004");
    await driver.$("~BankFormBtn").touchAction({ action: "tap" });
    await driver.pause(5000);
    await driver.acceptAlert();
  });
  test("Source bank declined. Cannot validate", async () => {
    await driver.$("~AccHolderName").waitForDisplayed({ timeout: 8000 });
    await driver.$("~IfscCode").setValue("ABCD0200006");
    await driver.$("~BankFormBtn").touchAction({ action: "tap" });
    await driver.pause(5000);
    await driver.acceptAlert();
  });
  test("IMPS mode failed. Cannot validate", async () => {
    await driver.$("~AccHolderName").waitForDisplayed({ timeout: 8000 });
    await driver.$("~IfscCode").setValue("ABCD0200007");
    await driver.$("~BankFormBtn").touchAction({ action: "tap" });
    await driver.pause(5000);
    await driver.acceptAlert();
  });
  test("Failed at bank. Cannot validate", async () => {
    await driver.$("~AccHolderName").waitForDisplayed({ timeout: 8000 });
    await driver.$("~IfscCode").setValue("ABCD0200008");
    await driver.$("~BankFormBtn").touchAction({ action: "tap" });
    await driver.pause(5000);
    await driver.acceptAlert();
  });
  test("Verification attempt failed", async () => {
    await driver.$("~AccHolderName").waitForDisplayed({ timeout: 8000 });
    await driver.$("~IfscCode").setValue("ABCD0200009");
    await driver.$("~BankFormBtn").touchAction({ action: "tap" });
    await driver.pause(5000);
    await driver.acceptAlert();
  });
  test("Beneficiary bank offline", async () => {
    await driver.$("~AccHolderName").waitForDisplayed({ timeout: 8000 });
    await driver.$("~IfscCode").setValue("ABCD0200010");
    await driver.$("~BankFormBtn").touchAction({ action: "tap" });
    await driver.pause(5000);
    await driver.acceptAlert();
  });
  test("NPCI Unavailable", async () => {
    await driver.$("~AccHolderName").waitForDisplayed({ timeout: 8000 });
    await driver.$("~IfscCode").setValue("ABCD0200011");
    await driver.$("~BankFormBtn").touchAction({ action: "tap" });
    await driver.pause(5000);
    await driver.acceptAlert();
  });
  test("Invalid Account. Given account is an NRE account", async () => {
    await driver.$("~AccHolderName").waitForDisplayed({ timeout: 8000 });
    await driver.$("~IfscCode").setValue("ABCD0200012");
    await driver.$("~BankFormBtn").touchAction({ action: "tap" });
    await driver.pause(5000);
    await driver.acceptAlert();
  });
  test("Valid Account with Name Mismatch Alert", async () => {
    await driver.$("~AccHolderName").waitForDisplayed({ timeout: 8000 });
    await driver.$("~AccHolderName").setValue("JOHN DOE");
    await driver.$("~AccNumber").setValue("123456789012");
    await driver.$("~IfscCode").setValue("ABCD0200000");
    await driver.$("~UpiId").setValue("abc@xyz");
    await driver.$("~BankFormBtn").touchAction({ action: "tap" });

    await driver.pause(5000);
    await driver.acceptAlert();
    await driver.$("~BankNoBtn").waitForDisplayed({ timeout: 8000 });
    await driver.$("~BankNoBtn").touchAction({ action: "tap" });
  });
  test("Valid Account with Name Mismatch Alert", async () => {
    await driver.$("~AccHolderName").waitForDisplayed({ timeout: 8000 });
    await driver.$("~AccHolderName").setValue("JOHN DOE");
    await driver.$("~AccNumber").setValue("123456789012");
    await driver.$("~IfscCode").setValue("ABCD0200000");
    await driver.$("~UpiId").setValue("abc@xyz");
    await driver.$("~BankFormBtn").touchAction({ action: "tap" });
    await driver.pause(5000);
    await driver.acceptAlert();
    await driver.$("~BankYesBtn").waitForDisplayed({ timeout: 8000 });
    await driver.$("~BankYesBtn").touchAction({ action: "tap" });
  });
});
