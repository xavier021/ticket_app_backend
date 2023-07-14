const pool = require("../db");

//Create ticket
const createTickets = async (req, res) => {
  console.log(req.body);

  var date = new Date();
  var currentDate = date.toDateString();
  var currentTime = date.toLocaleTimeString();
  var dateTime = currentDate + " " + currentTime;

  try {
    const createTicket =
      "INSERT INTO xticket(subject,content,status_id,priority_id,user_id,agent_id,category_id,created_at,updated_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)";
    const subject = req.body.subject;
    const content = req.body.content;
    const status_id = req.body.status_id;
    const priority_id = req.body.priority_id;
    const user_id = req.body.user_id;
    const agent_id = req.body.agent_id;
    const category_id = req.body.category_id;
    const created_at = dateTime;
    const updated_at = dateTime;

    const newTicket = await pool.query(createTicket, [
      subject,
      content,
      status_id,
      priority_id,
      user_id,
      agent_id,
      category_id,
      created_at,
      updated_at,
    ]);

    return res.status(200).json({ message: "create ticket success" });
  } catch (err) {
    console.error(err.message);
  }
};

//Get all tickets
const getAllTickets = async (req, res)=>{
  try{
    const tickets= "Select ticket.id, ticket.subject, ticket.content, status.name AS status, priorities.name AS priority, usr.full_name AS user, admin.full_name AS agent, category.name AS category FROM xticket ticket INNER JOIN xticket_statuses status ON status.id = ticket.status_id INNER JOIN xticket_priorities priorities ON priorities.id = ticket.priority_id INNER JOIN users usr ON usr.id = ticket.user_id INNER JOIN users admin ON admin.id = ticket.agent_id INNER JOIN xticket_categories category ON category.id = ticket.category_id";
    const ticket = await pool.query(tickets);
    return res.status(200).json({tickets: ticket.rows});
  }catch(err){
    console.error(err.message);
  }
}

//Get all tickets assigned to the logged in user.
const ticketConsole = async (req, res) => {
  if (req.session.user) {
    var userId = req.session.user.id;
  }

  try {
    const getTickets =
      "SELECT t.id, usr.full_name AS users, admin.full_name AS admin, subject, s.name FROM xticket t INNER JOIN users admin ON admin.id = t.agent_id INNER JOIN users usr ON usr.id = t.user_id INNER JOIN xticket_statuses s ON s.id = t.status_id WHERE agent_id = $1";
    const tickets = await pool.query(getTickets, [userId]);
    return res.status(200).json({ ticket: tickets.rows });
  } catch (err) {
    console.error(err.message);
  }
};

//Get ticket with ID
const getTicket = async (req, res) => {
  const id = req.params.id;
  try {
    const getTicket =
      "SELECT usr.full_name AS users, admin.full_name AS admin, subject, content, created_at, s.name FROM xticket t INNER JOIN users admin ON admin.id = t.agent_id INNER JOIN users usr ON usr.id = t.user_id INNER JOIN xticket_statuses s ON s.id = t.status_id WHERE t.id = $1";

    const ticket = await pool.query(getTicket, [id]);
    return res.status(200).json({ ticket: ticket.rows });
  } catch (err) {
    console.error(err.message);
  }
};

//Set or update status on the ticket
const setStatus = async (req, res) => {
  const id = req.params.id;
  const status = req.params.status;

  try {
    const setStatus = "INSERT INTO xticket_statuses(id,name) VALUES ($1,$2)";
    const updateStatus = await pool.query(setStatus, [id, status]);

    return res.status(200).json({message:"Status updated successfully."})
  } catch (err) {
    console.error(err.message);
  }
};

//Create comment or notes on the ticket
const createNotes = async (req, res) => {
  var date = new Date();
  var currentDate = date.toDateString();
  var currentTime = date.toLocaleTimeString();
  var dateTime = currentDate + " " + currentTime;

  console.log(req.session.passport.user);

  try {
    const createNote =
      "INSERT INTO xticket_comments(user_id,ticket_id,created_at,content) VALUES ($1,$2,$3,$4)";
    const userId = req.session.passport.user;
    const ticketId = req.body.ticketId;
    const content = req.body.content;

    console.log(userId + " " + ticketId + " " + content);

    const newComment = await pool.query(createNote, [
      userId,
      ticketId,
      dateTime,
      content,
    ]);

    return res.status(200).json({ message: "Comment created successfully." });
  } catch (err) {
    console.error(err.message);
  }
};

//Get all comments or notes from the ticket
const getNotes = async (req, res) => {
  const ticketId = req.params.id;
  console.log(ticketId);
  try {
    const notes =
      "SELECT comm.id, usr.full_name AS user, created_at, content FROM xticket_comments comm INNER JOIN users usr ON usr.id = comm.user_id WHERE comm.ticket_id=$1";
    const getNotes = await pool.query(notes, [ticketId]);
    console.log(getNotes.rows);
    return res.status(200).json({ note: getNotes.rows });
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  createTickets,
  getAllTickets,
  ticketConsole,
  getTicket,
  setStatus,
  createNotes,
  getNotes,
};
