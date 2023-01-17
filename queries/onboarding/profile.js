import { useMutation, useQuery } from "@tanstack/react-query";
import { profileBackendPush } from "../../helpers/BackendPush";
import { getBackendData } from "../../services/employees/employeeServices";

export const updateProfile = () => {
  const mutation = useMutation({
    mutationFn: async ({ data, token }) => {
      return profileBackendPush({
        data,
        token,
      });
    },
  });
  return mutation;
};

export const getProfile = ({ unipeEmployeeId, token }) => {
  const response = useQuery({
    queryKey: ["getProfile"],
    queryFn: async () => {
      return getBackendData({
        params: { unipeEmployeeId: unipeEmployeeId },
        xpath: "profile",
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
