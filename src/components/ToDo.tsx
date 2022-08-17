import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";
function ToDo({ text, category, id }: IToDo) {
  // console.log(id);Todo 컴포넌트는 map함수여서 
  //123 
  //124
  //125
  //126 이런식으로 차례대로 들어감 
  
  const setToDos = useSetRecoilState(toDoState);
  const deleteTodo = () => {

    setToDos((oldToDos) => {
    const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      return [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),
      ];
    });

  };
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    setToDos((oldToDos) => {
      
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);//recoil안에 id들과 컴포넌트의id가 같으면 그클릭된 순서가 targetIndex
      const newToDo = { text, id, category: name as any };//변경된 text, id, category를 name으로 새로 받아옴 

      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];

    });
  };

  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
      {/* 삭제버튼 */}
      <button onClick={deleteTodo}>del</button>
    </li>
  );
}
export default ToDo;