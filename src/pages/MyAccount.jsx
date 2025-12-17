import styled from "styled-components";
import Heading from "../ui/Heading";
import { RxAvatar } from "react-icons/rx";
import { useQuery } from "@tanstack/react-query";
import { getAdminDetails } from "../services/apiAdmin";
import Spinner from "../ui/Spinner";
import toast from "react-hot-toast";
import AdminDetails from "../features/myaccount/AdminDetails";
import AdminCredentials from "../features/myaccount/AdminCredentials";

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;
`;
const SectionDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;
const RowDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 55px;
`;
const Avatar = styled.img`
  width: 150px;
  border-radius: 100%;
`;

function MyAccount() {
  //Load admin details and credentials
  const {
    isLoading,
    data,
    error: getAdminDetailsError,
  } = useQuery({
    queryKey: ["adminDetails"],
    queryFn: getAdminDetails,
  });
  if (getAdminDetailsError) {
    return toast(`Error: ${getAdminDetailsError.message} Please try again!💥`);
  }
  if (isLoading) return <Spinner />;

  return (
    <MainDiv>
      <SectionDiv>
        <Heading as="h2">My account</Heading>
        <RowDiv>
          {<Avatar src="./avatar.jpg" alt="avatar" /> || (
            <RxAvatar size={150} />
          )}
          {data.map((admin) => {
            return <AdminDetails admin={admin} key={admin.id} />;
          })}
        </RowDiv>
      </SectionDiv>
      <SectionDiv>
        {data.map((admin) => {
          return <AdminCredentials admin={admin} key={admin.id} />;
        })}
      </SectionDiv>
    </MainDiv>
  );
}

export default MyAccount;
