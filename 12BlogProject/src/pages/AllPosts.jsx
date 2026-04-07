import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import postService from '../appwrite/postService'

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        postService.getPostsList([]).then((posts) => {
            if(posts) {
                setPosts(posts.documents)
            }
        }).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <div className='w-full py-12'>
                <Container>
                    <div className='text-center'>
                        <p className='text-lg text-gray-500 animate-pulse'>Loading posts...</p>
                    </div>
                </Container>
            </div>
        )
    }

    if (posts.length === 0) {
        return (
            <div className='w-full py-12'>
                <Container>
                    <div className='text-center'>
                        <p className='text-lg text-gray-500'>No posts available yet.</p>
                    </div>
                </Container>
            </div>
        )
    }

  return (
    <div className='w-full py-8'>
        <Container>
            <h1 className='text-3xl font-bold mb-8 text-gray-800'>All Posts</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {posts.map((post) => (
                    <div key={post.$id}>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts