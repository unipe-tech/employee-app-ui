import { useSelector } from "react-redux";
import React, { useEffect } from "react";

export const isKycCompleted = (
  profileComplete,
  aadhaarVerifyStatus,
  panVerifyStatus,
  bankVerifyStatus
) => {
  if (
    !profileComplete ||
    aadhaarVerifyStatus != "SUCCESS" ||
    panVerifyStatus != "SUCCESS" ||
    bankVerifyStatus != "SUCCESS"
  ) {
    return false;
  } else return true;
};
