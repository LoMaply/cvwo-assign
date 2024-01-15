type ResponseObject = {
  id: number;
  type: string;
  attributes: object;
};

type User = {
  id: number;
  username: string;
};

type Discussion = {
  id: number;
  title: string;
  description: string;
  username: string;
  category: string;
  created_at: string;
  updated_at: string;
};

type Reply = {
  id: number;
  description: string;
  user_id: number;
  discussion_id: number;
  username: string;
  created_at: string;
  updated_at: string;
};

const emptyUser: User = {
  id: -1,
  username: ""
};

const emptyDiscussion: Discussion = {
  id: -1,
  title: "",
  description: "",
  username: "",
  category: "",
  created_at: "",
  updated_at: ""
}


export type { Discussion, Reply, ResponseObject, User };
export { emptyDiscussion, emptyUser };
