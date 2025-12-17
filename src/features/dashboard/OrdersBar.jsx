import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { getOrders } from "../../services/apiDashboard";
import Spinner from "../../ui/Spinner";
import { eachMonthOfInterval, format, subMonths } from "date-fns";
import Heading from "../../ui/Heading";
import styled from "styled-components";
import toast from "react-hot-toast";

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-right: 135px;
  @media (max-width: 1500px) {
    margin-right: 55px;
  }
  @media (max-width: 1250px) {
    margin-right: 15px;
  }
`;

function OrdersBar() {
  //Load orders prices from orders table
  const {
    isLoading,
    data: ordersData,
    error,
  } = useQuery({
    queryKey: ["ordersRevenue"],
    queryFn: getOrders,
  });
  if (error) {
    return toast(`Error: ${error.message} Please try again!💥`);
  }
  if (isLoading) return <Spinner />;

  //Get the last 6 months
  const last6Months = eachMonthOfInterval({
    start: subMonths(new Date(), 6),
    end: subMonths(new Date(), 1),
  }).map((month) => format(month, "MMMM"));

  //Group orders by month
  const groupedOrdersByMonth = JSON.parse(
    JSON.stringify(
      Object.groupBy(ordersData, ({ deliveryDate }) => {
        if (deliveryDate === null) return;
        return format(deliveryDate, "MMMM");
      })
    )
  );

  //Calculate revenue for each each month from last 6 past months and return an array with month and revenue
  const revenuePerMonth = Object.entries(groupedOrdersByMonth)
    .map(([month, orders]) => {
      if (last6Months.includes(month)) {
        const revenuePerMonth = orders.reduce(
          (acc, order) => acc + order.totalPrice,
          0
        );
        return { name: month, revenue: revenuePerMonth };
      }
    })
    .filter((revenue) => {
      return revenue !== undefined;
    });

  return (
    <MainDiv>
      <Heading as="h2">Revenue per month in the last 6 months</Heading>
      <BarChart
        style={{
          maxHeight: "350px",
          aspectRatio: 1.618,
          maxWidth: "750px",
          minWidth: "250px",
        }}
        responsive
        data={revenuePerMonth}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis width="auto" />
        <Tooltip />
        <Legend name="last 6 months" />
        <Bar
          dataKey="revenue"
          fill="#8884d8"
          activeBar={<Rectangle fill="#83a6ed" />}
        />
      </BarChart>
    </MainDiv>
  );
}

export default OrdersBar;
