export const addItemQuery = item => ({
  text: 'INSERT INTO todoes(item) VALUES ($1) RETURNING *',
  values: [item]
});
export const checkItemQuery = item => ({
  text: 'UPDATE TODOES SET completed = true , completed_at = now() WHERE item = $1 RETURNING *',
  values: [item]
});
export const getItemQuery = item => ({
  text: 'SELECT * FROM todoes WHERE item = $1 ',
  values: [item]
});
