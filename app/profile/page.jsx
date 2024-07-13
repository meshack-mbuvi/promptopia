"use client";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export default function MyProfile() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    if (session?.user.id) fetchPrompts();
  }, [session]);

  /**
   * Delete a post handler
   * @param {*} post
   */
  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");

    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        if (response.ok) {
          // Remove the deleted post
          const filteredPosts = posts.filter((p) => p._id !== post._id);

          setPosts(filteredPosts);
        }
      } catch (error) {
        console.log({ error });
      }
    }
  };

  /**
   * Edit a post handler
   * @param {*} post
   */
  const handleEdit = async (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  return (
    <Profile
      name="My"
      desc="Welcome to your personalize profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}
