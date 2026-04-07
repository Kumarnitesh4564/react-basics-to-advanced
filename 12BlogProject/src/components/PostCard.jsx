import React, { useEffect } from 'react'
import storageService from '../appwrite/storageService'
import { Link } from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
  const imageUrl = featuredImage ? storageService.getFilePreview(featuredImage) : null;
  
  useEffect(() => {
    console.log('PostCard - featureImage ID:', featuredImage);
    console.log('PostCard - Generated URL:', imageUrl);
  }, [$id, featuredImage, imageUrl]);
  
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col'>
            <div className='w-full h-48 overflow-hidden bg-gray-200'>
                {imageUrl ? (
                    <img 
                      src={imageUrl} 
                      alt={title}
                      className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                      onError={(e) => {
                        console.error('Image failed to load:', imageUrl);
                        e.target.style.display = 'none';
                      }}
                    />
                ) : (
                    <div className='w-full h-full flex items-center justify-center text-gray-400'>
                        <p>No image</p>
                    </div>
                )}
            </div>
            <div className='p-4 flex-1 flex flex-col justify-between'>
              <h2 className='text-lg font-bold text-gray-800 line-clamp-2 hover:text-blue-600 transition-colors'>
                {title}
              </h2>
              <p className='text-sm text-blue-500 mt-2 group-hover:text-blue-700'>Read more →</p>
            </div>
        </div>
    </Link>
  )
}

export default PostCard