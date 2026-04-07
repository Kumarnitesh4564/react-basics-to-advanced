import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import postService from "../appwrite/postService";
import storageService from "../appwrite/storageService";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            postService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        postService.deletePost(post.$id).then((status) => {
            if (status) {
                storageService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="w-full h-96 overflow-hidden relative bg-gray-200">
                        {storageService.getFilePreview(post.featuredImage) ? (
                            <img
                                src={storageService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="w-full h-full object-cover"
                                onError={(e) => e.target.style.display = 'none'}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <p>Image not available</p>
                            </div>
                        )}

                        {isAuthor && (
                            <div className="absolute right-6 top-6 flex gap-3">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500" className="text-white px-6">
                                        ✏️ Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" onClick={deletePost} className="text-white px-6">
                                    🗑️ Delete
                                </Button>
                            </div>
                        )}
                    </div>
                    
                    <div className="p-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
                        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                            {parse(post.content)}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}