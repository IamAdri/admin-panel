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
  ResponsiveContainer,
} from "recharts";
import { getOrders } from "../../services/apiDashboard";
import Spinner from "../../ui/Spinner";
import { eachMonthOfInterval, format, subMonths } from "date-fns";
import Heading from "../../ui/Heading";
import styled from "styled-components";

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
  const {
    isLoading,
    data: ordersData,
    error,
  } = useQuery({
    queryKey: ["ordersRevenue"],
    queryFn: getOrders,
  });
  if (isLoading) return <Spinner />;

  const last6Months = eachMonthOfInterval({
    start: subMonths(new Date(), 6),
    end: subMonths(new Date(), 1),
  }).map((month) => format(month, "MMMM"));

  const groupedOrdersByMonth = JSON.parse(
    JSON.stringify(
      Object.groupBy(ordersData, ({ deliveryDate }) =>
        format(deliveryDate, "MMMM")
      )
    )
  );
  console.log(groupedOrdersByMonth);

  const revenuePerMonth = Object.entries(groupedOrdersByMonth).map(
    ([month, orders]) => {
      if (last6Months.includes(month)) {
        const revenuePerMonth = orders.reduce(
          (acc, order) => acc + order.totalPrice,
          0
        );
        return { name: month, "revenue per month": revenuePerMonth };
      } else {
        return "";
      }
    }
  );
  console.log(revenuePerMonth);
  return (
    <MainDiv>
      <Heading as="h2">Revenu per month in the last 6 months</Heading>

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
          dataKey="revenue per month"
          fill="#8884d8"
          activeBar={<Rectangle fill="#83a6ed" />}
        />
      </BarChart>
    </MainDiv>
  );
}

export default OrdersBar;
/*minWidth: "500px",
          maxWidth: "900px",
          maxHeight: "70vh",*/
