import { useQuery } from "@tanstack/react-query";
import TableData from "../../ui/TableData";
import { getCustomerDetails } from "../../services/apiProducts";
import styled from "styled-components";
import toast from "react-hot-toast";
import { Fragment } from "react";

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
  if (errorCustomerDetails) {
    return toast(`Error: ${errorCustomerDetails.message} Please try again!💥`);
  }
  if (isLoadingCustomersDetails) return;

  return (
    <>
      {customersDetails.map((user) => {
        return (
          <Fragment key={user.id}>
            <TableData>
              <AddressDiv>
                {`${user.streetNumber} ${user.streetName} St., ${user.house} House,
              ZIP ${user.postalCode}`}
              </AddressDiv>
            </TableData>
            <TableData>{user.phone}</TableData>
          </Fragment>
        );
      })}
    </>
  );
}

export default CustomerDetails;
