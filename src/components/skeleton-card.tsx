import { Card, CardContent, CardHeader, Skeleton } from "@mui/material";
import styled from "styled-components";

const StyledCard = styled(Card)`
  width: 293px;
  height: 270px;
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SkeletonCard = () => {
  return (
    <StyledCard title="skeleton-card">
      <CardHeader
        avatar={
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
        }
        title={
          <Skeleton
            animation="wave"
            height={15}
            width="80%"
            style={{ marginBottom: 6 }}
          />
        }
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
        action={
          <Skeleton
            animation="wave"
            variant="circular"
            width={20}
            height={20}
          />
        }
      ></CardHeader>
      <StyledCardContent>
        <Skeleton
          animation="wave"
          height={3}
          width="100%"
          style={{ marginBottom: 10 }}
        />
        <Skeleton animation="wave" height={15} width="80%" />
        <Skeleton animation="wave" height={15} width="70%" />
        <Skeleton animation="wave" height={15} width="40%" />
        <Skeleton animation="wave" height={15} width="70%" />
      </StyledCardContent>
    </StyledCard>
  );
};

export default SkeletonCard;
