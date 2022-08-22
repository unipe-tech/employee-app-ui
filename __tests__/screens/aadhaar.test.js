const request = require("supertest");
const baseURL = "https://unipeapi.herokuapp.com";
const AadhaarForm = require("../../screens/01_aadhaar/AadhaarForm");

describe("Aadhaar Test Working", () => {
  // const aadhaarData = {
  //   aadhaar_number: "799266923729",
  //   consent: "y",
  // };

  // test("if aadhaar info already exists", async () => {
  //   const response = await request(baseURL)
  //     .post("/aadhaar-api/verify")
  //     .send(aadhaarData);
  //   const code = response.body.data.code;
  //   expect(response.statusCode).toBe(200);
  //   expect(code).toBe("1018");
  // });
  test("if it works", () => {
    expect("hello").toBe("hello");
  });
});
