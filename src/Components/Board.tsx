import { FormEvent, ReactHTMLElement, useRef } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, toDoState } from "../atoms";
import DragabbleCard from "./DragabbleCard";

const Wrapper = styled.div`
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const BoardName = styled.div`
  margin-left: 10px;
`;

const BoardDelBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #dadfe9;
  border: 0px;
  border-radius: 6px;
  font-size: 20px;
  font-weight: 600;
  width: 25px;
  height: 25px;
  &:hover {
    background-color: red;
  }
`;

interface IAreaProps {
  isdraggingFromThisWith: boolean;
  isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#ecf0f1"
      : props.isdraggingFromThisWith
      ? "#bdc3c7"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
  border-radius: 10px;
`;

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onClick = (event: FormEvent<HTMLButtonElement>) => {
    setToDos((prevToDos) => {
      const copyToDos = { ...prevToDos };
      delete copyToDos[event.currentTarget.value];
      return { ...copyToDos };
    });
  };
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo],
      };
    });
    setValue("toDo", "");
  };
  return (
    <Wrapper>
      <Title>
        <div> </div>
        <BoardName>{boardId}</BoardName>
        <BoardDelBtn value={boardId} onClick={onClick}>
          x
        </BoardDelBtn>
      </Title>

      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        ></input>
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, info) => (
          <Area
            isDraggingOver={info.isDraggingOver}
            isdraggingFromThisWith={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DragabbleCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
