import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import postService from '../../appwrite/postService'
import storageService from '../../appwrite/storageService'
import { Input, Button, Select, RTE } from "../index"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({ post }) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        },
    })

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    //  SLUG TRANSFORM
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-")
        }
        return ""
    }, [])

    //  AUTO UPDATE SLUG
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true })
            }
        })

        return () => subscription.unsubscribe()
    }, [watch, slugTransform, setValue])

    //  SUBMIT HANDLER
    const submit = async (data) => {
        if (!userData) {
            setError('User not authenticated')
            return
        }

        setLoading(true)
        setError(null)

        try {
            if (post) {
                // UPDATE POST
                const file = data.image[0]
                    ? await storageService.uploadFile(data.image[0])
                    : null

                if (file) {
                    await storageService.deleteFile(post.featuredImage)
                }

                const updatedPost = await postService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage,
                })

                if (updatedPost) {
                    navigate(`/post/${data.slug}`)
                } else {
                    setError('Failed to update post')
                }

            } else {
                // CREATE POST
                const file = data.image[0]
                    ? await storageService.uploadFile(data.image[0])
                    : null

                if (!file) {
                    setError('Please upload a featured image')
                    return
                }

                const dbPost = await postService.createPost({
                    ...data,
                    featuredImage: file.$id,
                    userId: userData.$id
                })

                if (dbPost) {
                    navigate(`/post/${data.slug}`)
                } else {
                    setError('Failed to create post')
                }
            }
        } catch (error) {
            console.error("Post submit error:", error)
            setError(error.message || 'An error occurred while saving the post')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            {error && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    {error}
                </div>
            )}
            <form
                onSubmit={handleSubmit(submit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >

                {/* LEFT SIDE */}
                <div className="flex flex-col gap-4">
                    <Input
                        label="Title"
                        placeholder="Enter post title"
                        {...register("title", { required: true })}
                    />

                    <Input
                        label="Slug"
                        placeholder="post-slug"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue(
                                "slug",
                                slugTransform(e.currentTarget.value),
                                { shouldValidate: true }
                            )
                        }}
                    />

                    <RTE
                        label="Content"
                        name="content"
                        control={control}
                        defaultValue={getValues("content")}
                    />
                </div>

                {/* RIGHT SIDE */}
                <div className="flex flex-col gap-4">

                    <Input
                        label="Featured Image"
                        type="file"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />

                    {post && (
                        <div className="w-full">
                            <img
                                src={storageService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-lg w-full h-48 object-cover"
                            />
                        </div>
                    )}

                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        {...register("status", { required: true })}
                    />

                    <Button
                        type="submit"
                        disabled={loading}
                        className={`w-full text-white py-2 rounded-lg transition ${
                            loading 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {loading ? 'Publishing...' : (post ? "Update Post" : "Publish Post")}
                    </Button>

                </div>

            </form>
        </div>
    )
}

export default PostForm