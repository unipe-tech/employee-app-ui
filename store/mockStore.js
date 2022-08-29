const store = {
  // Auth

  auth: {
    id: 1,
    phoneNumber: "9876543210",
    verifyStatus: "PENDING",
  },

  // Aadhaar

  aadhaar: {
    data: {
      aadhaar_data: {
        name: "Xyz garg",
      },
    },
    number: "789456123010",
    submitOTPtxnId: "987",
    verifyMsg: "This otp has been sent",
    verifyStatus: "PENDING",
  },

  // Bank

  bank: {
    accountNumber: "157894561230",
    ifsc: "INDB0000123",
    upi: "9876543210@upi",
    accountHolderName: "Xyz Goyal",
    verifyStatus: "PENDING",
    verifyMsg: "The verification is pending",
    bankName: "IndusInd Bank",
    bankBranch: "Mumbai",
    branchCity: "Mumbai",
  },

  // ESIC

  esic: {
    portal: { estCode: "", ipNumber: "" },
    familyDetails: {
      fatherHusband: { relation: "", name: "" },
      nominee: { relation: "", name: "" },
    },
    address: {
      present: { street: "", state: "", district: "", pincode: "" },
      permanent: { street: "", state: "", district: "", pincode: "" },
      nominee: { street: "", state: "", district: "", pincode: "" },
    },
  },

  // License

  license: {
    number: "",
    name: "",
    dob: "",
    bloodGroup: "",
    classes: {},
    rto: {},
    validity: {},
    verifyMsg: "",
    verifyStatus: "PENDING",
  },

  // Navigation

  navigation: { currentScreen: "Welcome" },

  // PAN

  pan: {
    dob: "02/02/2002",
    email: "xyz@unipe.co",
    gender: "Male",
    name: "Xyz Goyal",
    number: "ABCDE1234F",
    verifyMsg: "Verification Pending",
    verifyStatus: "PENDING",
  },

  // Profile

  profile: {
    maritalStatus: "Married",
    educationalQualification: "12th pass",
    alternatePhone: "+913216549870",
    email: "abc@unipe.co",
    selfie: "",
  },

  // Timer

  timer: { login: 2 * 60, aadhaar: 10 * 60 },
};

export default store;
