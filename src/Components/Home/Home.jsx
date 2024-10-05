import React, { useState, createRef } from "react";
import { IoSave } from "react-icons/io5";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import '../../Components/Home/Home.css'
import { useSelector } from "react-redux";
import { RiEditBoxFill } from "react-icons/ri";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify"; 
import { IoIosRemoveCircle } from "react-icons/io";
import 'react-toastify/dist/ReactToastify.css';
import { BarLoader } from "react-spinners";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";

const Home = () => {
    const currentUserData = useSelector((state) => state.counter.userData);

      // react loader 
    const [loading, setLoading] = useState(false);

    // variables declaration
    const [isEditing, setIsEditing] = useState(false);


    // cropper variable 
    const defaultSrc = "https://i.ibb.co.com/syN87rL/Untitled-1-1x-1.jpg";

    const [image, setImage] = useState(defaultSrc);
    const [cropData, setCropData] = useState("#");
    const cropperRef = createRef();

    // cropper function
    const onChange = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
          files = e.dataTransfer.files;
        } else if (e.target) {
          files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
      };
    
      const getCropData = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
          setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
        }
      };


        // firebase setup
        const storage = getStorage();
        const auth = getAuth();


        // handle save
  const handleSave = () => {
    if (!cropData || cropData === "#") {
      toast.error("Please crop the image before saving.");
      return;
    }

    setLoading(true); 
    const storageRef = ref(storage, 'userPhoto/' + currentUserData.uid + '.png');
    
    // upload file
    uploadString(storageRef, cropData, 'data_url').then((snapshot) => {
      setLoading(false); 

      // Show success toast message
      toast.success("Picture updated successfully!");

      console.log('Uploaded a data_url string!');
      
      // Get download URL of updated profile picture
      getDownloadURL(storageRef)
      .then ((url)=>{
          onAuthStateChanged(auth, (user) => {
            updateProfile(auth.currentUser, {
              photoURL: url
            }).then(() => {
              console.log('Picture updated successfully')
            })
            location.reload();
        });
        
      })
    }).catch((error) => {
      setLoading(false); 

      // Show error toast message
      toast.error("Image upload failed");
      console.error(error);
    });
  }


    

  return (
    <>
    <ToastContainer />
      <div className='home-page'>
            {/* before click popup  */}
            <div className="main-items relative ">

                <div className="center flex flex-col items-center justify-center ">
                    {/* profile picture  */}
                    <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-gray-500 rounded-full overflow-hidden">
                        <img
                            className="object-cover object-center h-32"
                            src={currentUserData?.photoURL}
                            alt="Image"
                        />
                    </div>

                    {/* text  */}
                    <div className="text-center mt-[30px]">
                        <h2 className="font-semibold text-[25px]">{currentUserData?.displayName}</h2>
                        <p className="text-gray-500 text-[20px] mt-[10px]">{currentUserData?.email}</p>
                    </div>
                </div>

                {/* edit button  */}
                <div onClick={() => setIsEditing(true)} className="edit-button w-[120px] h-[35px] mt-3 flex justify-center items-center gap-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm active:scale-[1.1]">
                <RiEditBoxFill />
                <p>Edit Profile</p>
                </div>
               
            </div>


            {/* after click popup  */}
            {
            isEditing &&
            <div className="screen w-full h-full bg-[rgba(0,0,0,0.60)] absolute top-0 left-0 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
                {/* Save and Close Icons */}
                <div className="flex justify-between mb-4">
                {/* Icon */}
                {loading ? (
                    <div className="text-center mb-4"><BarLoader  size={30} color="#3B82F6" /></div>
                ) : (
                    cropData !== "#" && cropData && (
                    <IoSave 
                        onClick={handleSave}
                        className="text-blue-500 text-2xl cursor-pointer transition-transform duration-300 hover:rotate-360"
                        title="Save"
                    />
                    )
                )}

                <IoIosRemoveCircle
                    onClick={() => setIsEditing(false)}
                    className="text-red-500 text-2xl cursor-pointer transition-transform duration-300 hover:rotate-360"
                    title="Close"
                />
                </div>


                {/* File input and buttons */}
                <div style={{ width: "100%" }}>
                
                <Cropper
                    ref={cropperRef}
                    style={{ width: "100%", height: "200px" }}
                    zoomTo={0.5}
                    initialAspectRatio={1}
                    preview=".img-preview"
                    src={image}
                    viewMode={1}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={false}
                    responsive={true}
                    autoCropArea={1}
                    checkOrientation={false}
                    guides={true}
                />
                <input type="file" id="file"  onChange={onChange} className="mb-4 mt-4" />
                </div>

                {/* Cropped image */}
                <div className="box ">
                <h1 className="mb-2 flex justify-between items-center">
                    <button className="bg-blue-500 text-white w-full py-2 rounded-full" onClick={getCropData}>
                    Crop
                    </button>
                </h1>
                <div className="image-crop flex items-center justify-center">
                <img style={{height: "120px", width: "120px" }} src={cropData} alt="cropped" />
                </div>
                </div>
            </div>
        </div>
      }
        </div>
    </>
  )
}

export default Home
