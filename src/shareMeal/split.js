import React, { useState } from "react";
import "./split.css";
import { v4 as uuidv4 } from "uuid";

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

export default function Split() {
  const [friendModal, setOpenFriendModal] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleAddFriendModal = () => {
    setOpenFriendModal((friendModal) => !friendModal);
  };

  const handleAddFriend = (friend) => {
    setFriends((friends) => [...friends, friend]);

    setOpenFriendModal(() => false);
  };

  const handleSelectedFriend = (friend) => {
    // setSelectedFriend(() => friend);

    setSelectedFriend((curr) => (curr?.id === friend.id ? null : friend));

    setOpenFriendModal(false);
  };

  return (
    <div>
      <div className="app">
        <div className="sidebar">
          <FriendList
            friends={friends}
            handleSelectedFriend={handleSelectedFriend}
            selectedFriend={selectedFriend}
          />
          {friendModal && <FormAddFriend handleAddFriend={handleAddFriend} />}
          <Button onClick={handleAddFriendModal}>
            {friendModal ? "Close" : "Add Friend"}
          </Button>
        </div>
        {selectedFriend &&
          <FormSplitBill selectedFriend={selectedFriend}
            key={ selectedFriend.id} />}
      </div>
    </div>
  );
}

function FriendList({ friends, handleSelectedFriend, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          handleSelectedFriend={handleSelectedFriend}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function Friend({ friend, handleSelectedFriend, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : null}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
    )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button onClick={() => handleSelectedFriend(friend)}>
        {isSelected ? "close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ handleAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?u=118836");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !image) return;

    const uuid = uuidv4();
    const newFriend = {
      name,
      image: `${image}?=${uuid}`,
      balance: 0,
      id: { uuid },
    };

    handleAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48?u=118836");
  };

  return (
    <>
      <form className="form-add-friend" onSubmit={handleSubmit}>
        <label>👯Friend Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>🌠Image Url</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <Button>Add</Button>
      </form>
    </>
  );
}

function FormSplitBill({ selectedFriend }) {
  const [bill, setBill] = useState(null);
  const [myExpense, setExpense] = useState(null);
  const [whosPaying, setWhosPaying] = useState("user");


  let friendsBill = bill || bill !== 0 ? bill - myExpense : null;
  const handleSetBill = (e) => {
  Number(e.target.value)===0 ? setExpense(null) :
    setBill(Number(e.target.value))
    console.log(setExpense)
  }


  return (
    <form action="" className="form-split-bill">
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) =>handleSetBill(e) }
      />

      <label>🧍🏼‍♂️Your Expense</label>
      <input type="text" value={myExpense} onChange={(e) =>  setExpense(
      Number(e.target.value) > bill ? myExpense : Number(e.target.value)
    )} />

      <label>👯{selectedFriend.name}'s Expense</label>
      <input type="text" disabled value={bill === 0 ? 0 : friendsBill} />

      <label>🤑Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
