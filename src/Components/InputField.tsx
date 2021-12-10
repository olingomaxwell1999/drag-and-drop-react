import React, { useRef } from 'react';
import '../app.scss';

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;  
  handleAdd: (e: React.FormEvent) => void;  
} 

const InputField: React.FC <Props> = ({todo, setTodo, handleAdd}) => {

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form className="inputField" onSubmit={(e) =>{
      handleAdd(e);
      inputRef.current?.blur();
    }}>
      <input ref={inputRef} type="input" value={todo} onChange={
        (e)=>setTodo(e.target.value) 
      }  placeholder="Add  a new   todo" className="inputBox"/>  

      <button className="inputSubmit">
        Add
      </button>   
    </form>

  );      
};

export default InputField;     