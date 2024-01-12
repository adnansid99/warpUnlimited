import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { useState } from "react";
import image1 from "../assets/androidImg/1.jpg";
import image2 from "../assets/androidImg/2.jpg";
import image3 from "../assets/androidImg/3.jpg";
import image4 from "../assets/androidImg/4.jpg";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<PlayArrowIcon sx={{ fontSize: "1rem", margin: "0 0.5rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function HowToUse() {
  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const stepObj = [
    {
      step: "1. Open the 1.1.1.1 app on your Android device.",
      img: null,
    },
    {
      step: "2. Tap on the menu icon (usually three dots or lines) in the top right corner.",
      img: <img src={image1} width="200px" alt="Step 2" />,
    },

    {
      step: '3. Tap on the "Advanced" section.',
      img: <img src={image2} width="200px" alt="Step 4" />,
    },
    {
      step: '4. Tap on the "Diagnostics" section.',
      img: <img src={image3} width="200px" alt="Step 4" />,
    },
    {
      step: '5. Under the "CLIENT CONFIGURATION" section, you\'ll see the client configuration ID.',
      img: <img src={image4} width="200px" alt="Step 5" />,
    },
    {
      step: "6. Long-press on the ID to copy it.",
      img: null,
    },
  ];

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        height: "100dvh",
        placeContent: "center",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Accordion
        sx={{
          marginTop: "1rem",
          display: "flex",
          flexDirection: "column",
          // height: "100%",
          justifyContent: "center",
          // alignItems: "center",
        }}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>For Android</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {stepObj.map((steps, index) => {
            return (
              <Typography key={index} variant="h6" fontWeight={600}>
                {steps.step}
                {steps.img}
              </Typography>
            );
          })}
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>For Windows</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}
