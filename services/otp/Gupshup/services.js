import { GUPSHUP_PASSWORD, GUPSHUP_USERID } from "@env";

const SendSmsVerification = async (phoneNumber) => {
  try {
    let params = {
      userid: GUPSHUP_USERID,
      password: GUPSHUP_PASSWORD,
      method: "TWO_FACTOR_AUTH",
      v: "1.1",
      phone_no: phoneNumber,
      msg: "Welcome%20to%20Unipe%21%20Your%20Verification%20code%20is%20%25code%25%2E",
      format: "JSON",
      otpCodeLength: "6",
      otpCodeType: "NUMERIC",
    };

    let query = Object.keys(params)
      .map((k) => k + "=" + params[k])
      .join("&");
    const response = await fetch(
      `https://enterprise.smsgupshup.com/GatewayAPI/rest?` + query,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error);
    return false;
  }
};

const CheckVerification = async (phoneNumber, code) => {
  try {
    let params = {
      userid: GUPSHUP_USERID,
      password: GUPSHUP_PASSWORD,
      method: "TWO_FACTOR_AUTH",
      v: "1.1",
      phone_no: phoneNumber,
      format: "JSON",
      otp_code: code,
    };

    let query = Object.keys(params)
      .map((k) => k + "=" + params[k])
      .join("&");
    const response = await fetch(
      `https://enterprise.smsgupshup.com/GatewayAPI/rest?` + query,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = {
  SendSmsVerification,
  CheckVerification,
};
