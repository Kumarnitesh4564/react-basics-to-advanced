import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, PostForm } from '../components'
import { useParams } from 'react-router-dom'
import postService from '../appwrite/postService'

function EditPost() {
    const [post, setPost] = useState(null)
    const navigate = useNavigate();
    const {slug} = useParams()

    useEffect(() => {
        if(slug) {
            postService.getPost(slug).then((post) => {
                if(post) {
                    setPost(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost