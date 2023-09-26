import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setAddTodo } from "../redux/actions/itemActions";

export default function CreateTask({ theme }) {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const ref = useRef(null);
  const handleSubmite = () => {
    if (value.length <= 3) {
      return toast.error("Somting errr", {
        border: "1px solid #713200",
        padding: "16px",
        color: "#713200",
      });
    }
    dispatch(setAddTodo(value));

    toast.success("Succes", {
      style: {
        border: "1px solid #713200",
        padding: "16px",
        color: "#713200",
      },
    });
    setValue("");
  };

  return (
    <div>
      <input
        data-theme={theme}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            ref.current.click();
          }
        }}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className="create_input"
      />
      <button
        data-theme={theme}
        ref={ref}
        onClick={handleSubmite}
        className=" create_button">
        Craeate
      </button>
    </div>
  );
}
