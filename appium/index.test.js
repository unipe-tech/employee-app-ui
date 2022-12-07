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

describe("Profile Test", () => {
  test("Demo Creds", async () => {
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

describe("Aadhaar Test", () => {
  test("Aadhaar number does not have a mobile number registered with it", async () => {
    await driver.pause(3000);
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

describe("PAN Test", () => {
  test("PAN Back Testing", async () => {
    await driver.pause(3000);
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
  test("Valid Account - No Button", async () => {
    await driver.$("~AccHolderName").waitForDisplayed({ timeout: 8000 });
    await driver.$("~AccHolderName").setValue("KARAN XXXX");
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

describe("Drawer Test", () => {
  test("Terms and Privacy Modal", async () => {
    await driver.pause(3000);
    await driver.$("~NavigationDrawer").waitForDisplayed({ timeout: 8000 });
    await driver.$("~NavigationDrawer").touchAction("tap");
    await driver.$("~TermsIcon").touchAction("tap");
    await driver.$("~TermsViewModal").waitForDisplayed({ timeout: 8000 });
    await driver.$("~CloseButton").touchAction("tap");
  });

  test("Terms and Privacy Modal", async () => {
    await driver.$("~PrivacyIcon").touchAction("tap");
    await driver.$("~PrivacyViewModal").waitForDisplayed({ timeout: 8000 });
    await driver.$("~CloseButton").touchAction("tap");
    await driver.pause(2000);
  });

  test("Aadhaar KYC", async () => {
    await driver.$("~NavigationDrawer").waitForDisplayed({ timeout: 8000 });
    await driver.$("~NavigationDrawer").touchAction("tap");
    const DrawerText = await driver.$("~DrawerName").getText();
    expect(DrawerText).toEqual("KARAN XXXX");
    await driver.$("~KYCIcon").touchAction("tap");
    await driver.$("~Full Name Label").waitForDisplayed({ timeout: 8000 });
    const FullNameLabel = await driver.$("~KARAN XXXX Value").getText();
    const DOBLabel = await driver.$("~01-01-1990 Value").getText();
    const AadhaarNumberLabel = await driver.$("~123452001001 Value").getText();
    const AddressLabel = await driver
      .$(
        "~3-184/A/1/, XXXXXXXXXX, XXXXXXXXXX, XXXXXXXXXX, Andhra Pradesh, 500001 Value"
      )
      .getText();
    const VerifyStatusLabel = await driver.$("~SUCCESS Value").getText();

    expect(FullNameLabel).toEqual("KARAN XXXX");
    expect(DOBLabel).toEqual("01-01-1990");
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
    await driver.$("~NavigationDrawer").waitForDisplayed({ timeout: 8000 });
    await driver.$("~NavigationDrawer").touchAction("tap");
    await driver.$("~ProfileIcon").touchAction("tap");
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

describe("Bottom Tab Navigation Testing", () => {
  test("Home Offer Card Present", async () => {
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

describe("EWA test", () => {
  test("Offer Page Back Button Testing", async () => {
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
