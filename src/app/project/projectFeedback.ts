export interface projectFeedbacks {
  [index: number]: {
    id: number;
    projectId: number;
    userId: number;
    feedback: {
      rating: number;
      comments: string;
    };
  };
}

export interface projectFeedback {
  id: number;
  projectId: number;
  userId: number;
  feedback: {
    rating: number;
    comments: string;
  };
}
