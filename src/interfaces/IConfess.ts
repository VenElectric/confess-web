export interface IConfess {
  id: string;
  title: string;
  text: string;
  tags: string[];
}

export interface IGet {
  my_data: IConfess[];
  my_next: string[];
  my_prev: string[];
}
