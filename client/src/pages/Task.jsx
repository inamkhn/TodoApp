import { RxUpdate } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Task = () => {
  const [task, setTask] = useState([]);
  const [input, setInput] = useState({ task: "" });
  const [update, setUpdate] = useState(false);
  console.log(input);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/v1/addtask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
        },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        toast.success("error occurred");
        return;
      }
      toast.success("Todo Added");
    } catch (error) {
      toast.warning("Error occurred");
      console.log(error);
    }
    
  };



  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        "/api/v1/allTasks"
        // {
        //   Authentication: `Brearer ${user.access_token}`,
        // }
      );
      setTask(res.data);
      console.log(res.data);
    };
    fetch();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const config = {
        withCredentials: true,
      };
      const res = await axios.delete(`/api/v1/deletetask/${id}`, config);
      console.log(res);
      toast.success("Task Delete Success");
    } catch (error) {
      toast.warning("Task Can't be Delete");
      console.log(error);
    }
  };

  const updateHandler = (id) => {
    setUpdate(!update)
    
  };

  return (
    <>
      <Toaster />
      <div className="h-screen flex justify-center items-center">
        
        <div className="card w-96 bg-base-100 shadow-xl">
        <p className="flex justify-center p-2 font-bold">Todo List</p>
          <div className="card-body">
            <div>
                <form onSubmit={handleSubmit}>
                  <label className="input input-bordered flex items-center gap-2">
                    <input
                      type="text"
                      className="grow"
                      placeholder="Search"
                      name="name"
                      value={input.task}
                      onChange={(e) =>
                        setInput({ ...input, task: e.target.value })
                      }
                    />
                    <button
                      type="submit"
                      className="px-2 bg-blue-500 py-1 rounded-lg text-white"
                    >
                     { !update ? 'add' : 'update'}
                    </button>
                  </label>
                </form>
             
            </div>

            {task.length < 0
              ? "No tasks"
              : task.map((item, index) => {
                  return (
                    <>
                      <div
                        className="flex justify-between items-center mt-2"
                        key={index}
                      >
                        <p>{item.task}</p>
                        <div className="flex space-x-1">
                          <RxUpdate
                            onClick={()=>updateHandler(item._id)}
                            className="text-2xl text-green-300"
                          />
                          <MdDelete
                            onClick={() => deleteHandler(item._id)}
                            className="text-2xl text-red-300"
                          />
                        </div>
                      </div>
                    </>
                  );
                })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Task;
