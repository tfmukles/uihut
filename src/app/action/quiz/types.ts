export type TQuiz = {
  id: string;
  name: string;
  email: string;
  phone: string;
  points: number;
  gift: string;
  status: string;
  play_time: number;
  variables: {
    name: string;
    phone: string;
    email: string;
    points: number;
    play_time: number;
  };
};
