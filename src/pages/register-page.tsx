import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import useAuthenticatedContext from "../hooks/useAuthenticatedContext";
import { ChangeEvent, useState } from "react";
import { User } from "../types/users";
import { useNavigate } from "react-router-dom";
import { FormGroup, useMediaQuery } from "@mui/material";

const RegisterPage = () => {
  const { register } = useAuthenticatedContext();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const matches: boolean = useMediaQuery("(max-width:375px)");

  const [inputs, setInputs] = useState<Omit<User, "id">>({
    email: "",
    password: "",
    dateCreated: "",
  });

  const handleOnClickRegister = async () => {
    const date = new Date();
    const formattedDate = date.toLocaleString("en-US", {
      timeZoneName: "short",
    });
    const newUser = { ...inputs, dateCreated: formattedDate };
    const user = await register(newUser);
    if (user) {
      navigate("/", { replace: true });
    } else {
      setErrorMessage("User exits! Try to register a new user.");
    }
  };

  const handleOnChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    setInputs({ ...inputs, [name]: value });
  };

  const isDisabled = inputs.email === "" || inputs.password === "";

  return (
    <Sheet
      sx={{
        width: matches ? 220 : 300,
        mx: "auto",
        my: 4,
        py: 3,
        px: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRadius: "sm",
        boxShadow: "md",
      }}
      variant="outlined"
    >
      <div>
        <Typography level="h4" component="h1">
          <b>Welcome!</b>
        </Typography>
        <Typography level="body-sm">Register to continue.</Typography>
      </div>
      <form>
        <FormGroup>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="johndoe@email.com"
              autoComplete="off"
              value={inputs.email}
              onChange={handleOnChangeInput}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="password"
              autoComplete="current-password"
              value={inputs.password}
              onChange={handleOnChangeInput}
            />
          </FormControl>
        </FormGroup>
      </form>
      {errorMessage && (
        <Typography
          sx={{
            fontSize: "sm",
            alignSelf: "left",
            color: "red",
            margin: 0,
            padding: 0,
          }}
        >
          {errorMessage}
        </Typography>
      )}
      <Button
        sx={{ mt: 1 }}
        onClick={handleOnClickRegister}
        disabled={isDisabled}
      >
        Register
      </Button>
      <Typography
        endDecorator={<Link href="/login">Login</Link>}
        sx={{ fontSize: "sm", alignSelf: "center" }}
      >
        {`Have an account?`}
      </Typography>
    </Sheet>
  );
};

export default RegisterPage;
