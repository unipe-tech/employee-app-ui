import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "./constants/Theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    padding: SIZES.padding,
  },
  logo: {
    marginTop: 30,
    width: 250,
    height: 80,
    alignSelf: "center",
  },
  headline: {
    ...FONTS.h4,
    marginTop: 40,
    color: COLORS.secondary,
    textAlign: "center",
  },
  fieldLabel: {
    ...FONTS.body4,
    marginTop: 60,
    color: "#020614",
  },
  textInput: {
    marginLeft: 40,
    width: "80%",
    height: 50,
    borderBottomWidth: 1,
    alignSelf: "center",
    ...FONTS.body4,
  },
  resendText: {
    color: COLORS.primary,
    alignSelf: "center",
    marginTop: 30,
    ...FONTS.h3,
    textDecorationLine: "underline",
  },
  otpInput: {
    alignSelf: "center",
    marginTop: 40,
    width: "70%",
    alignSelf: "center",
    alignItems: "center",
    textAlign: "center",
    height: 50,
    borderBottomWidth: 1,
    ...FONTS.body3,
  },
  ContinueButton: {
    padding: 5,
    alignSelf: "center",
    marginTop: 20,
    width: 320,
    height: 60,
    fontSize: 20,
    backgroundColor: "#4E46F1",
    borderRadius: 6,
  },
  PrimaryButton: {
    alignSelf: "center",
    marginTop: 20,
    width: 320,
    height: 60,
    fontSize: 20,
  },
  ButtonContainer: {
    width: "100%",
    height: "100%",
  },
  flexrow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  otpback: {
    width: 50,
    borderRadius: 40,
    marginLeft: -10,
    marginTop: -10,
  },
  dataUseText: {
    marginTop: 30,
    ...FONTS.body4,
    color: COLORS.gray,
    textAlign: "center",
  },
  termsText: {
    fontWeight: "bold",
    color: "#4E46F1",
  },
  otpreadtxt: {
    marginTop: 20,
    color: COLORS.gray,
    ...FONTS.body4,
    textAlign: "center",
  },
  LoadingButton: {
    padding: 10,
    alignSelf: "center",
    marginTop: 20,
    width: 320,
    height: 60,
    fontSize: 20,
    backgroundColor: "#4E46F1",
    borderRadius: 6,
  },
  Maintitle: {
    marginLeft: 30,
    marginTop: 10,
    color: "black",
    fontSize: 18,
    fontFamily: "Roboto",
  },
});

export const buttons = StyleSheet.create({
  ContinueButton: {
    padding: 10,
    alignSelf: "center",
    marginTop: 50,
    width: 320,
    height: 60,
    fontSize: 20,
  },
  FAB: {
    backgroundColor: "#4E46F1",
  },
});

export const progressBar = StyleSheet.create({
  progressView: {
    marginTop: 20,
  },
  progressBar: {
    width: "100%",
    color: "#4E46F1",
  },
  progressNos: {
    marginLeft: 8,
    marginTop: -3,
    color: "grey",
  },
});

export const form = StyleSheet.create({
  formHeader: {
    marginTop: 20,
    color: COLORS.black,
    ...FONTS.body3,
    alignSelf: "center",
    textAlign: "center",
  },
  formLabel: {
    marginTop: 30,
    color: "grey",
  },
  formTextInput: {
    // marginLeft: 34,
    width: "100%",
    height: 50,
    borderBottomWidth: 1,
    ...FONTS.body4,
  },
  picker: {
    marginTop: 20,
    borderBottomWidth: 2,
  },
  choiceButton: {
    marginTop: 20,
    flex: 1,
    marginHorizontal: 5,
    height: 40,
    backgroundColor: "grey",
  },
  nextButton: {
    padding: 5,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    width: "100%",
    height: 50,
  },
  OtpAwaitMsg: {
    color: "#230C45",
    alignSelf: "center",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    fontFamily: "Roboto",
  },
  userData: {
    color: "#230C45",
    marginLeft: 55,
    marginTop: 10,
    fontSize: 16,
    fontFamily: "Roboto",
  },
  aadharConfirmText: {
    color: "#230C45",
    marginLeft: 69,
    marginTop: 10,
    fontSize: 16,
    fontFamily: "Roboto",
  },
  yesButton: {
    padding: 10,
    marginLeft: 40,
    marginTop: 20,
    width: 150,
    height: 60,
    fontSize: 20,
  },
  noButton: {
    padding: 10,
    marginTop: 20,
    width: 150,
    height: 60,
    fontSize: 20,
  },
  aadharimg: {
    alignSelf: "center",
    marginTop: 20,
    width: 200,
    height: 200,
  },
  aadhaarOr: {
    marginBottom: 20,
    marginTop: 20,
    alignSelf: "center",
    fontSize: 16,
    fontFamily: "Roboto",
  },
  AadharLinkedStatus: {
    marginTop: 30,
    alignSelf: "center",
    color: "#4E46F1",
    width: 300,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  forgotText: {
    marginLeft: "70%",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  year: {
    height: 40,
    width: 40,
    textAlign: "center",
    borderBottomWidth: 1,
  },
  monthday: {
    height: 40,
    width: 40,
    textAlign: "center",
    borderBottomWidth: 1,
  },
  hypenView: { width: 30, alignSelf: "center" },
  hypen: { alignSelf: "center", fontSize: 30 },
});

export const checkBox = StyleSheet.create({
  checkBox: {
    marginTop: 30,
  },
  checkBoxText: {
    marginTop: 30,
    ...FONTS.body4,
    color: COLORS.gray,
  },
  padding: {
    marginTop: 30,
  },
});

export const bankform = StyleSheet.create({
  formtitle: {
    marginTop: 20,
    color: COLORS.gray,
    ...FONTS.body4,
  },
  formatmsg: {
    marginLeft: 34,
    color: "red",
    fontSize: 12,
  },
  formInput: {
    marginLeft: 34,
    width: "80%",
    height: 40,
    borderBottomWidth: 1,
  },
  nextButton: {
    padding: 10,
    alignSelf: "center",
    marginTop: 40,
    width: 320,
    height: 60,
    fontSize: 20,
  },
  padding: {
    marginTop: 30,
  },
  infoCard: {
    backgroundColor: "rgba(78, 70, 241, 0.1)",
    width: "100%",

    marginTop: 20,
    padding: 10,
    flex: 0,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  infoText: {
    width: "90%",
    paddingLeft: 5,
    ...FONTS.body4,
    color: COLORS.black,
  },
  Maintitle: {
    marginTop: 20,
    color: COLORS.black,
    alignSelf: "center",
    ...FONTS.body3,
  },
  subTitle: {
    marginTop: 20,
    color: COLORS.black,
    alignSelf: "center",
    ...FONTS.body3,
  },
  asterisk: { fontWeight: "bold", color: "#4E46F1" },
});

export const homeCard = StyleSheet.create({
  card: {
    marginTop: 20,
    width: 170,
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: "Roboto",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 12,
    fontFamily: "Roboto",
  },
  downloadIcon: {
    marginTop: 30,
    color: "#4E46F1",
  },
  downloadText: {
    marginTop: 30,
    fontSize: 12,
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: "#4E46F1",
  },
});

export const nav = StyleSheet.create({
  titleLogo: {
    width: 160,
    height: 80,
  },
  navbar: {
    height: 80,
  },
});

export const docSearch = StyleSheet.create({
  searchBar: {
    marginLeft: 20,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  searchIcon: {
    marginTop: 20,
  },
  searchInput: {
    width: 320,
    borderBottomWidth: 2,
    textAlignVertical: "center",
  },
});
export const Camera = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  capture: {
    flex: 0,
    backgroundColor: "#4E46F1",
    borderRadius: 10,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    marginTop: 450,
  },
  wait: {
    flex: 1,
    width: "100%",
    backgroundColor: "#4E46F1",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    flex: 1,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
  back: {
    backgroundColor: "rgba(78, 70, 241, 0.9)",
    borderRadius: 30,
    padding: 10,
    alignSelf: "center",
    marginTop: 10,
    marginLeft: -SIZES.width * 0.8,
  },
  cameraButton: {
    marginLeft: 30,
    marginTop: 20,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 30,
  },
  previewImage: {
    height: 200,
    width: "100%",
  },
});

export const welcome = StyleSheet.create({
  title: {
    marginLeft: 34,
    marginTop: 20,
    color: "black",
    fontSize: 14,
    fontFamily: "Roboto",
  },
  mainTitle: {
    marginTop: 20,
    marginLeft: 30,
    color: "black",
    fontWeight: "bold",
    fontSize: 22,
    fontFamily: "Roboto",
  },
  subTitle: {
    marginTop: 20,
    alignSelf: "center",
    justifyContent: "center",
    color: "black",
    fontSize: 18,
    fontFamily: "Roboto",
  },
  steps: { alignSelf: "center", flex: 1 },
});

export const selfie = StyleSheet.create({
  iconButton: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 20,
  },
  buttonRow: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 20,
  },
  selfie: {
    marginTop: 20,
    alignSelf: "center",
    height: SIZES.width / 1.3,
    width: SIZES.width / 1.3,
    borderRadius: 5,
  },
});

export const esic = StyleSheet.create({
  CollapseTitle: {
    marginLeft: 34,
    marginTop: 20,
    color: "#4E46F1",
    fontSize: 14,
    fontFamily: "Roboto",
  },
});

export const license = StyleSheet.create({
  authority: {
    color: "#4E46F1",
    marginLeft: "20%",
    fontSize: 12,
    fontFamily: "Roboto",
  },
  valid: {
    color: "green",
    marginLeft: "10%",
    fontSize: 12,
    fontFamily: "Roboto",
  },
  invalid: {
    color: "red",
    marginLeft: "20%",
    fontSize: 12,
    fontFamily: "Roboto",
  },
});

export const card = StyleSheet.create({
  alertCard: {
    marginTop: 20,
    padding: 10,
    flexDirection: "column",
  },
  infoText: {
    fontSize: 16,
  },
  alertText: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
    textDecorationLine: "underline",
    paddingLeft: 10,
    paddingTop: 10,
  },
});

export const dev = StyleSheet.create({
  title: {
    alignSelf: "center",
    marginTop: 20,
    width: "60%",
  },
});

export const stepIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#4E46F1",
  stepStrokeWidth: 3,
  separatorStrokeFinishedWidth: 4,
  stepStrokeFinishedColor: "#4E46F1",
  stepStrokeUnFinishedColor: "#aaaaaa",
  separatorFinishedColor: "#4E46F1",
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: "#E5EAF7",
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 14,
  currentStepIndicatorLabelFontSize: 14,
  stepIndicatorLabelCurrentColor: "#4E46F1",
  stepIndicatorLabelFinishedColor: "#4E46F1",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#999999",
  labelSize: 14,
  currentStepLabelColor: "#4E46F1",
  labelAlign: "flex-start",
};
