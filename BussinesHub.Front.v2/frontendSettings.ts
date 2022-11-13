/*global getPublicSettings*/
export default {
  IsProduction: process.env.NODE_ENV === "production",
  ApiUrl: "https://localhost:7003/",
  BaseName: "BussinesHub",
};
