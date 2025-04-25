import React, { useState, useEffect } from 'react';

type TodoItem = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
};

type SavedTodoItem = Omit<TodoItem, 'createdAt'> & {
  createdAt: string;
};

type FilterType = 'all' | 'active' | 'completed';

const Todo = () => {
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    // Load from localStorage if available
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('todos');
      return saved ? JSON.parse(saved).map((todo: SavedTodoItem) => ({
        ...todo,
        createdAt: new Date(todo.createdAt)
      })) : [];
    }
    return [];
  });
  
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  // Save to localStorage whenever todos change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      const newTodo: TodoItem = {
        id: Date.now().toString(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date(),
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const handleToggleComplete = (id: string) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEdit = (id: string, text: string) => {
    setEditingId(id);
    setEditValue(text);
  };

  const handleSaveEdit = () => {
    if (editingId) {
      setTodos(
        todos.map(todo => 
          todo.id === editingId ? { ...todo, text: editValue.trim() } : todo
        )
      );
      setEditingId(null);
      setEditValue('');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodos = todos.filter(todo => !todo.completed).length;

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 shadow-xl rounded-xl p-6 max-w-md w-full border border-blue-100">
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">مهامي</h2>
      
      <div className="flex mb-6 group">
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="أضف مهمة جديدة..."
          className="flex-1 p-3 border border-blue-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
          aria-label="أضف مهمة جديدة"
        />
        <button 
          onClick={handleAddTodo}
          className="bg-blue-600 text-white px-5 py-3 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
          aria-label="إضافة"
        >
          إضافة
        </button>
      </div>

      <div className="flex justify-between mb-6 items-center">
        <div>
          <span className="text-sm font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
            {activeTodos} مهام متبقية
          </span>
        </div>
        <div className="flex space-x-1 rtl:space-x-reverse">
          <button 
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-sm rounded-full transition-all ${filter === 'all' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
            aria-pressed={filter === 'all'}
          >
            الكل
          </button>
          <button 
            onClick={() => setFilter('active')}
            className={`px-3 py-1.5 text-sm rounded-full transition-all ${filter === 'active' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
            aria-pressed={filter === 'active'}
          >
            النشطة
          </button>
          <button 
            onClick={() => setFilter('completed')}
            className={`px-3 py-1.5 text-sm rounded-full transition-all ${filter === 'completed' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
            aria-pressed={filter === 'completed'}
          >
            المكتملة
          </button>
        </div>
      </div>

      <ul className="space-y-3 mb-4">
        {filteredTodos.length > 0 ? (
          filteredTodos.map(todo => (
            <li key={todo.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
              {editingId === todo.id ? (
                <div className="flex items-center p-3">
                  <input
                    type="text"
                    value={editValue}
                    onChange={e => setEditValue(e.target.value)}
                    onKeyDown={handleEditKeyDown}
                    className="flex-1 p-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                  <button 
                    onClick={handleSaveEdit}
                    className="ml-2 p-1.5 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                    aria-label="حفظ"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                  <button 
                    onClick={handleCancelEdit}
                    className="ml-2 p-1.5 text-sm bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                    aria-label="إلغاء"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="flex items-center p-3 group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleComplete(todo.id)}
                      className="h-5 w-5 text-blue-600 rounded-full border-2 border-blue-300 focus:ring-blue-500 transition-colors"
                      aria-label={`مهمة ${todo.completed ? 'مكتملة' : 'غير مكتملة'}: ${todo.text}`}
                    />
                    {todo.completed && (
                      <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center pointer-events-none">
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <span 
                    className={`flex-1 mx-3 text-gray-800 transition-all ${todo.completed ? 'line-through text-gray-400' : ''}`}
                  >
                    {todo.text}
                  </span>
                  <div className="opacity-0 group-hover:opacity-100 flex transition-opacity">
                    <button
                      onClick={() => handleEdit(todo.id, todo.text)}
                      className="p-1.5 text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                      aria-label="تعديل"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="p-1.5 text-gray-600 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                      aria-label="حذف"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))
        ) : (
          <li className="py-8 text-center text-gray-500 bg-white rounded-lg shadow-sm border border-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p>لا توجد مهام لعرضها</p>
          </li>
        )}
      </ul>

      {todos.some(todo => todo.completed) && (
        <div className="mt-6 text-center">
          <button
            onClick={handleClearCompleted}
            className="text-sm text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-full transition-colors"
            aria-label="مسح المكتملة"
          >
            مسح المهام المكتملة
          </button>
        </div>
      )}
    </div>
  );
};

export default Todo; 