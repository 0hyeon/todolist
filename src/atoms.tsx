import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";


export enum Categories {//enum은 숫자로서 데이터를 인식시킴 0,1,2 해서 0 = Todo , 1=doing 이런식으로 바꿔줬음
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});



const { persistAtom } = recoilPersist({//로컬스토리지에 저장
  key: "recoil-persist",
  storage: localStorage,
  });
// export const toDoState = atom<IToDo[]>({//state
//   key: "toDo",
//   default: [],
// });
export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom], });


export const toDoSelector = selector({//state를 변형
  key: "toDoSelector",
  get: ({ get }) => {//state를 가져옴
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});