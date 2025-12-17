import { useQuery } from "@tanstack/react-query";
import Table from "../ui/Table";
import TableHead from "../ui/TableHead";
import { getOrders } from "../services/apiProducts";
import TableRow from "../ui/TableRow";
import TableData from "../ui/TableData";
import Spinner from "../ui/Spinner";
import List from "../ui/List";
import styled from "styled-components";
import Button from "../ui/Button";
import CustomerDetails from "../features/orders/CustomerDetails";
import ModalLayout from "../ui/ModalLayout";
import CloseButton from "../ui/CloseButton";
import toast from "react-hot-toast";

const MainDiv = styled.div`
  max-width: 100vw;
  min-width: 0;
  width: 100%;
  overflow-x: auto;
`;
const OrderDiv = styled.div`
  display: flex;
`;
const NameSpan = styled.span`
  font-weight: 500;
`;
const ProductsModal = styled.div`
  padding: 5px;
`;

function Orders() {
  //Load orders` details
  const {
    isLoading: isLoadingOrders,
    data: orders,
    error: errorOrders,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
  if (errorOrders) {
    return toast(`Error: ${errorOrders.message} Please try again!💥`);
  }
  if (isLoadingOrders) return <Spinner />;

  //Open/close modal for products ordered
  const handleOpenProducts = (e) => {
    e.target.parentNode.lastChild.style.display = "flex";
  };
  const handleCloseProducts = (e) => {
    e.target.closest("div").style.display = "none";
  };

  return (
    <MainDiv>
      <Table>
        <thead>
          <tr>
            <TableHead>Customer email</TableHead>
            <TableHead>Customer address</TableHead>
            <TableHead>Customer phone</TableHead>
            <TableHead>Order</TableHead>
            <TableHead>Total price</TableHead>
            <TableHead>Pay option</TableHead>
            <TableHead>Placed on</TableHead>
            <TableHead>Delivery Date</TableHead>
            <TableHead>Delivery status</TableHead>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <TableRow key={order.id}>
                <TableData>{order.email}</TableData>
                <CustomerDetails email={order.email} />
                <TableData>
                  <OrderDiv>
                    <Button type="tertiary" onClick={handleOpenProducts}>
                      Show products
                    </Button>
                    <ModalLayout>
                      <CloseButton handleCloseModal={handleCloseProducts} />
                      <ProductsModal>
                        {order.products.map((product) => {
                          return (
                            <List key={product.name}>
                              <NameSpan>{product.name}:</NameSpan>{" "}
                              {`size:
                            ${product.size || " no size"}, color: ${
                                product.color
                              }, quantity:
                            ${product.quantity}, price per quantity:
                            ${product.pricePerQuantity} EUR`}
                            </List>
                          );
                        })}
                      </ProductsModal>
                    </ModalLayout>
                  </OrderDiv>
                </TableData>
                <TableData>{order.totalPrice} EUR</TableData>
                <TableData>
                  {order.paymentMethod === "cashPayment" ? "cash" : "card"}
                </TableData>
                <TableData>{order.created_at}</TableData>
                <TableData>{order.deliveryDate}</TableData>
                <TableData>{order.status}</TableData>
              </TableRow>
            );
          })}
        </tbody>
      </Table>
    </MainDiv>
  );
}

export default Orders;
