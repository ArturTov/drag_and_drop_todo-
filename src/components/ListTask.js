import { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import toast from "react-hot-toast";
import {
  setChangeStatus,
  setDeleteTodo,
  setEditTodo,
} from "../redux/actions/itemActions";
import { ArrowSVG, DeleteSVG, EditSVG } from "../assect";

const status = ["todo", "inprocess", "complited"];
export default function ListTask() {
  const task = useSelector((state) => state.todo.items);

  const taskselm = useMemo(() => {
    return {
      inprocess: task.filter((el) => el.status === "inprocess"),
      todo: task.filter((el) => el.status === "todo"),
      complited: task.filter((el) => el.status === "complited"),
    };
  }, [task]);

  return (
    <div className="flex_container">
      {status.map((el) => (
        <Section child={taskselm[el]} key={el} status={el} />
      ))}
    </div>
  );
}
const Section = ({ child, status }) => {
  const dispatch = useDispatch();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => {
      addItemToSection(item.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const sectionValue = useMemo(() => {
    if (status === "todo") {
      return {
        text: "Todo",
        bg: "bg-gray-600",
      };
    }
    if (status === "inprocess") {
      return {
        text: "Inprocess",
        bg: "bg-orange-200",
      };
    }
    return {
      text: "Complited",
      bg: "bg-lime-400 ",
    };
  }, [status]);
  const addItemToSection = (id) => {
    dispatch(setChangeStatus({ id, status }));
    toast.success("Succes", {
      style: {
        border: "1px solid #713200",
        color: "#713200",
      },
    });
  };
  return (
    <div ref={drop} className={`section_container ${isOver ? "isOver" : ""} `}>
      <Header {...sectionValue} />
      {child?.map((el) => (
        <Task key={el.id} task={el} status={status} />
      ))}
    </div>
  );
};
const Header = ({ text, bg, length }) => {
  return (
    <div className={`section_header ${bg ? bg : ""}`}>
      {text} <span className="ml-1"> {length}</span>
    </div>
  );
};
const Task = ({ task }) => {
  const [isOpenslect, setIsOpenSelect] = useState(false);
  const [value, setValue] = useState(task.name);
  const ref = useRef(null);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const chsngeStatus = (elemnt) => {
    const index = status.indexOf(elemnt.status);
    if (index + 1 === status.length) {
      return toast.error("Somting errr", {
        border: "1px solid #713200",
        color: "#713200",
      });
    }
    dispatch(setChangeStatus({ id: elemnt.id, status: status[index + 1] }));
  };
  const handleSubmite = () => {
    if (value.length <= 3) {
      return toast.error("Somting errr", {
        border: "1px solid #713200",
        padding: "16px",
        color: "#713200",
      });
    }
    dispatch(setEditTodo({ id: task.id, name: value }));
    toast.success("Succes", {
      style: {
        border: "1px solid #713200",
        padding: "16px",
        color: "#713200",
      },
    });
    setIsEdit(false);
  };
  return (
    <div ref={drag} className={`section_task ${isDragging && "opacit"}`}>
      {isEdit && task.status === "todo" ? (
        <div>
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                ref.current.click();
              }
            }}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            className="task_input"
          />
          <button ref={ref} onClick={handleSubmite} className=" task_button">
            Change
          </button>
        </div>
      ) : (
        <span>{task.name}</span>
      )}
      {task.status !== "complited" && (
        <div
          style={{ cursor: "pointer" }}
          onMouseMove={() => {
            setIsOpenSelect(true);
          }}
          onMouseLeave={(e) => {
            setIsOpenSelect(false);
          }}>
          <div className="section_select">
            <span></span>
            <span></span>
            <span></span>
          </div>
          {isOpenslect && (
            <div className="select">
              <div
                style={{ marginTop: "8px" }}
                className="svg"
                onClick={() => {
                  chsngeStatus(task);
                }}>
                <ArrowSVG />
              </div>
              {task.editable && (
                <div
                  className="svg"
                  onClick={() => {
                    setIsEdit(!isEdit);
                  }}>
                  <EditSVG />
                </div>
              )}

              <div
                className="svg"
                onClick={() => dispatch(setDeleteTodo(task.id))}>
                <DeleteSVG />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
