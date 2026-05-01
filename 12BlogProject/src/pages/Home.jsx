import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { Query } from 'appwrite'
import postService from '../appwrite/postService'
import { Container, PostCard } from '../components'

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const userData = useSelector((state) => state.auth.userData)

    useEffect(() => {
        if (!userData) {
            setPosts([])
            setLoading(false)
            return
        }

        setLoading(true)
        postService.getPostsList([
            Query.equal('status', 'active'),
            Query.equal('userId', userData.$id)
        ]).then((posts) => {
            if(posts) {
                setPosts(posts.documents)
            }
        }).finally(() => setLoading(false))
    }, [userData])

    if (loading) {
        return (
            <div className="w-full py-12 text-center">
                <Container>
                    <p className='text-lg text-gray-500 animate-pulse'>Loading your posts...</p>
                </Container>
            </div>
        )
    }

    if (!userData) {
        return (
            <div className="w-full py-12 text-center">
                <Container>
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        Login to see your posts
                    </h1>
                    <p className="text-gray-600 text-lg">This page shows only posts created by your account. Use All Posts to view every published article.</p>
                </Container>
            </div>
        )
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-12 text-center">
                <Container>
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        No posts yet
                    </h1>
                    <p className="text-gray-600 text-lg">Create your first post by clicking Add Post.</p>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <h1 className='text-3xl font-bold mb-8 text-gray-800'>Your Posts</h1>
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

export default Home