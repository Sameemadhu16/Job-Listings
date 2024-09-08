import React ,{useState}from 'react'
import { Link } from 'react-router-dom'
import {Label} from 'flowbite-react'
import CompanyDetailsModal from './Seeker.CompanyDetailsModal';
import SeekerPartTimeDetailsModel from './Seeker.PartTimeDetailsModel';

export default function AdminCard({ ShowAddcart, showApply, showDelete, post }) {
//console.log(post)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenPart, setIsModalOpenPart] = useState(false);

        const handleModalOpen = () => {
            setIsModalOpen(true);
        };
        
        
        const handleModalClose = () => {
            setIsModalOpen(false);
        };
        
        const handleModalOpenPart = () => {
            setIsModalOpenPart(true);
        };
        
        const handleModalClosePart = () => {
            setIsModalOpenPart(false);
        };
        
    return (
        <Link  className="p-4 bg-blue-50 dark:bg-slate-700 rounded-md flex items-center justify-between shadow hover:scale-105 transition-transform duration-150">
            <div className="flex items-center ">
                {
                    post.role ?
                    (<img
                        src={post.profilePicture}
                        alt="Avatar"
                        className="w-12 h-12 rounded-full mr-4"
                    />):(
                        <img
                            src={post.image}
                            alt="Avatar"
                            className="w-12 h-12 rounded-full mr-4"
                        />
                    )
                }
                <div>
                    { post.role ? (<p className="font-semibold ">{post.username}</p>) : (<p className="font-semibold ">{post.title}</p>)}
                    <div className='flex gap-2'>
                    { !post.role &&
                        <>
                            <p className="text-sm text-gray-500 dark:text-white">{new Date(post.updatedAt).toLocaleDateString()}</p>
                            <Label className='border-2 border-blue-700 dark:border-blue-200 py-2 px-1 text-blue-700 dark:text-blue-200'>{post.type == 'full' ? 'FULL TIME' : 'PART TIME'}</Label>
                        </>
                    }
                    
                    </div>
                </div>
                    
                
            </div>
            <button className="text-white bg-blue-700 hover:bg-blue-800 px-2 py-1 rounded-lg" onClick={() =>
                post.type === 'part'
                ? handleModalOpenPart(post)
                : handleModalOpen(post)}>Apply</button>
            <CompanyDetailsModal isOpen={isModalOpen} onClose={handleModalClose} showSendCVLink={true} post={post}/>
            <SeekerPartTimeDetailsModel isOpen={isModalOpenPart} onClose={handleModalClosePart}post={post}/>
        </Link>
    )
}
