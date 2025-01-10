import { useNavigate } from "react-router-dom";

const useBackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return goBack;
};

export default useBackButton;
