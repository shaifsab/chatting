import { getDatabase, ref, onValue, push, set } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Users = () => {
  // redux
  const sliceUser = useSelector((state) => state.counter.userData);
  
  // state 
  const [users, setUsers] = useState([]);
  const [requestSent, setRequestSent] = useState(null);

  // firebase 
  const db = getDatabase();

  // real-time database 
  useEffect(() => {
    const starCountRef = ref(db, 'users/');
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().uid !== sliceUser.uid) {
          arr.push({ ...item.val(), key: item.key });
        }
      });
      setUsers(arr);
    });
  }, [sliceUser.uid, db]);

  // function 
  const handleAdd = (friendData) => {
    set(push(ref(db, 'friendRequest/')), {
      senderId: sliceUser.uid,
      senderName: sliceUser.displayName,
      senderPhoto: sliceUser.photoURL,
      reciverId: friendData.uid,
      reciverName: friendData.username,
      reciverPhoto: friendData.userPhoto,
    });
    
    // Update the requestSent state to true after sending the request
    setRequestSent(friendData.uid);
  };

  return (
    <>
      <div className="friend mt-[55px] flex flex-col items-center gap-4 ml-[350px] w-[400px] h-[500px] bg-[#077eff] rounded-lg shadow-2xl ">
        <p className="font-semibold text-white text-[20px] mt-4">All users</p>
        {/* mapping  */}
        {
          users.map((item) => (
            <div key={item.key} className="friend-req bg-[#ffffff] rounded-lg w-[360px] h-[80px] flex items-center relative shadow-2xl">
              <img
                className="w-[50px] h-[50px] rounded-full border-2 border-gray-500 absolute left-4"
                src={item.userPhoto}
                alt="image"
              />
              <p className="font-semibold text-[#001030] text-[15px] absolute left-[80px]">{item.username}</p>
              <button 
                onClick={() => handleAdd(item)} 
                className={`font-semibold text-white rounded-lg text-[15px] py-2 px-5 absolute right-5 ${requestSent === item.uid ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#001030] hover:bg-[#077eff]'}`}
                disabled={requestSent === item.uid}
              >
                {requestSent === item.uid ? 'Request Sent' : 'Add'}
              </button>
            </div>
          ))
        }
      </div>
    </>
  );
};

export default Users;
