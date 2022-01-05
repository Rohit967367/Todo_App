import { useEffect, useState } from "react";
import db from "./firebase-config";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { List, ListItem, ListItemText } from "@mui/material"

const Home = () => {

  const [value, setValue] = useState("")
  const [firebaseData, setFirebaseData] = useState([])

  const onChangeHandler = (e) => {
    setValue(e.target.value)
  }


  const user = collection(db, "todo")

  const addCollection = async () => {
    await addDoc(user, {
      title: value,
      complete: false
    })
  }

  useEffect(() => {
    const getCollection = async () => {
      const data = await getDocs(user);
      setFirebaseData(data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      })))

    }

    getCollection()
  }, [user])

  const submitForm = (e) => {
    e.preventDefault()
    console.log(value)
    addCollection()
    setValue("")
  }

  let auth = true
  const data = localStorage.getItem("token")
  if (!data) {
    auth = true
  }

  return (
    <div>
      {auth && <div className="App">
        <h1>My Todo App</h1>
        <form onSubmit={submitForm}>
          <input type="text" value={value} onChange={onChangeHandler} placeholder="Todo" />
          <button type="submit">Submit</button>
        </form>
        {firebaseData.map((data) => (
          <div className="collection" key={data.id}>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              <ListItem>
                <ListItemText primary={data.title} secondary={data.id} />
              </ListItem>
            </List>
          </div>
        ))}
      </div>}
    </div>
  );
}

export default Home