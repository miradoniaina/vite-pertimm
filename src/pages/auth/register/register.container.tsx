import { useNavigate } from "react-router-dom";
import Register from "./register";
import { useMutation } from "@tanstack/react-query";
import { User } from "@/type/user";
import { registerApi } from "./register.api";
import { RegisterFormValues } from "./register-form.schema";
import { useState } from "react";
import { AxiosError } from "axios";

export function RegisterContainer() {
  const navigate = useNavigate();

  const { mutateAsync } = useMutation<
    User,
    Error,
    {
      email: string;
      password1: string;
      password2: string;
      url_format: string;
      email_format: string;
    }
  >({
    mutationFn: registerApi,
  });

  const [errorMsg, setErrorMsg] = useState<string | undefined>();

  const handleSubmit = async (data: RegisterFormValues) => {
    try {
      const result = await mutateAsync({
        email: data.email,
        password1: data.password,
        password2: data.confirmPassword,
        email_format: data.email,
        url_format: "#",
      });

      if (!result.token) {
        throw new Error(UNEXPECTED_ERROR_MSG);
      }

      localStorage.setItem("token", result.token);
      navigate("/");
    } catch (err) {
      const message = (err as AxiosError)?.response?.data?.message;

      switch (message) {
        default:
          setErrorMsg(UNEXPECTED_ERROR_MSG);
      }
    }
  };

  return <Register onSubmit={handleSubmit} errorMsg={errorMsg} />;
}

const UNEXPECTED_ERROR_MSG =
  "Une erreur inattendue s'est produite. Veuillez réessayer plus tard.";
