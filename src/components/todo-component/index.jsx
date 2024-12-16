import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { deleteData, getData, editData, checkedData, selectDelete } from "../../redux/todo-slice";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
const TodoComponent = () => {
  const { data } = useSelector((state) => state.todoSlice);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submit = (e) => {
    dispatch(getData(e));
    console.log(e);

    console.log(data);
    reset();
  };

  //   isEdit
  const [isEdit, setIsEdit] = useState(null);
  const [newText, setNewtext] = useState("");

// input checkbox
const [isCheked , setIsChecked] = useState(false)
const handleChange = (e)=>{ 
    setIsChecked(e.target.checked)
    console.log(e.target.checked);
}
const handleDeleteChecked = () => {
    dispatch(selectDelete());
  };


  return (
    <>
      <section className="todo rain-container h-[100vh] flex pt-[100px] justify-center ">
        <div className="raindrop"></div>
        <div className="raindrop"></div>
        <div className="raindrop"></div>
        <div className="raindrop"></div>
        <div className="raindrop"></div>
        <div className="raindrop"></div>
        <div className="raindrop"></div>
        <div className="raindrop"></div>
        {/* rain end  */}
        <div className="todo-container flex flex-col  h-auto">
          <div className="todo-header flex flex-col gap-3 ">
            <input
              type="text"
              placeholder="search..."
              className="search-input"
            />
            <form
              onSubmit={handleSubmit(submit)}
              action=""
              className="flex items-start gap-4"
            >
              <div>
                <input
                  {...register("todo", { required: "iltimos task kiriitng" })}
                  type="text"
                  placeholder="enter new task"
                  className="add-input"
                />
                {errors.todo && (
                  <p className="text-red-700">{errors.todo.message}</p>
                )}
              </div>
              <button className="add-btn flex items-center justify-center">
                <FaPlus style={{ color: "rgb(14, 244, 14)", fontSize: 22 }} />
              </button>
            </form>
          </div>
          <div className="todo-body mt-[20px]  flex flex-col gap-2">
            {data.map((item) => (
              <div
                key={item.id}
                className="todo-item new-task  w-[100%] h-[40px] rounded-[8px] flex items-center justify-between px-[5px]"
              >
                <input type="checkbox" onChange={()=> dispatch(checkedData({id:item.id}))} checked={item.cheked} />
                {
                    isEdit === item.id ?(
                        <input type="text" value={newText} onChange={(e) => setNewtext(e.target.value)} className="new-text-input"/>
                    ):(
                        <label htmlFor="" className="text-green-400">
                        {item.todo}
                      </label>
                    )

                }
          
                <div className="action-buttons flex gap-3">
                  {isEdit === item.id ? (
                    <button
                      onClick={() =>{ dispatch(editData({id:item.id ,newText})),setIsEdit(null)}}
                      className="save-btn bg-orange-500 hover:bg-orange-600 w-[25px] flex items-center justify-center rounded-[2px] h-[25px] text-white text-[18px]"
                    >
                     <FaRegSave />
                    </button>
                  ) : (
                    <button
                      onClick={() => {setIsEdit(item.id),setNewtext(item.todo)}}
                      className="edit-btn bg-green-500 hover:bg-green-600 w-[25px] flex items-center justify-center rounded-[2px] h-[25px] text-white text-[18px]"
                    >
                      <MdModeEdit />
                    </button>
                  )}
                  <button
                    onClick={() => {dispatch(deleteData(item.id)),handleDeleteChecked()}}
                    className="del-btn bg-red-600 hover:bg-red-700  w-[25px] flex items-center justify-center rounded-[2px] h-[25px] text-white text-[18px]"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TodoComponent;
