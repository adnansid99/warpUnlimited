import { Box, Container, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

export default function NavBar() {
  const { theme } = useContext(ThemeContext);
  const navItems = [
    { url: "/", name: "Home" },
    { url: "/howtouse", name: "HowToUse" },
    { url: "/contact", name: "Contact" },
  ];
  // const navLinks =
  return (
    <Box sx={{ backgroundColor: "#1f1f1f", position: "fixed", width: "100%" }}>
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 0",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "800", color: theme.textColor3 }}
        >
          WARP UNLIMITED
        </Typography>
        <Typography variant="h6" sx={{ display: "flex" }}>
          {navItems.map((item, index) => {
            return (
              <NavLink
                key={index}
                to={item.url}
                activeClassName="active"
                className="nav-link"
                style={{
                  textDecoration: "none",
                  color: theme.textColor2,
                  margin: "0 0.5rem",
                  padding: "0.2rem 0.6rem",
                  borderRadius: "0.5rem",
                  //   "&:hover": {
                  //     color: `${theme.textColor3} !important`,
                  //   },
                }}
              >
                {item.name}
              </NavLink>
            );
          })}
        </Typography>
      </Container>
    </Box>
  );
}
