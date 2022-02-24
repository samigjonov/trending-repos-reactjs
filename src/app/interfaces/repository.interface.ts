export interface IRepository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: string;
  language: string;
  favorite?: boolean;
}
