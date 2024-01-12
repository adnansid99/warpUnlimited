import { Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import HowToUse from "./HowToUse";
import Contact from "./Contact";

export default function Index() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/howtouse" element={<HowToUse />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}
