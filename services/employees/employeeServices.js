import axios from "axios";

import { EMPLOYEE_API_URL } from "../constants";

export const putBackendData = (props) => {
  const data = JSON.stringify(props.document);
  const url = `${EMPLOYEE_API_URL}/${props.xpath}`;

  const config = {
    method: "post",
    url,
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };

  return axios(config);
};

export const getBackendData = async (props) => {
  console.log("getBackendData for ", props.xpath);
  const {params} = props;
  const url = `${EMPLOYEE_API_URL}/${props.xpath}`;
  const res = await axios.get(url, { params });
  return res;
};
