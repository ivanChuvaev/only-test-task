export type TEvent = {
  id: string;
  year: number;
  description: string;
}

export type TEventGroup = {
  title: string;
  events: TEvent[];
}