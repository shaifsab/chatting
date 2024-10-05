import { getDatabase, ref, onValue, remove, push, set } from "firebase/database";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Friends = () => {
  // state 
  const [friends, setFriends] = useState([]);

  // redux
  const sliceUser = useSelector((state) => state.counter.userData);


  // firebase 
  const db = getDatabase();

  // firebase functions
  useEffect(() => {
    const starCountRef = ref(db, 'friends/');
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().currentUserId == sliceUser.uid) {
          arr.push({
            key: item.key,
            friendId: item.val().friendId,
            friendName: item.val().friendName,
            friendPhoto: item.val().friendPhoto,
          });
        } else if (item.val().friendId == sliceUser.uid) {
          arr.push({
            key: item.key,
            friendId: item.val().currentUserId,
            friendName: item.val().currentUserName,
            friendPhoto: item.val().currentUserPhoto,
          });
        }
      });
      setFriends(arr);
    });
  }, [db]);


  // block function
  const handleBlock = (friendData) => {

    set(push(ref(db, 'blockList/')), {
      currentUserId: sliceUser.uid,
      currentUserName: sliceUser.displayName,
      currentUserPhoto: sliceUser.photoURL,
      friendId: friendData.friendId,
      friendName: friendData.friendName,
      friendPhoto: friendData.friendPhoto,
     });

    // remove from database friends
    remove(ref(db, 'friends/' + friendData.key));
  };



  return (
    <>
      <div className="friend mt-[55px] flex flex-col items-center gap-4 ml-[350px] w-[400px] h-[500px] bg-[#077eff] rounded-lg shadow-2xl ">
        <p className="font-semibold text-white text-[20px] mt-4">Friends</p>
        {/* mapping  */}
        {
          friends.map((item) => (
            <div key={item.friendId} className="friend-req bg-[#ffffff] rounded-lg w-[360px] h-[80px]  flex items-center relative shadow-2xl">
              <img
                className="w-[50px] h-[50px] rounded-full border-2 border-gray-500 absolute left-4"
                src={item.friendPhoto}
                alt="image"
              />
              <p className="font-semibold text-[#001030] text-[15px] absolute left-[80px]">{item.friendName}</p>
              <div className="button flex gap-3 items-center absolute right-3">
                <button onClick={() => handleBlock(item)} className="font-semibold text-white rounded-[15px] text-[12px] py-1 px-2 bg-red-600 hover:bg-[#077eff]">Block</button>
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
};

export default Friends;
