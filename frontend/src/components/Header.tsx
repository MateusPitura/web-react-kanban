import { useContext, useEffect, useState } from "react";
import Button from "./Button";
import { useAuthGoogle } from "../hooks/useAuthGoogle";
import { gapi } from "gapi-script";
import { bundleGapiPosts } from "../utils/bundleGapiPosts";
import { Context } from "../context/Context";
import {
  fetchAllPosts,
  fetchAllSubjects,
  savePosts,
  saveSubjects,
} from "../utils/queries";
import { bundleGapiSubjects } from "../utils/bundleGapiSubjects";
import { CircularProgress } from "@mui/material";

export default function Header() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setSubjects, setPosts } = useContext(Context);

  const handleOnAuth = (isSignedIn: boolean) => {
    setIsSignedIn(isSignedIn);
  };

  useAuthGoogle({ handleOnAuth });

  const handleLogInClick = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const handleLogOutClick = () => {
    gapi.auth2.getAuthInstance().signOut();
  };

  const onClickRefresh = async () => {
    setIsLoading(true);
    const subjects = await fetchAllSubjects();
    setSubjects(subjects);
    const posts = await fetchAllPosts();
    setPosts(posts);
    setIsLoading(false);
  };

  useEffect(() => {
    onClickRefresh()
  }, []);

  const onClickSync = async () => {
    setIsLoading(true);
    const subjects = await bundleGapiSubjects();
    await saveSubjects(subjects);
    const posts = await bundleGapiPosts(subjects);
    await savePosts(posts);
    setIsLoading(false);
    onClickRefresh()
  };

  return (
    <div className="bg-surface h-20 justify-start w-full flex p-4">
      <div className="flex-1 flex justify-end items-center gap-x-4">
        {isLoading && <CircularProgress size={20} color="inherit" />}
        <Button
          variant="tertiary"
          onClick={onClickRefresh}
          disabled={isLoading}
        >
          Refresh
        </Button>
        <Button variant="tertiary" onClick={onClickSync} disabled={isLoading}>
          Sync
        </Button>
        <Button
          variant="primary"
          onClick={isSignedIn ? handleLogOutClick : handleLogInClick}
        >
          {isSignedIn ? "Log Out" : "Log In"}
        </Button>
      </div>
    </div>
  );
}
