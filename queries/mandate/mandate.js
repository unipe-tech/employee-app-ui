import { useMutation, useQuery } from "@tanstack/react-query";
import { getBackendData } from "../../services/employees/employeeServices";
import { mandatePush } from "../../helpers/BackendPush";
import {
  createCustomer,
  createOrder,
} from "../../services/mandate/Razorpay/services";

export const updateMandate = () => {
  const mutation = useMutation({
    mutationFn: async ({ data, token }) => {
      return mandatePush({
        data,
        token,
      });
    },
  });
  return mutation;
};

export const createMandateOrder = () => {
  const mutation = useMutation({
    mutationFn: async ({
      authType,
      customerId,
      accountHolderName,
      accountNumber,
      ifsc,
      aCTC,
      unipeEmployeeId,
    }) => {
      return createOrder({
        authType,
        customerId,
        accountHolderName,
        accountNumber,
        ifsc,
        aCTC,
        unipeEmployeeId,
      });
    },
  });
  return mutation;
};

export const createMandateCustomer = () => {
  const mutation = useMutation({
    mutationFn: async ({ name, email, contact, unipeEmployeeId }) => {
      return createCustomer({
        name,
        email,
        contact,
        unipeEmployeeId,
      });
    },
  });
  return mutation;
};

export const getMandate = ({ unipeEmployeeId, token }) => {
  const response = useQuery({
    queryKey: ["getMandate"],
    queryFn: async () => {
      return getBackendData({
        params: { unipeEmployeeId: unipeEmployeeId },
        xpath: "mandate",
        token: token,
      });
    },
    config: {
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: 1000 * 60 * 60 * 24,
      refetchInterval: 1000 * 60 * 60 * 24,
    },
  });
  return response;
};
