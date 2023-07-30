import { Children, useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App(){
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [showAddFriend, setShowAddFriend] = useState(false);

  function handleShowAddFriend() {
    setShowAddFriend((showAddFriend) => !showAddFriend);
  }

  function handleSelection(friend){
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);    
  }

  function hadleAddFriend(friend){
    setFriends( (friends)=>[...friends, friend])
    setShowAddFriend(false);
    setSelectedFriend(null);
  }
  
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friends = {friends} 
          selectedFriend={selectedFriend} 
          onSelection={handleSelection} />
     
        {showAddFriend && <FormAddFriend saveFriend={hadleAddFriend} />}
     
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>    

      {  
        selectedFriend && (<FormSplitBill selectedFriend={selectedFriend}></FormSplitBill>)                  
      }

      
      
    </div>
  );
}

function FriendList({friends, selectedFriend, onSelection}){
  return (
    <ul>
      {
        friends.map((friend) =><Friend friend={friend} key={friend.id} selectedFriend={selectedFriend} onSelection={onSelection} />)
      }
    </ul>    
  ); 
}

function Friend({friend, key, onSelection, selectedFriend}){
  const isSelected = friend.id === selectedFriend?.id 

  return <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>  

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}€
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}€
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
}

function Button({children, onClick}){
  return  (
      <button className="button" onClick={onClick}>
        {children}
      </button>
  );
}

function FormAddFriend({saveFriend}){ 
  const [ name, setName ] = useState("")
  const [ image, setImage ] = useState("https://i.pravatar.cc/48?")

  function handleSubmit(e){
    e.preventDefault();
    const id = crypto.randomUUID()
    const newFriend = {
      id: id,
      name: name,
      image:image + id,
      balance: 0
    }

    saveFriend(newFriend) 
    setName("")
    setImage("https://i.pravatar.cc/48?")   
  }

  return <form className="form-add-friend" onSubmit={handleSubmit}>
    <label>Friend Name</label>
    <input type="text" value={name} onChange={e => setName(e.target.value)}></input>

    <label>Image URL</label>
    <input type="text" value={image} onChange={ e => setImage(e.target.value)}></input>

    <Button>Add</Button>    
  </form> 
}

function FormSplitBill({selectedFriend, onSplitBill, key}){
    return <form className="form-split-bill" onSubmit={e=> e.preventDefault()} >
      <h2>Split the bill with x</h2>

      <label> 💰 Bill Value</label>
      <input type="text"></input>

      <label>💰 Your Expense</label>
      <input type="text"></input>

      <label>👫 {selectedFriend.name}'s' Expense</label>
      <input type="text" disabled></input>

      <label>Who is paying?</label>
      <select>
        <option value="user" >You</option>
        <option value={selectedFriend.id}>{selectedFriend.name}</option>
      </select>

      <Button>Split Bill</Button>  
    </form>
}
  




