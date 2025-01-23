import { useNavigate } from "react-router-dom";
import Register from "./register";

export function RegisterContainer() {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      navigate("/");
    } catch (err) {
    }
  };

  return <Register onSubmit={handleSubmit} errorMsg={''} />;
}

