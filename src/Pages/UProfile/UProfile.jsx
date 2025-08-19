import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/Authcontext";
import axios from "axios";

const UProfile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
    const [profilePic,setProfilePic]=useState('')
  const [message, setMessage] = useState("");

  // Image upload handler
  const handelImageUpload = async (e) => {
     const image = e.target.files[0]
   
    const formData = new FormData()
    formData.append('image',image)
    const imageUploadUrl=`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_KEY}`
    const res = await axios.post(imageUploadUrl,formData)
    setProfilePic(res.data.data.url)
  };
     

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile({
        displayName: name,
        photoURL:  profilePic ? profilePic : user?.photoURL,
      });
      setMessage("Profile updated successfully!");
      setModalOpen(false); 
    } catch (error) {
      setMessage(" Error updating profile: " + error.message);
    }
  };

  return (
    <div className=" flex flex-col items-center justify-start py-28 px-4">
      {/* Profile Card */}
      <div className=" rounded-2xl  p-8 w-full max-w-md text-center">
        <img
          src={user?.photoURL || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-28 h-28 rounded-full mx-auto border-4 border-green-500 object-cover"
        />
        <h2 className="text-2xl font-semibold mt-4">{user?.displayName || "User"}</h2>
        <p className="text-gray-600">{user?.email}</p>
        <button
          className="mt-6 bg-[#00B795] hover:bg-[#22A587] text-white rounded-md px-4 py-2 transition"
          onClick={() => setModalOpen(true)}
        >
          Update Profile
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal modal-open">
          <div className="modal-box relative">
            <h3 className="text-lg font-bold mb-4">Update Profile</h3>
            <form className="space-y-4" onSubmit={handleUpdateProfile}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input input-bordered w-full"
                
                  
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upload Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handelImageUpload}
                  className="file-input file-input-bordered w-full"
                />
                {profilePic && (
                  <img
                    src={profilePic}
                    alt="Preview"
                    className="mt-2 w-20 h-20 rounded-full mx-auto border"
                  />
                )}
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="bg-[#00B795] hover:bg-[#22A587] text-white rounded-md px-4 py-2">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UProfile;
