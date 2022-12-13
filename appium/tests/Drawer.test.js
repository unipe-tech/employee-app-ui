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

describe("Drawer Test", () => {
  test("Terms and Privacy Modal", async () => {
    // await driver.$("~Home").touchAction({ action: "tap" });
    await driver.pause(3000);
    await driver.$("~Account").waitForDisplayed({ timeout: 8000 });
    await driver.$("~Account").touchAction("tap");
    await driver.$("~Terms & Conditions").touchAction("tap");
    await driver.$("~TermsViewModal").waitForDisplayed({ timeout: 8000 });
    await driver.$("~CloseButton").touchAction("tap");
  });

  test("Terms and Privacy Modal", async () => {
    await driver.$("~Privacy Policy").touchAction("tap");
    await driver.$("~PrivacyViewModal").waitForDisplayed({ timeout: 8000 });
    await driver.$("~CloseButton").touchAction("tap");
    await driver.pause(2000);
  });

  test("Aadhaar KYC", async () => {
    // const DrawerText = await driver.$("~DrawerName").getText();
    // expect(DrawerText).toEqual("KARAN XXXX");
    // await driver.pause(2000);
    await driver.$("~KYC").touchAction("tap");
    await driver.$("~Full Name Label").waitForDisplayed({ timeout: 8000 });
    const FullNameLabel = await driver.$("~KARAN XXXX Value").getText();
    const DOBLabel = await driver.$("~1990-10-10 Value").getText();
    const AadhaarNumberLabel = await driver.$("~123452001001 Value").getText();
    const AddressLabel = await driver
      .$(
        "~3-184/A/1/, XXXXXXXXXX, XXXXXXXXXX, XXXXXXXXXX, Andhra Pradesh, 500001 Value"
      )
      .getText();
    const VerifyStatusLabel = await driver.$("~SUCCESS Value").getText();

    expect(FullNameLabel).toEqual("KARAN XXXX");
    expect(DOBLabel).toEqual("1990-10-10");
    expect(AadhaarNumberLabel).toEqual("123452001001");
    expect(AddressLabel).toEqual(
      "3-184/A/1/, XXXXXXXXXX, XXXXXXXXXX, XXXXXXXXXX, Andhra Pradesh, 500001"
    );
    expect(VerifyStatusLabel).toEqual("SUCCESS");
  });

  test("PAN KYC", async () => {
    await driver.$("~PAN").touchAction("tap");
    const FullNameLabel = await driver.$("~JOHN DOE Value").getText();
    const PANNumberLabel = await driver.$("~ABCDE2000F Value").getText();
    const DOBLabel = await driver.$("~1994-08-14 Value").getText();
    const GenderLabel = await driver.$("~MALE Value").getText();
    const EmailLabel = await driver.$("~JOHNDOE229@GMAIL.COM Value").getText();
    const VerifyStatusLabel = await driver.$("~SUCCESS Value").getText();

    expect(FullNameLabel).toEqual("JOHN DOE");
    expect(PANNumberLabel).toEqual("ABCDE2000F");
    expect(DOBLabel).toEqual("1994-08-14");
    expect(GenderLabel).toEqual("MALE");
    expect(EmailLabel).toEqual("JOHNDOE229@GMAIL.COM");
    expect(VerifyStatusLabel).toEqual("SUCCESS");
  });

  test("Bank KYC", async () => {
    await driver.$("~BANK").touchAction("tap");
    const AccNumberLabel = await driver.$("~123456789012 Value").getText();
    const AccHolderLabel = await driver.$("~KARAN XXXX Value").getText();
    const IFSCCodeLabel = await driver.$("~ABCD0200000 Value").getText();
    const UpiIdLabel = await driver.$("~abc@xyz Value").getText();
    const VerifyStatusLabel = await driver.$("~SUCCESS Value").getText();

    expect(AccNumberLabel).toEqual("123456789012");
    expect(AccHolderLabel).toEqual("KARAN XXXX");
    expect(IFSCCodeLabel).toEqual("ABCD0200000");
    expect(UpiIdLabel).toEqual("abc@xyz");
    expect(VerifyStatusLabel).toEqual("SUCCESS");
  });
});

describe("Profile Test", () => {
  test("Profile Test", async () => {
    await driver.$("~BackIcon").touchAction("tap");
    await driver.$("~Profile").touchAction("tap");
    const FullNameLabel = await driver.$("~KARAN XXXX Value").getText();
    const EmailIdLabel = await driver.$("~abc@gmail.com Value").getText();
    const MobileNumberLabel = await driver.$("~9999999999 Value").getText();
    const AltMobileLabel = await driver.$("~9999999998 Value").getText();
    const EdQualificationLabel = await driver.$("~10th Pass Value").getText();
    const MarriedStatusLabel = await driver.$("~Unmarried Value").getText();

    expect(FullNameLabel).toEqual("KARAN XXXX");
    expect(EmailIdLabel).toEqual("abc@gmail.com");
    expect(MobileNumberLabel).toEqual("9999999999");
    expect(AltMobileLabel).toEqual("9999999998");
    expect(EdQualificationLabel).toEqual("10th Pass");
    expect(MarriedStatusLabel).toEqual("Unmarried");
  });
});
