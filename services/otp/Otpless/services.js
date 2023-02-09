import {
  OTPLESS_API_BASE_URL,
  OTPLESS_CLIENTID,
  OTPLESS_CLIENTSECRET,
} from "@env";

const checkVerification = async (waId) => {
  try {
    let data = JSON.stringify({
      waId: waId,
    });
    const response = await fetch(OTPLESS_API_BASE_URL, {
      method: "POST",
      maxBodyLength: Infinity,
      headers: {
        clientId: OTPLESS_CLIENTID,
        clientSecret: OTPLESS_CLIENTSECRET,
        "Content-Type": "application/json",
      },
      body: data,
      redirect: "follow",
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = {
  checkVerification,
};
