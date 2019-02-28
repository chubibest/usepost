export default item => ({
  text: 'insert into todoes(item)  values ($1) returning *',
  values: [item]
});
