import { useQuery } from "@tanstack/react-query";
import { Cell, Legend, Pie, PieChart } from "recharts";

import Spinner from "../../ui/Spinner";
import Heading from "../../ui/Heading";
import { getRatings } from "../../services/apiDashboard";
import styled from "styled-components";

const colors = ["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c"];

const RADIAN = Math.PI / 180;

function renderCustomizedLabel({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const ncy = Number(cy);

  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={"middle"}
      dominantBaseline="central"
    >
      {percent !== 0 && `${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
}

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 135px;
  @media (max-width: 1500px) {
    margin-left: 55px;
  }
  @media (max-width: 1250px) {
    margin-left: 15px;
  }
`;

function RatingsPie({ isAnimationActive = true }) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["ratings"],
    queryFn: getRatings,
  });
  if (isLoading) return <Spinner />;

  let counter = {
    "1_star": 0,
    "2_stars": 0,
    "3_stars": 0,
    "4_stars": 0,
    "5_stars": 0,
  };
  data.map((review) => {
    if (review.rating === 5) counter["5_stars"] += 1;
    if (review.rating === 4) counter["4_stars"] += 1;
    if (review.rating === 3) counter["3_stars"] += 1;
    if (review.rating === 2) counter["2_stars"] += 1;
    if (review.rating === 1) counter["1_star"] += 1;
  });

  const ratingsData = [
    { name: "5 stars", value: counter["5_stars"] },
    { name: "4 stars", value: counter["4_stars"] },
    { name: "3 stars", value: counter["3_stars"] },
    { name: "2 stars", value: counter["2_stars"] },
    { name: "1 star", value: counter["1_star"] },
  ];
  return (
    <MainDiv>
      <Heading as="h2">Ratings</Heading>
      <PieChart
        style={{
          aspectRatio: 1,
          maxHeight: "100vh",
          maxWidth: "350px",
          minWidth: "250px",
        }}
        responsive
      >
        <Pie
          data={ratingsData}
          labelLine={false}
          label={renderCustomizedLabel}
          isAnimationActive={isAnimationActive}
          outerRadius="100%"
          cy="45%"
        >
          {ratingsData.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
        <Legend
          iconSize={10}
          layout="vertical"
          verticalAlign="middle"
          align="right"
          wrapperStyle={{
            top: "50%",
            right: -10,

            transform: "translate(0, -50%)",
            lineHeight: "25px",
          }}
        />
      </PieChart>
    </MainDiv>
  );
}

export default RatingsPie;
/* minWidth: "250px",
          maxWidth: "550px",
          maxHeight: "100vh",*/
