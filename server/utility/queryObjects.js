export const addItemQuery = text => ({
  text: `
    INSERT INTO todoes(item)
    VALUES ($1)
    RETURNING *
  `,
  values: [text]
});

export const checkItemQuery = item => ({
  text: `
    UPDATE todoes
    SET completed = true, completed_at = now()
    WHERE item = $1
    RETURNING *
  `,
  values: item
});

// follow suit
