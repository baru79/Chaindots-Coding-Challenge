import {
  Autocomplete,
  AutocompleteChangeReason,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import debounce from "just-debounce-it";
import {
  ChangeEvent,
  KeyboardEvent,
  SyntheticEvent,
  useCallback,
  useState,
} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import useWeatherContext from "../hooks/useWeatherContext";
import { useLocation } from "../hooks/useLocation";
import { AutocompleteOptions } from "../types/weather";

const StyledContainer = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 425px) {
    flex-direction: column;
  }
`;

const StyledButton = styled(Button)`
  height: 40px;

  @media (max-width: 425px) {
    width: 100%;
  }
`;

const StyledHeader = styled.header`
  margin-top: 20px;
`;

const Header = () => {
  const [debouncedLoc, setDebouncedLoc] = useState("");
  const [locationTyped, setLocationTyped] = useState(debouncedLoc);
  const { updateLocationSearched } = useWeatherContext();
  const { loading, errorMessage, options, updateOptions } =
    useLocation(debouncedLoc);

  const matches: boolean = useMediaQuery("(max-width:425px)");

  const debouncedLocation = useCallback(
    debounce((search: string) => setDebouncedLoc(search), 800),
    [locationTyped]
  );

  const handleOnChangeCity = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLocationTyped(value);
  };

  const handleOnKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      debouncedLocation(locationTyped);
    }
  };

  const handleOnChangeAutocomplete = (
    _: SyntheticEvent<Element, Event>,
    value: AutocompleteOptions | null,
    reason: AutocompleteChangeReason
  ) => {
    if (reason === "clear") {
      updateOptions([]);
      updateLocationSearched("");
    }
    if (value) {
      updateLocationSearched(value.url);
    }
  };

  return (
    <StyledHeader>
      <StyledContainer>
        <Autocomplete
          disablePortal
          options={options}
          data-testid={"autocomplete-matches"}
          aria-label={`autocomplete-matches-${matches}`}
          sx={{
            width: matches ? 250 : 400,
          }}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.id}>
                <Typography
                  data-testid={"autocomplete-option-matches"}
                  aria-label={`autocomplete-option-matches-${matches}`}
                  sx={{ color: "text.secondary", fontSize: matches ? 12 : 16 }}
                >
                  {option.label}
                </Typography>
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search city"
              variant="outlined"
              size="small"
              autoComplete="off"
              onChange={handleOnChangeCity}
              onKeyDown={handleOnKeyDown}
              value={locationTyped}
            />
          )}
          onChange={handleOnChangeAutocomplete}
          loading={loading}
          noOptionsText={errorMessage ? errorMessage : "No options"}
        />
        <Link to={"/favorites"}>
          <StyledButton variant="contained">Show favorites</StyledButton>
        </Link>
      </StyledContainer>
    </StyledHeader>
  );
};

export default Header;
