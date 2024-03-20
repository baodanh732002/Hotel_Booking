const contactRouter = require("./contact");
const bookingRouter = require("./booking");
const loginRouter = require("./login");
const signUpRouter = require("./signup");
const siteRouter = require("./site");
const aboutController = require("./about");
const logoutRouter = require("./logout");
const adminRouter = require("./admin");
const roomDetailRouter = require("./room_detail");
const userInfoRouter = require("./user_info");
const serviceRouter = require("./service");
const paymentRouter = require("./payment");
const historyBookingRouter = require("./history_booking");
const auth = require("../middleware/auth");

function route(app) {
  app.use("/about", aboutController);

  app.use("/contact", contactRouter);

  app.get("/history_booking_user", historyBookingRouter);
  app.post("/history_booking_user", historyBookingRouter);
  app.post("/history_booking", historyBookingRouter);
  app.get("/history_booking", historyBookingRouter);

  // app.use("/user_info", userInfoRouter);
  app.get("/user_info", userInfoRouter);
  app.post("/user_info_update", userInfoRouter);
  app.post("/user_info/change_password", userInfoRouter);

  app.get("/booking", bookingRouter);
  app.post("/booking", bookingRouter);

  app.get("/login", auth.isLogout, loginRouter);
  app.post("/login", auth.isLogout, loginRouter);

  app.get("/signup", signUpRouter);
  app.post("/signup", signUpRouter);

  app.use("/logout", logoutRouter);

  app.get("/room_management", adminRouter);
  app.post("/room_management_add", adminRouter);
  app.post("/room_management_update", adminRouter);
  app.post("/room_management_delete", adminRouter);

  app.get("/user_management", adminRouter);
  app.post("/user_management_delete", adminRouter);

  app.get("/service_management", adminRouter);
  app.post("/service_management_add", adminRouter);
  app.post("/service_management_update", adminRouter);
  app.post("/service_management_delete", adminRouter);

  app.get("/booking_management", adminRouter);
  app.post("/booking_management_delete", adminRouter);

  app.get("/room_detail", roomDetailRouter);

  app.get("/service", serviceRouter);
  app.post("/service", serviceRouter);

  app.get("/payment", paymentRouter);
  app.post("/payment", paymentRouter);

  app.get("/", siteRouter);
  app.post("/", siteRouter);
}

module.exports = route;
