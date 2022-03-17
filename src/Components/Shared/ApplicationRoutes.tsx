import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  TransactionPage,
  ErrorPage,
  AboutPage,
  NFTPage,
  InformationPage,
} from "../../Pages";

const ApplicationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TransactionPage />} />
      <Route path="/NFT" element={<NFTPage />} />
      <Route path="/About" element={<AboutPage />} />
      <Route path="/Information" element={<InformationPage />} />     
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default ApplicationRoutes;
