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
};

type Reply = {
  description: string;
  user_id: number;
  discussion_id: number;
};

const emptyUser: User = {
  id: -1,
  username: ""
}


export type { Discussion, Reply, ResponseObject, User };
export {emptyUser};
