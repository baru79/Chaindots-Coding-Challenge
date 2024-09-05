import { PropsWithChildren } from "react";
import styled from "styled-components";
import useAuthenticatedContext from "../hooks/useAuthenticatedContext";
import { Button } from "@mui/joy";
import { Divider, Typography, useMediaQuery } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import useWeatherContext from "../hooks/useWeatherContext";

const StyledContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledButton = styled(Button)`
  width: 70px;
  height: 40px;
  margin-left: 0;

  @media (max-width: 425px) {
    width: 40px;
    height: 10px;
  }
`;

const LayoutPage = ({ children }: PropsWithChildren) => {
  const { logout } = useAuthenticatedContext();
  const { updateLocationSearched } = useWeatherContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const matches: boolean = useMediaQuery("(max-width:425px)");

  const handleOnClickLogout = () => {
    logout();
    updateLocationSearched("");
  };

  return (
    <main>
      <StyledContainer>
        {pathname !== "/" && (
          <StyledButton onClick={() => navigate(-1)}>
            <Typography
              sx={{ fontSize: matches ? 12 : 16, textAlign: "center" }}
            >
              Back
            </Typography>
          </StyledButton>
        )}
        <Typography sx={{ fontSize: matches ? 16 : 24, textAlign: "center" }}>
          Challenge - Chaindots
        </Typography>
        <StyledButton onClick={handleOnClickLogout}>
          <LogoutIcon sx={{ fontSize: matches ? 20 : 24 }} />
        </StyledButton>
      </StyledContainer>
      <Divider />
      {children}
    </main>
  );
};

export default LayoutPage;
