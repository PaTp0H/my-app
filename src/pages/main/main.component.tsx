import { FC, useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import debounce from "lodash.debounce";

import { UsersList } from "./components";

import "./main.styles.scss";

const Main: FC = () => {
  const [usersData, setUsersData] = useState<{
    items: Array<Record<any, any>>;
  }>();

  const { register, watch, handleSubmit } = useForm({
    mode: "all",
    criteriaMode: "all",
    shouldUnregister: true,
  });

  const getUsersData = useCallback(async (username: string) => {
    const response = await fetch(
      `https://api.github.com/search/users?q=${
        username ? `${username}` : ""
      }&per_page=100`
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
      setUsersData(jsonData);
    } else {
      console.log("Username does not exist");
    }
  }, []);

  const handleSearch = debounce((search) => {
    getUsersData(search);
  }, 400);

  useEffect(() => {
    if (watch("search")) {
      handleSearch(watch("search"));
    }
  }, [watch("search")]);

  return (
    <>
      <Helmet>
        <title>GitHub Searcher</title>
      </Helmet>

      <div className="main">
        <h1 className="title">GitHub Searcher</h1>

        <form
          className="form"
          onSubmit={handleSubmit(
            () => watch("search") && getUsersData(watch("search"))
          )}
        >
          <input
            type="text"
            className="search"
            placeholder="Search"
            {...register("search")}
          />
        </form>

        {usersData?.items && <UsersList items={usersData?.items} />}
      </div>
    </>
  );
};

export default Main;
