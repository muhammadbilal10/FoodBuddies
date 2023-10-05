import axios from "axios";

const creatPaymentIntent = (data) => {
  console.log("data", data);
  return new Promise((resolve, reject) => {
    axios
      .post("https://apitestregs.onrender.com/api/payment-sheet", data)
      .then(function (res) {
        resolve(res);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

export default creatPaymentIntent;
