export interface PostMatter {
  title?: string;
  description?: string;
  tags?: string | string[];
  badges?: string | string[];
  publicAt?: string;
  [key: string]: any;
}

export interface Post {
  content: string;
  data: PostMatter;
  publicAtMs: number;
  readingTime: number;
  filePath: string;
  fileName: string;
}
