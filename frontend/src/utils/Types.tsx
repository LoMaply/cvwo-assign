type ResponseObject = {
  id: number;
  type: string;
  attributes: object;
};

type User = {
  name: string;
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

export type { Discussion, Reply,ResponseObject, User };
