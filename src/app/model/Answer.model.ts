export interface IAnswer{
  id?: number;
  answer_dsc: string;
  next_step: boolean;
  stop_chat: boolean;
  step: number;
  final_answer: string;
}
