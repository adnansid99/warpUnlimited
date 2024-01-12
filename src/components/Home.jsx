/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

function CircularProgressWithLabel(props) {
  const { value, errOrSucc } = props;
  // console.log(errOrSucc.stats);
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        color={errOrSucc.stats}
        variant="determinate"
        value={value == 0 ? 100 : value}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {value == 0 ? "try" : `${Math.round(value / 10)}`}
        </Typography>
      </Box>
    </Box>
  );
}

let intervalId;
export default function Home() {
  const [referral, setReferral] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(100);
  const [isResponed, setIsResponed] = useState(false);
  const [statusData, setStatusData] = useState({
    success: 0,
    error: 0,
    stats: "primary",
  });
  const { theme } = useContext(ThemeContext);

  async function getApiData(referral) {
    await axios
      .get(
        `https://8799a74f-1328-4047-bd41-07f5f5dd140d-00-qo9rzr022hhk.kirk.replit.dev/api/v1/${referral}`
      )
      .then((res) => {
        // console.log(res.data);
        if (res.data.statusName == "Success") {
          setStatusData((prev) => {
            return { ...prev, success: prev.success + 1, stats: "success" };
          });
        } else {
          setStatusData((prev) => {
            return { ...prev, error: prev.error + 1, stats: "tertiary" };
          });
        }
      })
      .catch(() => {
        setStatusData((prev) => {
          return { ...prev, error: prev.error + 1, stats: "tertiary" };
        });
      });
  }

  const handleClick = async () => {
    setIsRunning(!isRunning);
  };

  useEffect(() => {
    let progID = 100;
    if (isRunning) {
      getApiData(referral).then(() => {
        setIsResponed(true);
        intervalId = setInterval(() => {
          if (progID === 0) {
            setIsResponed(false);
            getApiData(referral).then(() => setIsResponed(true));
            progID = 100;
          } else {
            progID -= 10;
          }
          setProgress(progID);
        }, 1100);
      });
    } else {
      clearInterval(intervalId);
      setIsResponed(false);
      setProgress(100);
    }
  }, [isRunning]);

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        // flexDirection: "column",
        height: "100dvh",
        justifyContent: "center",
        alignItems: "center",
        // gap: "1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          height: "60%",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          borderRadius: "1rem",
          backgroundColor: "#1c1c1c",
          border: `5px solid ${theme.textColor2}`,
          "&:hover": {
            border: `5px solid ${theme.textColor3}`,
            transform: "scale(1.02)",
          },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            display: "flex",
            fontWeight: "800",
            color: theme.textColor2,
            gap: "1rem",
          }}
        >
          <span style={{ color: "#2a9d8f" }}>
            Added: {statusData.success}GB
          </span>
          <hr
            style={{
              // fontWeight: 700,
              width: "3px",
              backgroundColor: theme.textColor2,
              color: theme.textColor3,
              border: "none",
              opacity: "0.4",
            }}
          />{" "}
          <span style={{ color: "#e63946" }}>Error: {statusData.error}</span>
        </Typography>
        <Typography variant="h5" width={"40%"}>
          <TextField
            onChange={(e) => setReferral(e.target.value)}
            sx={{ color: "white", width: "100%" }}
            id="filled-basic"
            label="Referral ID:"
            variant="filled"
          />
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Button
            sx={{
              fontWeight: "800",
              width: "15%",
              borderRadius: "0.4rem",
            }}
            color={isRunning ? "error" : "secondary"}
            variant="contained"
            onClick={handleClick}
          >
            {isRunning ? "STOP" : "START"}
          </Button>
          {isRunning ? (
            isResponed ? (
              <CircularProgressWithLabel
                value={progress}
                errOrSucc={statusData}
              />
            ) : (
              <CircularProgress size={40} />
            )
          ) : null}
        </Box>
      </Box>
    </Container>
  );
}
