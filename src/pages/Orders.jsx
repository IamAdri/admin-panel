import { useQuery } from "@tanstack/react-query";
import Table from "../ui/Table";
import TableHead from "../ui/TableHead";
import { getOrders } from "../services/apiProducts";
import TableRow from "../ui/TableRow";
import TableData from "../ui/TableData";
import Spinner from "../ui/Spinner";
import List from "../ui/List";

function Orders() {
  const {
    isLoading: isLoadingOrders,
    data: orders,
    error: errorOrders,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
  /*
  const {
    isLoading: isLoadingCustomersDetails,
    data: customersDetails,
    error: errorCustomerDetails,
  } = useQuery({
    queryKey: ["customerDetails"],
    queryFn: getCustomersDetails(),
  });*/
  if (isLoadingOrders) return <Spinner />;

  return (
    <Table>
      <thead>
        <tr>
          <TableHead>Customer email</TableHead>
          <TableHead>Customer address</TableHead>
          <TableHead>Customer phone</TableHead>
          <TableHead>Order</TableHead>
          <TableHead>Total price</TableHead>
          <TableHead>Payment method</TableHead>
          <TableHead>Order placed date</TableHead>
          <TableHead>Delivery Date</TableHead>
          <TableHead>Delivery status</TableHead>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => {
          //console.log(order.products);
          order.products.map((product) => {
            console.log(product.name);
          });
          return (
            <TableRow key={order.id}>
              <TableData>{order.email}</TableData>
              <TableData>adress</TableData>
              <TableData>phone</TableData>
              <TableData>
                {order.products.map((product) => {
                  return (
                    <List>
                      {product.name}: size:{product.size}, color:{" "}
                      {product.color}, quantity:{product.quantity}, price per
                      quantity: {product.pricePerQuantity} EUR
                    </List>
                  );
                })}
              </TableData>
              <TableData>{order.totalPrice} EUR</TableData>
              <TableData>{order.paymentMethod}</TableData>
              <TableData>{order.created_at}</TableData>
              <TableData>{order.deliveryDate}</TableData>
              <TableData>{order.status}</TableData>
            </TableRow>
          );
        })}
      </tbody>
    </Table>
  );
}

export default Orders;
