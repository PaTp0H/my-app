import { FC } from "react";
import { Link } from "react-router-dom";

import type { UsersListProps } from "./users-list.types";
import "./users-list.styles.scss";

const UsersList: FC<UsersListProps> = ({ items }) => {
  return (
    <div className="list">
      {items.map(({ avatar_url, login, id }) => (
        <Link to={`profile/${id}`} key={id} className="item">
          <div className="avatar">
            <img src={avatar_url} alt={login} />
          </div>

          <div className="name">{login}</div>

          <div className="repos">Repos: </div>
        </Link>
      ))}
    </div>
  );
};

export default UsersList;
