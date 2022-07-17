import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";
import { FaTrashAlt } from "react-icons/fa";
import TrashCan from "./Components/TrashCan";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  margin: 0 auto;
  align-items: center;
  height: 100vh;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  font-size: 50px;
  font-weight: 600;
  margin-top: 30px;
  margin-bottom: 50px;
`;

const BoardInput = styled.input`
  width: 200px;
  height: 30px;
  margin-bottom: 50px;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
  margin-bottom: 100px;
`;

interface IForm {
  board: string;
}

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ board }: IForm) => {
    setToDos((allBoards) => {
      const boardCopy = { ...allBoards };
      boardCopy[board] = [];
      return boardCopy;
    });
    setValue("board", "");
  };
  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;

    if (destination?.droppableId === "del") {
      setToDos((allBoard) => {
        const boardCopy = [...allBoard[source.droppableId]];
        boardCopy.splice(source.index, 1);
        return {
          ...allBoard,
          [source.droppableId]: boardCopy,
        };
      });
      return;
    }
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      // same board movement/
      setToDos((allBoard) => {
        const boardCopy = [...allBoard[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoard,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      // cross board movement
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Title>drag and drop</Title>
        <form onSubmit={handleSubmit(onValid)}>
          <BoardInput
            {...register("board")}
            type="text"
            placeholder="add board"
          ></BoardInput>
        </form>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
        <TrashCan />
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
