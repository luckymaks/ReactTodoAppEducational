export const createTodo = (value) => ({
    id: (new Date()).getTime(),
    title: value,
    completed: false
});
