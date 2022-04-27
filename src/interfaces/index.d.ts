export interface IRuleSheet {
  id: string;
  name: string;
  slug: string;
  description: string;
  code: string;
  rules: IRule[];
}

export interface IRule {
  id: string;
  title: string;
  date: string;
  author: string;
  status: "Deferida" | "Aguardando deferimento" | "Rascunho";
}