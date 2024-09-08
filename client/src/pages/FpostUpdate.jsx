import React, { useState, useEffect } from 'react';
import { TextInput, FileInput, Button } from 'flowbite-react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDownloadURL, getStorage, uploadBytesResumable, ref } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useSelector } from 'react-redux';

export default function FpostUpdate() {
    const [post, setPost] = useState({
        title: '',
        image: '',
        date: '',
        description: '',
        requirement: '',
        companyName: '',
        companyEmail: '',
        companyLink: '',
        essential: '',
        members: 0,
    });
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadFailure, setImageUploadFailure] = useState(null);
    const [publishError, setPublishError] = useState(null);
    const navigate = useNavigate();
    const { postId } = useParams();
    const { currentUser } = useSelector((state) => state.user);
    
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await fetch(`/api/post/get-job/${postId}`);
                const data = await res.json();
                if (res.ok) {
                    setPost(data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchJobs();
    }, [postId]);

    const handleUploadImage = async () => {
        if (!file) {
            setImageUploadFailure('Please select an image');
            return;
        }
        setImageUploadFailure(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + '-' + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageUploadProgress(progress.toFixed(0));
            },
            (error) => {
                setImageUploadFailure('Image upload failed');
                setImageUploadProgress(null);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setPost({ ...post, image: downloadURL });
                    setImageUploadProgress(null);
                    setImageUploadFailure(null);
                });
            }
        );
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost((prevPost) => ({
            ...prevPost,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/post/update-post/${postId}/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post),
            });
            const data = await res.json();
            if (!res.ok) {
                setPublishError(data.message);
                return;
            }
            navigate(`/full-post/${post._id}`);
        } catch (error) {
            setPublishError('Something went wrong');
        }
    };

    return (
        <div className='bg-slate-100 dark:bg-slate-700'>
            <div className='p-3 max-w-3xl mx-auto min-h-screen'>
                <form className="flex flex-col gap-4 mt-3" onSubmit={handleSubmit}>
                    <h1 className='text-3xl font-bold'>Change Job Details</h1>

                    <TextInput
                        type='text'
                        placeholder='Title'
                        name='title'
                        onChange={handleChange}
                        value={post.title}
                    />

                    <p className='font-semibold'>Banner Image:</p>
                    <div className='flex gap-4 items-center justify-between border-4 border-blue-500 border-dotted p-3'>
                        <FileInput type="file" name='image' accept='image/*' onChange={(e) => setFile(e.target.files[0])} />
                        <button
                            type='button'
                            className='bg-blue-500 hover:bg-blue-600 text-white px-2 py-2 rounded-lg'
                            size='sm'
                            onClick={handleUploadImage}
                            disabled={imageUploadProgress}
                        >
                            {imageUploadProgress ? (
                                <CircularProgressbar className='h-20' value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
                            ) : ('Upload image')}
                        </button>
                        {post.image && (
                            <img src={post.image} alt='upload' className='h-20 object-cover' />
                        )}
                    </div>

                    <TextInput
                        type='text'
                        placeholder='Description'
                        name='description'
                        onChange={handleChange}
                        value={post.description}
                    />
                    <TextInput
                        type='text'
                        placeholder='Company Name'
                        name='companyName'
                        onChange={handleChange}
                        value={post.companyName}
                    />
                    <TextInput
                        type='text'
                        placeholder='Essential'
                        name='essential'
                        onChange={handleChange}
                        value={post.essential}
                    />
                    <TextInput
                        type='text'
                        placeholder='Requirements'
                        name='requirement'
                        onChange={handleChange}
                        value={post.requirement}
                    />

                    <div className='flex gap-4'>
                        <div className='w-1/2'>
                            <p className='font-semibold'>Team Size:</p>
                            <TextInput
                                type='number'
                                name='members'
                                min={1}
                                max={10}
                                onChange={handleChange}
                                value={post.members}
                            />
                        </div>
                        <div className='w-1/2'>
                            <p className='font-semibold'>Year of Establishment:</p>
                            <TextInput
                                type='date'
                                name='date'
                                onChange={handleChange}
                                value={post.date}
                            />
                        </div>
                    </div>

                    <TextInput
                        type='url'
                        placeholder='Company Website (https://example.com)'
                        name='companyLink'
                        onChange={handleChange}
                        value={post.companyLink}
                    />
                    <TextInput
                        type='email'
                        placeholder='Company Email'
                        name='companyEmail'
                        onChange={handleChange}
                        value={post.companyEmail}
                    />

                    <button type='submit' className='w-3/4 self-center bg-blue-500 hover:bg-blue-600 py-2 rounded-lg text-white'>
                        Update Job Post
                    </button>
                    {publishError && <p className="text-red-500 mt-3">{publishError}</p>}
                </form>
            </div>
        </div>
    );
}
