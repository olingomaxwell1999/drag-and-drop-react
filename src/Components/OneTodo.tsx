import React, { useEffect, useRef, useState } from 'react';
import '../app.scss'; 
import { Todo } from './model';
import {AiFillEdit, AiFillDelete} from 'react-icons/ai';
import {MdDone} from 'react-icons/md';      
import { Draggable } from 'react-beautiful-dnd';

type Props = { 
    index: number
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const OneTodo: React.FC<Props>  = ({index, todo, todos, setTodos}) => {

    const [edit, setEdit] = useState<boolean>(false);

   const [editTodo, setEditTodo] = useState(todo.todo);

    const handleDone = (id: number) => {
        setTodos(
            todos.map((todo) =>
              todo.id === id ? {...todo, isDone: !todo.isDone} : todo
            )
        )
    };

    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));    
    }; 
    
    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();

        setTodos(todos.map((todo) => (todo.id === id ? {...todo, todo: editTodo}: todo)));
        setEdit(false);
    };  

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit])
    
    const inputRef = useRef<HTMLInputElement>(null)

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {
                (provided) => (
                    <form className="oneTodo" onSubmit={(e) => handleEdit(e, todo.id)} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        {
                            edit ? (
                                <input value={editTodo} ref={inputRef} onChange={(e) => setEditTodo(e.target.value)} className="singleText" />
                            ): todo.isDone ? (
                                <s className="singleText">{todo.todo}</s>
                            ) : (
                                <span className="singleText">{todo.todo}</span>      
                            )
                        }
                        
                        <div>
                            <span className="icon" onClick={() => {  
                                if(!edit && !todo.isDone ){
                                    setEdit(!edit)
                                }
                            }}>
                                <AiFillEdit/>
                            </span>
                            <span className="icon" onClick={() => handleDelete(todo.id)}>
                                <AiFillDelete/>
                            </span>
                            <span className="icon" onClick={() => handleDone(todo.id)}>
                                <MdDone/>
                            </span>
                        </div>
                    </form>
                )
            }
        </Draggable>
        
    )
}

export default OneTodo;
