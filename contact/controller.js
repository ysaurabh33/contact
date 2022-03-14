const db = require("./db");

const fetchContact = async (keyword = null, sort = 'id') => {
  let where = "";
  if (keyword !== null && keyword.length > 0) {
    where = `WHERE first_name LIKE '${keyword}%' OR last_name LIKE '${keyword}%' OR email LIKE '${keyword}%' OR phone LIKE '${keyword}%' `;
  }
  const rows = await db.query(`SELECT * FROM contact_list ${where} ORDER BY ${sort} ASC`);
  console.log(rows);
  return rows || [];
}

const insert = async (data) => {
  const result = await db.query(`INSERT INTO contact_list (first_name, last_name, email, phone, image) VALUES ('${data.first_name}', '${data.last_name}', '${data.email}', ${data.phone}, '${data.image}')`);

  let msg = "Something went wrong";
  if (result.affectedRows) {
    msg = "Added successfully";
  }
  return msg;
}

const update = async (id, data) => {
  const result = await db.query(`UPDATE contact_list SET first_name='${data.first_name}',last_name='${data.last_name}',email='${data.email}',phone=${data.phone},image='${data.image}' WHERE id = ${id}`);

  let msg = "Something went wrong";
  if (result.affectedRows) {
    msg = "Updated successfully";
  }
  return msg;
}

const deleteData = async (id) => {
  const result = await db.query(`DELETE FROM contact_list WHERE id = ${id}`);

  let msg = "Something went wrong";
  if (result.affectedRows) {
    msg = "Deleted successfully";
  }
  return msg;
}

const getContact = async (req, res) => {
  try {
    res.json(await fetchContact());
  } catch (err) {
    console.log('Error: ', err.message);
  }
}

const addContact = async (req, res) => {
  console.log(req.body);
  try {
    res.json(await insert(req.body));
  } catch (err) {
    console.log('Error: ', err.message);
  }
}

const updateContact = async (req, res) => {
  try {
    res.json(await update(req.params.id, req.body));
  } catch (err) {
    console.log('Error: ', err.message);
  }
}

const deleteContact = async (req, res) => {
  try {
    res.json(await deleteData(req.params.id));
  } catch (err) {
    console.log('Error: ', err.message);
  }
}

const searchContact = async (req, res) => {
  try {
    res.json(await fetchContact(req.params.keyword));
  } catch (err) {
    console.log('Error: ', err.message);
  }
}

const sortContact = async (req, res) => {
  try {
    res.json(await fetchContact(null, req.params.keyword));
  } catch (err) {
    console.log('Error: ', err.message);
  }
}

module.exports = {
  getContact,
  addContact,
  updateContact,
  deleteContact,
  searchContact,
  sortContact,
};