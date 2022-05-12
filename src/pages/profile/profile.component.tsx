import { FC, useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import debounce from "lodash.debounce";

import { ReposList } from "./components";

import "./profile.styles.scss";
import type { User, UserRepos } from "./profile.types";

const Profile: FC = () => {
  const [userRepos, setUserRepos] = useState<UserRepos | undefined>();
  const [userData, setUserData] = useState<User | undefined>();

  const params = useParams();

  const { register, watch, handleSubmit } = useForm({
    mode: "all",
    criteriaMode: "all",
    shouldUnregister: true,
  });

  const getUserData = useCallback(async () => {
    const response = await fetch(`https://api.github.com/user/${params?.id}`);

    if (
      response?.status === 401 ||
      response?.status === 402 ||
      response?.status === 403
    ) {
      console.error("Sorry something went wrong");
    }

    const jsonData = await response.json();

    if (jsonData && jsonData.message !== "Not Found") {
      setUserData(jsonData);
    } else {
      console.log("Username does not exist");
    }
  }, [params?.id]);

  const getUserRepos = useCallback(
    async (search: string) => {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${search},user:${userData?.login}&per_page=100`
      );

      if (
        response?.status === 401 ||
        response?.status === 402 ||
        response?.status === 403
      ) {
        console.error("Sorry something went wrong");
      }

      const jsonData = await response.json();

      if (jsonData && jsonData.message !== "Not Found") {
        setUserRepos(jsonData);
      } else {
        console.log("Username does not exist");
      }
    },
    [userData?.login]
  );

  const handleSearch = debounce((search) => {
    getUserRepos(search);
  }, 400);

  useEffect(() => {
    if (params?.id) {
      getUserData();
    }
  }, [params?.id]);

  useEffect(() => {
    if (watch("search")) {
      handleSearch(watch("search"));

      if (userRepos) {
        console.log(userRepos?.items);
      }
    }
  }, [watch("search")]);

  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>

      {userData ? (
        <div className="profile">
          <h1 className="title">Profile {userData?.login}</h1>

          <div className="info">
            <div className="avatar">
              <img src={userData?.avatar_url} alt={userData?.login} />
            </div>

            <ul className="description">
              <li>Username: {userData?.login}</li>
              {userData?.bio && <li>Bio: {userData?.bio}</li>}
              {userData?.location && <li>Location: {userData?.location}</li>}
              <li>Join date: {userData?.created_at}</li>
              <li>{userData?.followers} Followers</li>
              <li>{userData?.following} Following</li>
            </ul>
          </div>

          {userData?.public_repos ? (
            <>
              <form
                className="form"
                onSubmit={handleSubmit(
                  () => watch("search") && getUserRepos(watch("search"))
                )}
              >
                <input
                  type="text"
                  className="search"
                  placeholder="Search for users repositories"
                  {...register("search")}
                />
              </form>

              {userRepos?.items && <ReposList items={userRepos.items} />}
            </>
          ) : (
            <>User don't have any repositories</>
          )}
        </div>
      ) : (
        <div className="empty-user">User not find</div>
      )}
    </>
  );
};

export default Profile;
