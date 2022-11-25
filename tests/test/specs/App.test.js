const {
  default: waitUntil,
} = require("webdriverio/build/commands/browser/waitUntil");

var expect = require("chai").expect;

describe("Simple App testing", () => {
  // Adding time out to make sure the app is load prior to test is run
  beforeEach(() => {
    $("~app-root").waitForDisplayed(11000, false);
  });

  it("Valid Login Test", async () => {
    // $("~mobile-number").waitForDisplayed();
    $("~mobile-number").setValue("9999999999");

    // $("~login").click();
    // expect();

    // $("~loginstatus").waitForDisplayed(11000);
    // const status = $("~loginstatus").getText();
    // expect(status).to.equal('success');
  });

  it("Invalid Login Test", (async) => {
    $("~mobile-number").setValue("9999999999");
    // $('~password').setValue("12345");

    $("~login").click();

    // $("~loginstatus").waitForDisplayed(11000);
    // const status = $("~loginstatus").getText();
    // expect(status).to.equal('fail');
  });
});
