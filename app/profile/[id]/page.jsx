"use client";
import Profile from "@components/Profile";
import { useParams, useSearchParams } from "next/navigation";

import { Suspense, useEffect, useState } from "react";

const OtherProfile = () => {
  const [userPosts, setUserposts] = useState([]);
  const searchParams = useSearchParams();
  const username = searchParams.get("name");
  const { id } = useParams();

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(`/api/users/${id}/posts`);
      const data = await response.json();

      setUserposts(data);
    };

    if (id) fetchPrompts();
  }, [id]);

  return (
    <Profile
      name={username}
      desc={`Welcome to ${username}'s personalized profile page. Explore ${username}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
};

const Page = () => {
  return (
    <Suspense>
      <OtherProfile />
    </Suspense>
  );
};

export default Page;
