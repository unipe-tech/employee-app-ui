export const setValue = ({ ref, value }) => {
  console.log("setValue", ref, value);
  ref.current = value;
};
