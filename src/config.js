const hostApi = process.env.NODE_ENV === "development"
    ? "http://localhost"
    : "https://nft.xsigma.ga";
const portApi = process.env.NODE_ENV === "development" ? 8080 : "";
const baseURLApi = 'https://nft.xsigma.ga/api';
const redirectUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://xsigma-nft-admin.vercel.app";

export default {
  hostApi,
  portApi,
  baseURLApi,
  redirectUrl,
  remote: "https://nft.xsigma.ga",
  isBackend: process.env.REACT_APP_BACKEND || true,
  auth: {
    email: "",
    password: ""
  }
};
