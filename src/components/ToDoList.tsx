import { useRecoilState, useRecoilValue } from "recoil";
import { Categories,categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  // const toDos = useRecoilValue(toDoState);//state값을 받아옴
  const toDos = useRecoilValue(toDoSelector);//변형된 select값을 받아옴
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);//setCategory는 category타입만 받게되어있는데 category는 categories의 타입만 받게되어있는데
    //event.currentTarget.value는 인자로 option의 value값을 (String)값을 받고있음 
    //타입이 String이 아니라 export enum Categories 와 같아야하기때문에 as any로 임시로 처리
  };
  // console.log(toDos);//처음시작할때 [] (빈배열)

  // console.log(toDos.map((toDo) => (
  //   toDo.id
  // )));
  // console.log(toDos.map((toDo) => (
  //   {...toDo}
  // )));
  
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value="TO_DO">To Do</option>
        <option value="DOING">Doing</option>
        <option value="DONE">Done</option>
      </select>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}
export default ToDoList;