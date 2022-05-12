export interface User {
  avatar_url?: string;
  login: string;
  followers: number;
  following: number;
  bio?: string;
  email?: string;
  location?: string;
  created_at: string;
  repos_url?: string;
  public_repos?: number;
}

export interface UserRepos {
  items: {
    id: number;
    forks: number;
    name: string;
    stargazers_count: number;
    svn_url: string;
  }[];
}
