export const addItemQuery = (item, userId) => ({
  text: 'INSERT INTO todoes(item, owner_id) VALUES ($1, $2) RETURNING *',
  values: [item, userId]
});
export const getAllQuery = userId => ({
  text: 'SELECT * FROM todoes WHERE owner_id = $1',
  values: [userId]
});
export const checkItemQuery = (item, userId) => ({
  text: 'UPDATE TODOES SET completed = true , completed_at = now() WHERE item = $1 and  owner_id = $2 RETURNING *',
  values: [item, userId]
});
export const getItemQuery = (item, userId) => ({
  text: 'SELECT * FROM todoes WHERE item = $1 and owner_id = $2',
  values: [item, userId]
});
export const removeItemQuery = (item, userId) => ({
  text: 'DELETE FROM todoes WHERE item = $1 and owner_id = $2 returning * ',
  values: [item, userId]
});
export const statusQuery = (item, userId) => ({
  text: 'SELECT * FROM todoes WHERE completed = $1 and owner_id = $2',
  values: [item, userId]
});
export const createUserQuery = (email, password) => ({
  text: 'INSERT INTO  users(email, password) values($1, $2) returning *',
  values: [email, password]
});
export const getUserQuery = email => ({
  text: 'SELECT * FROM users WHERE email = $1',
  values: [email]
});
// export const getUserByIdQuery = id => ({
//   text: 'SELECT * FROM users WHERE id = $1',
//   values: [id]
// });
export const removeUserQuery = id => ({
  text: 'DELETE FROM users WHERE id = $1 returning * ',
  values: [id]
});
