import styled from "styled-components";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import { IoLogOutOutline } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import { logOut } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;

  gap: 15px;
`;
function SignOut() {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      sessionStorage.removeItem("user");
      navigate("/login");
      window.location.reload(false);

      //console.log(user);
    },
    onError: () => {
      toast.error("Could not log out. Please try again!");
    },
  });
  const handleLogOut = () => {
    mutate();
  };
  return (
    <MainDiv>
      <Heading as="h2">Please log out here!</Heading>
      <Button selfalign="start" onClick={handleLogOut}>
        <p>Log out</p>
        <IoLogOutOutline size={20} />
      </Button>
    </MainDiv>
  );
}

export default SignOut;
