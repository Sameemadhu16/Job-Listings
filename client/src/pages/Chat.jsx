import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Avatar, TextInput, Label , Spinner } from 'flowbite-react';
import { FiSend, FiHash ,FiPaperclip, FiFile } from 'react-icons/fi'; // React icons for hash and send button
import { useLocation } from 'react-router-dom';
import Message from '../components/Message';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '../firebase'; // Make sure your firebase.js or config file is imported properly
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Chat() {

    const currentUser = useSelector(state => state.user);
    const [message, setMessage] = useState('');
    const [publishError, setPublishError] = useState(null);
    const [messages, setMessages] = useState([]);
    const [post, setPost] = useState([]);
    const [user, setUser] = useState([]);
    const location = useLocation();
    const [userId, setUserId] = useState('');
    const searchParams = new URLSearchParams(location.search);
    const postId = searchParams.get('id');
    const [loading,setLoading] = useState(false);
    const [file,setFile] = useState(null);
    const [pdfFile,setPdfFile] = useState(null)
    const [formData, setFormData] = useState({
        sendId: currentUser.currentUser._id,
        reciveId:'',
        message: '',
        file:'',
        image:'',
    });
    const [fileUploadProgress, setFileUploadProgress] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [fileUploadProgressFailure, setFileUploadFailure] = useState(null);
    const [imageUploadProgressFailure, setImageUploadFailure] = useState(null);


    const uploadImage = async () => {
        try{
            setImageUploadFailure(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '_' + file.name;
            const storageRef = ref(storage,fileName)

            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error) => {
                setImageUploadFailure('File upload fail')
                setImageUploadProgress(null);
                setFile(null)
                },
                () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageUploadProgress(null);
                    setImageUploadFailure(null);
                    setFormData({ ...formData, image: downloadURL });
                    
                });

                },
            )
        }
        catch (error) {
            console.log(error);
            setImageUploadFailure("File upload Failed")
            setImageUploadProgress(null);
            setFile(null)
            console.log(error);
        }
    }

    const uploadFile = async () => {
        try{
            setFileUploadFailure(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '_' + pdfFile.name;
            const storageRef = ref(storage,fileName)

            const uploadTask = uploadBytesResumable(storageRef, pdfFile);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setFileUploadProgress(progress.toFixed(0));
                },
                (error) => {
                setFileUploadFailure('File upload fail')
                setFileUploadProgress(null);
                setPdfFile(null)
                },
                () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFileUploadProgress(null);
                    setFileUploadFailure(null);
                    setFormData({ ...formData, file: downloadURL });
                    
                });

                },
            )
        }
        catch (error) {
            console.log(error);
            setFileUploadFailure("File upload Failed")
            setFileUploadProgress(null);
            setPdfFile(null)
            console.log(error);
        }
    }

    // Trigger file input click
    const handleIconClick = (id) => {
        document.getElementById(id).click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        
        if (e.target.id === 'image') {
            setFile(file); // If the file input has an ID of 'image', set the file state
        } else if (e.target.id === 'file') {
            setPdfFile(file); // If the file input has an ID of 'file', set the PDF file state
        }
    };

    useEffect(() => {
        try {
            const fetchPost = async () => {
                setLoading(true);
                const res = await fetch(`/api/post/get-job/${postId}`);
                const data = await res.json();

                if (res.ok) {
                    setPost(data);
                    setUserId(data.userId);
                    setLoading(false);
                    
                }
                if (!res.ok) {
                    console.log(data.message);
                    setLoading(false);
                }
            };
            fetchPost();
        } catch (error) {
            console.log(error.message);
        }
    }, [postId]);

    useEffect(() => {
        try {
            const fetchUser = async () => {
                const res = await fetch(`/api/auth/get-user/${userId}`);
                const data = await res.json();

                if (res.ok) {
                    setUser(data.user);
                }
                if (!res.ok) {
                    console.log(data.message);
                }
            };
            if (userId) fetchUser(); // Fetch user only if userId is available
        } catch (error) {
            console.log(error.message);
        }
    }, [userId]);
    
    const getSuggestionStyle =async () => {
        return hasSuggestions ? "dark:bg-slate-600" : "dark:bg-slate-700";
    };

    // Handle input change for the message field
    const handleInputChange = (e) => {
        const { value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            message: value,
        }));
    };

    const sendMessage = async (e) => {
        e.preventDefault();
    
        try {
            formData.postId = postId
            formData.reciveId = userId

            if(formData.message === '' && formData.file === '' && formData.image === ''){
                return;
            }
            
            const res = await fetch(`/api/message/create-message/${currentUser.currentUser._id}/${formData.reciveId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });
    
            const data = await res.json();
    
            if (!res.ok) {
                setPublishError(data.message);
                setFile(null);
                setPdfFile(null)
                return;
            }
            
            setFile(null);
            setPdfFile(null)
            setPublishError(null);
            setFormData(prevFormData => ({
                ...prevFormData,
                message: '',
                file:'',
                image:''
            }));
            setHasSuggestions(true);
        } catch (error) {
            console.error("Failed to send message:", error);
            setPublishError("Failed to send message. Please try again.");
        }
    };

    

    useEffect(() => {
        const getMessage = async () => {
            try {
                // Fetch messages using the current user's ID and the selected user's ID
                const res = await fetch(`/api/message/get-message/${currentUser.currentUser._id}/${user._id}/${postId}`);
                const data = await res.json();
    
                // Check if the response is successful
                if (res.ok) {
                    setMessages(data.messages); // Assuming 'data' contains the messages, update the messages state
                } else {
                    console.log(data.message); // Log the error message if the request fails
                }
            } catch (error) {
                console.log(error.message); // Log any error that occurs during the fetch process
            }
        };
    
        // Call the function to fetch messages
        if (user._id) { // Ensure user._id is available before making the request
            getMessage();
        }
    
    }, [currentUser.currentUser._id, user._id]); // Add user._id to the dependency array
    

    return (
        <div className='min-h-screen'>
            <div className='p-10 bg-blue-50 dark:bg-slate-700'>
                <div className='text-center flex flex-col items-center justify-center'>
                    <div className='flex flex-row text-center items-center gap-1'>
                        <p className='text-3xl font-bold text-blue-800 dark:text-white'>
                            Chat With 
                        </p>
                        <Label className="text-sm font-bold text-blue-600 border-2 border-blue-400 dark:text-blue-200 dark:border-blue-200 px-2 py-1">Poster</Label>
                    </div>
                    <p className='text-slate-600 dark:text-slate-200 mt-2'>Connect and chat with users in real-time, where every conversation brings us closer together!</p>
                </div>
                <div className='flex justify-center items-center'>
                    <div className='w-full md:w-3/4 flex flex-col mt-10'>
                        <div className='bg-white dark:bg-slate-800 rounded-lg'>
                            <div className='p-5 border-b-2 border-b-slate-400'>
                                <div className='flex items-center gap-2'>
                                    <Avatar alt="User settings" img={user.profilePicture} rounded />
                                    <p>{user.username}</p>
                                    {
                                        user.role === 'jobSeeker' ?
                                            <Label className="text-sm font-bold text-blue-600 border-2 border-blue-400 dark:text-blue-200 dark:border-blue-200 px-2 py-1">Finder</Label> :
                                            <Label className="text-sm font-bold text-blue-600 border-2 border-blue-400 dark:text-blue-200 dark:border-blue-200 px-2 py-1">Poster</Label>
                                    }
                                </div>
                            </div>
                            <div className='min-h-screen bg-gray-100 dark:bg-slate-600'>
                            {loading && (
                                <div className="flex justify-center items-center min-h-screen">
                                    <Spinner className="text-center" />
                                </div>
                            )}
                                <div className='p-10 flex flex-col gap-3'>
                                    {
                                        messages.map((sendMessage)=>(
                                            <Message key={sendMessage._id} sendMessage={sendMessage} />
                                        ))
                                    }
                                </div>
                            </div>
                            <div>
                            <form className="flex gap-1 items-center w-full p-2 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-gray-400" onSubmit={sendMessage}>
                                    {/* Icon on the left */}
                                    <FiHash className="text-gray-400 dark:text-white text-xl mx-2" />

                                    {/* Input field */}
                                    <input
                                        type="text"
                                        placeholder="Start typing..."
                                        value={formData.message}
                                        id='message'
                                        onChange={handleInputChange}
                                        className={`flex-grow bg-transparent border-none focus:ring-0 focus:outline-none text-sm text-gray-600 dark:text-white placeholder-gray-400 dark:placeholder-white dark:bg-slate-700 px-2`}
                                        autoComplete="off" 
                                    />

                                    {/* Hidden file input */}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="image"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }} // Hide the file input
                                    />

                                    <input
                                        type="file"
                                        accept=".pdf"
                                        id="file"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }} // Hide the file input
                                    />

                                    
                                    {
                                        file ? (
                                            <button type='button' onClick={uploadImage}>
                                                {
                                                    imageUploadProgress ? (
                                                        <CircularProgressbar
                                                            className='h-10 text-white bg-white dark:bg-slate-800'
                                                            value={imageUploadProgress}
                                                            text={`${imageUploadProgress || 0}%`}
                                                        />
                                                    ) : (
                                                        formData.image ? (
                                                            <img
                                                                src={formData.image}
                                                                className="w-10 h-10 object-cover rounded-full shadow-md"
                                                                alt="Uploaded"
                                                            />
                                                        ) : (
                                                            <p className='font-bold text-blue-800 dark:text-white'>
                                                                UPLOAD
                                                            </p>
                                                        )
                                                    )
                                                }
                                            </button>

                                        ):(
                                            <div className='relative group'>
                                                <button type='button' className="text-blue-500 dark:text-white hover:bg-blue-100 dark:hover:bg-slate-700 p-2 rounded-full">
                                                    <FiPaperclip 
                                                    onClick={()=>handleIconClick('image')} 
                                                    className="text-xl"/>
                                                </button>
                                                <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 text-xs text-white bg-gray-800 rounded py-1 px-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    Attach Image
                                                </span>

                                            </div>
                                        )
                                    }

                                        {
                                            pdfFile ? (
                                                <button type='button' onClick={uploadFile}>
                                                    {
                                                        fileUploadProgress ? (
                                                            <CircularProgressbar
                                                                className='h-10 text-white bg-white dark:bg-slate-800'
                                                                value={fileUploadProgress}
                                                                text={`${fileUploadProgress || 0}%`}
                                                            />
                                                        ) : (
                                                            formData.file ? (
                                                                <div className='rounded-full shadow-md cursor-pointer'>
                                                                    <iframe src={formData.file} className='w-10 h-10 object-cover rounded-full border-none'></iframe> 
                                                                </div>
                                                            ) : (
                                                                <p className='font-bold text-blue-800 dark:text-white'>
                                                                    UPLOAD
                                                                </p>
                                                            )
                                                        )
                                                    }
                                                </button>

                                            ):(
                                                <div className='relative group'>
                                                    <button type='button' className="text-blue-500 dark:text-white hover:bg-blue-100 dark:hover:bg-slate-700 p-2 rounded-full">
                                                        <FiFile 
                                                        onClick={()=>handleIconClick('file')} 
                                                        className="text-xl"/>
                                                    </button>
                                                    <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 text-xs text-white bg-gray-800 rounded py-1 px-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        Attach Document
                                                    </span>

                                                </div>
                                            )
                                        }

                                        <div className='relative group'>
                                            {/* Send button */}
                                            <button type="submit" className={`text-blue-500 dark:text-white hover:bg-blue-100 p-2 rounded-full`} >
                                                <FiSend className="text-xl" />
                                            </button>
                                            <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 text-xs text-white bg-gray-800 rounded py-1 px-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                Send Message
                                            </span>
                                        </div>
                                    </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
