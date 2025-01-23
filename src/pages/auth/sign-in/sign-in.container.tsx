import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignIn from "./sign-in";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { loginApi } from "./sign-in.api";
import { User } from "@/type/user";

export function SignInContainer() {
  const { mutateAsync } = useMutation<
    User,
    Error,
    {
      email: string;
      password: string;
    }
  >({
    mutationFn: loginApi,
  });

  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string | undefined>();

  const handleSubmit = async (data: { email: string; password: string }) => {
    try {
      const result = await mutateAsync(data);

      if (!result.token) {
        setErrorMsg(UNEXPECTED_ERROR_MSG);
        return;
      }

      localStorage.setItem("token", result.token); 
      navigate("/");
    } catch (err) {
      const message = (err as AxiosError)?.response?.data?.message;

      switch (message) {
        case "Wrong auth credentials":
          setErrorMsg(WRONG_CREDENTIALS_ERROR_MSG);
          break;
        default:
          setErrorMsg(UNEXPECTED_ERROR_MSG);
      }
    }
  };

  return <SignIn onSubmit={handleSubmit} errorMsg={errorMsg} />;
}

const WRONG_CREDENTIALS_ERROR_MSG =
  "Identifiants incorrects. Veuillez vérifier votre email et mot de passe.";

const UNEXPECTED_ERROR_MSG =
  "Une erreur inattendue s'est produite. Veuillez réessayer plus tard.";
