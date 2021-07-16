import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';

function App() {
  const [foodName, setFoodName] = useState('');
  const [daysSince, setDaysSince] = useState(0);
  const [newFoodName, setNewFoodName] = useState('');
  const [update, setUpdate] = useState(false);
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/read').then((response) => {
      setFoodList(response.data);
    });
  }, [update]);

  const addToList = () => {
    Axios.post('http://localhost:3001/insert', {
      foodName: foodName,
      daysSinceEaten: daysSince,
    }).then(setUpdate(!update));
  };

  const updateFood = (id) => {
    // console.log(id, newFoodName);
    Axios.put('http://localhost:3001/update', {
      id: id,
      newFoodName: newFoodName,
    }).then(setUpdate(!update));
  };

  const removeFood = (id) => {
    Axios.delete(`http://localhost:3001/remove/${id}`).then(setUpdate(!update));
  };

  return (
    <div className="App">
      <h1>CRUD App with MERN</h1>
      <label htmlFor="">Food Name: </label>
      <input
        type="text"
        onChange={(e) => {
          setFoodName(e.target.value);
        }}
      />
      <label htmlFor="">Days Since Eaten: </label>
      <input
        type="number"
        onChange={(e) => {
          setDaysSince(e.target.value);
        }}
      />
      <button onClick={addToList}>Add To List</button>
      <h2>Food List</h2>
      <hr
        style={{
          backgroundColor: 'black',
          color: 'black',
          height: '2px',
          width: '100%',
        }}
      />
      <div>
      {foodList.map((element, index) => {
        return (
          <div className="food" key={Math.random()}>
            <h2>{element.foodName}</h2>
            <h3>Days Since Eaten: {element.daysSinceEaten}</h3>
            <input
              type="text"
              placeholder="New Food Name..."
              onChange={(e) => {
                setNewFoodName(e.target.value);
              }}
            />
            <button
              onClick={() => {
                updateFood(element._id);
              }}
            >
              Update Name
            </button>
            <button onClick={() => {
              removeFood(element._id);
            }}>Delete Food</button>
          </div>
        );
      })}
      </div>
      
    </div>
  );
}

export default App;
