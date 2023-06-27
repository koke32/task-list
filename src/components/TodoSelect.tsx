type Filter = 'all' | 'done' | 'undone';

export const TodoSelect = (
    {
        handleSort
    }: {
        handleSort: (filter: Filter) => void;
    }) => {

    // hooks/useTodo
    const sortTodo = (e: React.ChangeEvent<any>) => handleSort(e.target.value as Filter);

    return (
      <div>
        <select defaultValue="all" onChange={sortTodo}>
        <option value="all">すべてのタスク</option>
        <option value="undone">アクティブなタスク</option>
        <option value="done">完了したタスク</option>
        </select>
      </div>
    );
};
