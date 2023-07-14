const {
  createTickets,
  ticketConsole,
  getTicket,
  setStatus,
  createNotes,
  getNotes,
  getAllTickets,
} = require("../controllers/ticketsControllers");

const isAuth = require("../middleware/isAuth");

const router = require("express").Router();

router.post("/createticket", isAuth, createTickets);

router.get("/gettickets", isAuth, getAllTickets)

router.get("/TicketConsole", isAuth, ticketConsole);

router.get("/ticket/:id", isAuth, getTicket);

router.post("/setstatus", isAuth, setStatus);

router.post("/createnote", isAuth, createNotes);

router.get("/getnotes/:id", isAuth, getNotes);

module.exports = router;
