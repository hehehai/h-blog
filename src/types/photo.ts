export interface Photo {
  alt?: string;
  path: string;
}

export interface PhotoLabel {
  id: number;
  name: string;
  color: string; // hex
}

export interface AtlasMeta {
  description?: string;
  place?: string;
  time?: string;
}

export interface Atlas extends AtlasMeta {
  title: string;
  issuesId: number;
  photos: Photo[];
  labels: PhotoLabel[];
}

// github issue struct https://docs.github.com/cn/rest/issues/issues#list-repository-issues
export interface Issue {
  id: number;
  node_id: string;
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  number: number;
  state: string;
  title: string;
  body: string;
  user: Assignee;
  labels: Label[];
  assignee: Assignee;
  assignees: Assignee[];
  milestone: Milestone;
  locked: boolean;
  active_lock_reason: string;
  comments: number;
  pull_request: PullRequest;
  closed_at: null;
  created_at: Date;
  updated_at: Date;
  closed_by: Assignee;
  author_association: string;
  state_reason: string;
}

export interface Assignee {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface Label {
  id: number;
  node_id: string;
  url: string;
  name: string;
  description: string;
  color: string;
  default: boolean;
}

export interface Milestone {
  url: string;
  html_url: string;
  labels_url: string;
  id: number;
  node_id: string;
  number: number;
  state: string;
  title: string;
  description: string;
  creator: Assignee;
  open_issues: number;
  closed_issues: number;
  created_at: Date;
  updated_at: Date;
  closed_at: Date;
  due_on: Date;
}

export interface PullRequest {
  url: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
}
