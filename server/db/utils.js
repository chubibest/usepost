export const addItemQuery = item => ({
  text: 'INSERT INTO todoes(item) VALUES ($1) RETURNING *',
  values: [item]
});
export const getAllQuery = () => ({
  text: 'SELECT * FROM todoes'
});
export const checkItemQuery = item => ({
  text: 'UPDATE TODOES SET completed = true , completed_at = now() WHERE item = $1 RETURNING *',
  values: [item]
});
export const getItemQuery = item => ({
  text: 'SELECT * FROM todoes WHERE item = $1 ',
  values: [item]
});
export const removeItemQuery = item => ({
  text: 'DELETE FROM todoes WHERE item = $1 returning * ',
  values: [item]
});
