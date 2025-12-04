import { useQuery } from "@tanstack/react-query";
import TableData from "../../ui/TableData";
import { getCustomerDetails } from "../../services/apiProducts";
import styled from "styled-components";

const AddressDiv = styled.div`
  width: 200px;
`;

function CustomerDetails({ email }) {
  //Load user details based on email
  const {
    isLoading: isLoadingCustomersDetails,
    data: customersDetails,
    error: errorCustomerDetails,
  } = useQuery({
    queryKey: ["customerDetails", email],
    queryFn: () => getCustomerDetails(email),
  });
  if (isLoadingCustomersDetails) return;

  return (
    <>
      {customersDetails.map((user) => {
        return (
          <>
            <TableData>
              <AddressDiv>
                {`${user.streetNumber} ${user.streetName} St., ${user.house} House,
              ZIP ${user.postalCode}`}
              </AddressDiv>
            </TableData>
            <TableData>{user.phone}</TableData>
          </>
        );
      })}
    </>
  );
}

export default CustomerDetails;
