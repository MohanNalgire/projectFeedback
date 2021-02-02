export interface projects {
  [index: number]: {
    id: number;
    name: string;
    description: string;
    feedback: [
      {
        userId: number;
        rating: number;
        comments: string;
      }
    ];
  };
}

export interface project {
  id: number;
  name: string;
  description: string;
  feedback: [
    {
      userId: number;
      rating: number;
      comments: string;
    }
  ];
}
