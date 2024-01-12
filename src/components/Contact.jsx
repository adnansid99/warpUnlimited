import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
// import emailMeLogo from "../assets/emailMeLogo.svg";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { ThemeContext } from "../context/ThemeContext";
// import ContactMe from "./ImagesContainer/ContactMe";

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  // const { enableDarkMode } = useContext(ThemeContext);
  const form = useRef();
  const handleSubmit = async (e) => {
    await e.preventDefault();
    setIsLoading(true);

    await emailjs
      .sendForm(
        "service_ok98y2d",
        "template_l6rwasf",
        form.current,
        "YgCS6pOon35xLYLV9"
      )
      .then(() => {
        toast.success("Message Sent", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
        form.current.reset();
      })
      .catch(() => {
        toast.error("Couldn't sent", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      });
    setIsLoading(false);
    // form.current.reset();
  };

  return (
    <Container
      id="contact"
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100dvh",
      }}
    >
      <ToastContainer />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "1rem",
          width: "30rem",
          // height: "10rem",
        }}
      >
        <Typography sx={{ fontWeight: "bold" }} variant="h4" color="primary">
          Contact Me:
        </Typography>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            justifyContent: "center",
            // alignItems: "center",
          }}
          ref={form}
          onSubmit={handleSubmit}
        >
          <TextField
            color="primary"
            id="outlined-basic"
            label="Full Name"
            variant="outlined"
            type="text"
            name="name"
            autoComplete="off"
            required
          />
          <TextField
            color="primary"
            id="outlined-basic"
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            required
            // sx={{ height: "5rem", resize: }}
          />

          <TextField
            multiline
            rows={6}
            label="Write your message here..."
            name="message"
            // placeholder="type here..."
          />
          <Button type="submit" color="info" variant="contained">
            {isLoading ? (
              <CircularProgress color="background" size={24} />
            ) : (
              <Typography variant="body1">SEND</Typography>
            )}
          </Button>
        </form>
      </Box>
    </Container>
  );
}
