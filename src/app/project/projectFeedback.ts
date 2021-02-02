export interface projectFeedbacks {
  [index: number]: {
    id: number;
    projectId: number;
    userId: number;
    rating: number;
    comments: string;
  };
}

export interface projectFeedback {
  id: number;
  projectId: number;
  userId: number;
  rating: number;
  comments: string;
}
