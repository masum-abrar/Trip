import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const handlePost = async () => {
  if (!newPost.text.trim() && newPost.images.length === 0) {
    toast.warning("Please write something or add an image.");
    return;
  }

  const formData = new FormData();
  formData.append("title", newPost.text);
  formData.append("description", newPost.text);
  formData.append("type", "discussion");
  formData.append("eventStartDate", newPost.startDate);
  formData.append("eventEndDate", newPost.endDate);
  formData.append("isActive", true);

  // Temporary: hardcode these or use values from context/state
  formData.append("divisionId", "your-division-id");
  formData.append("districtId", "your-district-id");
  formData.append("placeId", "your-place-id");

  // Append image files if available
  const fileInput = document.querySelector('input[type="file"]');
  if (fileInput && fileInput.files.length > 0) {
    for (let i = 0; i < fileInput.files.length; i++) {
      formData.append("images", fileInput.files[i]);
    }
  }

  try {
    const response = await axios.post("https://parjatak-core.vercel.app/v1/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    toast.success("Post created successfully!");

    // Optional: Update UI with the newly posted item
    const newPostData = {
      id: Date.now(),
      user: "User Name",
      text: newPost.text,
      images: newPost.images,
      startDate: newPost.startDate,
      endDate: newPost.endDate,
      comments: [],
      likes: 0,
      liked: false,
    };

    setPosts([newPostData, ...posts]);
    setNewPost({ text: "", images: [], place: "", startDate: "", endDate: "" });

  } catch (error) {
    console.error("Post creation failed:", error);
    toast.error("Failed to create post. Please try again.");
  }
};
