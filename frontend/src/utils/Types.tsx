type ResponseObject = {
  id: number;
  type: string;
  attributes: Object;
};

type User = {
  id: number;
  name: string;
};

type Discussion = {
  title: string;
  description: string;
};

type Reply = {
  id: number;
  description: string;
  user_id: number;
  discussion_id: number;
};

export type { ResponseObject, User, Discussion, Reply };
