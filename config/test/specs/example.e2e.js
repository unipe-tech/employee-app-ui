var expect = require("chai").expect;

beforeEach(() => {
  driver.launchApp();
});

afterEach(() => {
  driver.closeApp();
});

describe("Verify Login Scenarios on Facebook React Native Mobile App", () => {
  it("User should be able to login using valid credentials to Facebook Mobile App", () => {
    $(`~Username`).waitForDisplayed(20000);
    $(`~Username`).setValue("Valid-Email");
    $(`~Password`).waitForDisplayed(20000);
    $(`~Password`).setValue("Valid-Password");
    $("~Log In").click();
    browser.pause(10000);
  });

  it("User should not be able to login with invalid credentials to Facebook Mobile App", () => {
    $(`~Username`).waitForDisplayed(20000);
    $(`~Username`).setValue("Invalid-Email");
    $(`~Password`).waitForDisplayed(20000);
    $(`~Password`).setValue("Invalid-Password");
    $("~Log In").click();
    $(
      '//android.widget.TextView[@resource-id="com.facebook.katana:id/(name removed)"]'
    ).waitForDisplayed(11000);
    const status = $(
      '//android.widget.TextView[@resource-id="com.facebook.katana:id/(name removed)"]'
    ).getText();
    expect(status).to.equal(`You Can't Use This Feature Right Now`);
  });

  it("Test Case should Fail Because of Invalid Element", () => {
    $(`~Username`).waitForDisplayed(20000);
    $(`~Username`).setValue("Invalid-Email");
    $(`~Password`).waitForDisplayed(20000);
    $(`~Password`).setValue("Invalid-Pasword");
    $("~Log In").click();
    $(
      '//android.widget.TextView[@resource-id="com.facebook.katana:id/(name removed)"'
    ).waitForDisplayed(11000);
    const status = $(
      '//android.widget.TextView[@resource-id="com.facebook.katana"'
    ).getText();
    expect(status).to.equal(`You Can't Use This Feature Right Now`);
  });
});
