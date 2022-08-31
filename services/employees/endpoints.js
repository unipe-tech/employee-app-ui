import {
  STAGE,
  EMPLOYEE_DEV_API_BASE_URL,
  EMPLOYEE_TEST_API_BASE_URL,
  EMPLOYEE_PROD_API_BASE_URL,
  OG_API_BASE_URL,
  OG_API_BASE_URL_MOCK,
} from "@env";

const API = () => {
  if (STAGE === "dev") {
    return EMPLOYEE_DEV_API_BASE_URL;
  } else if (STAGE === "test") {
    return EMPLOYEE_TEST_API_BASE_URL;
  } else {
    return EMPLOYEE_PROD_API_BASE_URL;
  }
};

const OGAPI = () => {
  if (STAGE === "dev") {
    return OG_API_BASE_URL_MOCK;
  } else {
    return OG_API_BASE_URL;
  }
};

export const EMPLOYEE_API_BASE_URL = API();

export const MOBILE_ONBOARD_API = `${EMPLOYEE_API_BASE_URL}/mobile`;
export const AADHAR_ONBOARD_API = `${EMPLOYEE_API_BASE_URL}/aadhaar`;
export const PAN_ONBOARD_API = `${EMPLOYEE_API_BASE_URL}/pan`;
export const BANK_ONBOARD_API = `${EMPLOYEE_API_BASE_URL}/bank`;
export const PROFILE_ONBOARD_API = `${EMPLOYEE_API_BASE_URL}/profile`;
export const FAMILY_DETAILS_ONBOARD_API = `${EMPLOYEE_API_BASE_URL}/esic/family`;
export const ADDRESS_ONBOARD_API = `${EMPLOYEE_API_BASE_URL}/esic/address`;
export const PORTAL_ONBOARD_API = `${EMPLOYEE_API_BASE_URL}/esic/portal`;
export const GET_DOCUMENTS_API = `${EMPLOYEE_API_BASE_URL}/documents`;

export const OG_API_BASE = OGAPI();
export const OG_AADHAAR_GENERATE_OTP_API = `${OG_API_BASE}/aadhaar-api/boson/generate-otp`;
export const OG_AADHAAR_SUBMIT_OTP_API = `${OG_API_BASE}/aadhaar-api/boson/submit-otp`;
export const OG_AADHAAR_VERIFY_API = `${OG_API_BASE}/aadhaar-api/verify`;
export const OG_PAN_VERIFY_API = `${OG_API_BASE}/pan-api/fetch-detailed`;
export const OG_BANK_VERIFY_API = `${OG_API_BASE}/bank-api/verify`;

export const TIMEOUT = 5 * 60;
