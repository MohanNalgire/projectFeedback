export interface feedback {
  id: number;
  commit: string;
  rating: number;
}

export interface feedbackTemplate {
  id: number;
  user: string;
  project: string;
  feedback: feedback;
}
