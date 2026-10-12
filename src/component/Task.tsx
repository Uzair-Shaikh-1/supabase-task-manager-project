import React, { useEffect, useState } from "react";
import { supabase } from "../supabase-client";

const Task = ({session}: {session:Session}) => {

interface Task {
  id:number;
  title:string;
  description:string;
  created_at:string;
  image_url:string;
}


  const [newTask, setnewTask] = useState({
    title: "",
    description: "",
  });

const [tasks, settasks] = useState<Task[]>([])

const [newdescription, setnewdescription] = useState("")

const [taskImage, settaskImage] = useState<File | null>(null)

  const fetchTasks = async () => {
    const { error,data } = await supabase
      .from("task tabe")
      .select("*")
      .order("created_at", { ascending: true });

       if (error) {
      console.error(`error adding task ${error.message}`);
      return
    }

    
    settasks(data)
  };


  const uploadImage = async( file:File):Promise<string | null>  =>{
   
   const filePath = `${file.name}-${Date.now()}`

   const {error} = await supabase.storage.from("tasks-images").upload(filePath,file)


   if(error){
    console.log(`Error uploading image: ${error.message}`);
    return null
   }


   const {data} = await supabase.storage.from("tasks-images").getPublicUrl(filePath)

    return data.publicUrl
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let imageUrl :String |null = null

    if(taskImage){
      imageUrl = await uploadImage(taskImage)
    }

    const { error} = await supabase.from("task tabe").insert({...newTask,email:session.user.email, image_url:imageUrl}).select().single();
    if (error) {
      console.error(`error adding task ${error.message}`);
      return
    }

    setnewTask({ title: "", description: "" });
  };

  const deleteTask = async (id:number) =>{
    const {error} = await supabase.from("task tabe").delete().eq("id",id)

    if(error){
      console.error(`there is an error in deletting function ${error.message}`)
    }

    settasks((prev) => prev.filter((task) => task.id !==id))
  }
  const updatetask = async (id:number) =>{
    const {error} = await supabase.from("task tabe").update({description:newdescription}).eq("id",id)


if(error){
  console.error(`there is an error in update function ${error.message}`)
}

settasks((prev)=>{
  return (

    prev.map((task) =>{
      return (
        task.id === id ? {...task,description:newdescription}:task
      )
    })
  )
})

  }

const handleFileChange = async(e:any) =>{
if(e.target.files  && e.target.files.length > 0) {
settaskImage(e.target.files[0])
}
}


useEffect(() => {
 fetchTasks()
}, [])



  // useEffect(() => {
  //   const channel = supabase.channel("tasks-channel");
  //   channel
  //     .on(
  //       "postgres_changes",
  //       { event: "INSERT", schema: "public", table: "tasks" },
  //       (payload) => {
  //         const newTask = payload.new as Task;
  //         settasks((prev) => [...prev, newTask]);
  //       }
  //     )
  //     .subscribe((status) => {
  //       console.log("Subscription: ", status);
  //     });
  // }, []);


console.log(tasks);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <h2>Task Manager CRUD</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Task Title"
          onChange={(e) => {
            setnewTask((prev) => ({ ...prev, title: e.target.value }));
          }}
          style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
        />
        
        <textarea
          placeholder="Task Description"
          onChange={(e) =>
            setnewTask((prev) => ({ ...prev, description: e.target.value }))
          }
          style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
        />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Add Task
        </button>
        ```
      </form>

      {/* List of Tasks */}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task,key) =>{
          return(
             <li
             key={key}
          style={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "1rem",
            marginBottom: "0.5rem",
          }}
        >
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        
        <img src={task.image_url} alt="image" style={{height:70}} />
      </div>
        <div>
                <textarea
                  placeholder="Updated description..."
                  onChange={(e) => setnewdescription(e.target.value)}
                />
                <button
                  style={{ padding: "0.5rem 1rem", marginRight: "0.5rem" }}
                  onClick={() => updatetask(task.id)}
                >
                  Edit
                </button>
                <button
                  style={{ padding: "0.5rem 1rem" }}
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
      </li>
          )
        })}
       </ul>
    </div>
  );
};

export default Task;
