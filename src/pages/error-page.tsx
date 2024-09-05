import { useRouteError } from "react-router-dom";
import styled from "styled-components";

const StyledContainer = styled.div`
  margin: 0;
  display: flex;
  flex-direction: column;
  place-items: center;
  justify-content: center;
  min-width: 320px;
  min-height: 100vh;
`;

const ErrorPage = () => {
  const err: unknown = useRouteError();
  const errorMessage = `${(err as { statusText?: string }).statusText}`;

  return (
    <StyledContainer>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{errorMessage}</p>
    </StyledContainer>
  );
};

export default ErrorPage;
