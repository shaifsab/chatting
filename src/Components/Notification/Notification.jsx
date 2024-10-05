import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';

const Notification = () => {

  
    //state
    const [notification , setNotification] = useState([])

  // redux
  const sliceUser = useSelector((state) => state.counter.userData);

  //firebase
  const db = getDatabase();

  // firebase data 
  useEffect(()=>{
    const starCountRef = ref(db, 'blockList/');
    onValue(starCountRef, (snapshot) => {
        let arr = []

        snapshot.forEach((item)=>{
            if(item.val().friendId  == sliceUser.uid){
                arr.push({...item.val(), key:item.key})
            }
        })
        setNotification(arr)
   
    });
  },[])



  return (
    <>
      <div className="friend mt-[55px] flex flex-col items-center gap-4 ml-[350px] w-[400px] h-[500px] bg-[#077eff] rounded-lg shadow-2xl ">
        <p className="font-semibold text-white text-[20px] mt-4">Notifications</p>
        {/* mapping  */}
        {
          notification.map((item) =>(
            <div key={item.key} className="friend-req bg-[#ffffff] rounded-lg w-[360px] h-[80px]  flex items-center relative shadow-2xl">
            <img
              className="w-[50px] h-[50px] rounded-full border-2 border-gray-500 absolute left-4"
              src={item.currentUserPhoto}
              alt="image"
            />
            <p className="font-semibold text-[#001030] text-[15px] absolute left-[80px]"><span className='text-red-600'>{item.currentUserName} </span>has blocked you.</p>
          </div>
          ))
        }


      </div>
    </>
  )
}

export default Notification
