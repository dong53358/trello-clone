import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";

const Delete = styled.div<ITrashCanProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "red"
      : props.isdraggingFromThisWith
      ? "#b2bec3"
      : "white"};
  font-size: 25px;
  transition: background-color 0.3s ease-in-out;
`;

interface ITrashCanProps {
  isDraggingOver: boolean;
  isdraggingFromThisWith: boolean;
}

function TrashCan() {
  return (
    <Droppable droppableId="del">
      {(provided, snapshot) => (
        <Delete
          isDraggingOver={snapshot.isDraggingOver}
          isdraggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <FaTrashAlt />
          {provided.placeholder}
        </Delete>
      )}
    </Droppable>
  );
}

export default TrashCan;
