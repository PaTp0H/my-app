import { FC } from "react";

import "./repos-list.styles.scss";
import type { UserRepos } from "../../profile.types";

const ReposList: FC<UserRepos> = ({ items }) => {
  return (
    <div className="list">
      {items.map(({ forks, id, name, stargazers_count, svn_url }) => (
        <a
          href={svn_url}
          className="repo"
          key={id}
          target="_blank"
          rel="noreferrer"
        >
          <div className="repo-name">{name}</div>

          <div className="repo-info">
            <div className="forks">Forks {forks}</div>
            <div className="stars">Stars {stargazers_count}</div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default ReposList;
