import React from "react";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Listings from "./pages/Listings";
import ListingDetail from "./pages/ListingDetail";
import Sell from "./pages/Sell";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { Layout } from "./layout";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import { Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="listings" element={<Listings />} />
        <Route path="listings/:id" element={<ListingDetail />} />
        <Route
          path="sell"
          element={
            <ProtectedRoute>
              <Sell />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/terms" element={<TermsAndConditions />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
