import React from 'react';
import { Todo } from './model';
import '../app.scss';
import OneTodo from './OneTodo';
import { Droppable } from 'react-beautiful-dnd';

interface Props {
   todos: Todo[];
   setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
   completedTodos: Todo[];
   setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>; 
}   

const TodoList: React.FC<Props> = ({todos, setTodos, completedTodos, setCompletedTodos}) => {
    return (
        <div className="container">
            <Droppable droppableId="TodoList">
                {
                    (provided,snapshot) => (
                        <div className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`} ref={provided.innerRef} {...provided.droppableProps}>
                            <span className="todosHeading">Active Tasks</span>

                            {
                                todos.map((todo,index) => (
                                    <OneTodo
                                        index={index}
                                        todo={todo}
                                        todos={todos}
                                        key={todo.id}
                                        setTodos={setTodos}
                                    />
                                ))
                            }

                            {provided.placeholder}
                        </div>
                    )
                }
                
            </Droppable>
            
            <Droppable droppableId="TodosRemove">
                {
                    (provided, snapshot) => (
                        <div className={`todos remove ${snapshot.isDraggingOver ? "dragremove" : ""}`} ref={provided.innerRef} {...provided.droppableProps}>
                            <span className="todosHeading">Completed Tasks</span>

                            {
                                completedTodos.map((todo, index) => (
                                    <OneTodo
                                        index={index}
                                        todo={todo}
                                        todos={completedTodos}
                                        key={todo.id}
                                        setTodos={setCompletedTodos}
                                    />
                                ))
                            }

                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
        </div>
    )
}

export default TodoList;
