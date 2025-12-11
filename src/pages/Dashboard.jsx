import styled from "styled-components";
import OrdersBar from "../features/dashboard/OrdersBar";
import RatingsPie from "../features/dashboard/RatingsPie";
import { ResponsiveContainer } from "recharts";

const MainDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  justify-content: center;
  @media (max-width: 1150px) {
    flex-direction: column;
  }
`;
export function Dashboard() {
  return (
    <MainDiv>
      <RatingsPie />
      <OrdersBar />
    </MainDiv>
  );
}

export default Dashboard;
