export interface Photo {
  alt?: string;
  path: string;
}

export interface PhotoLabel {
  color: string; // hex
  id: number;
  name: string;
}

export interface AtlasMeta {
  description?: string;
  place?: string;
  time?: string;
}

export interface Atlas extends AtlasMeta {
  issuesId: number;
  labels: PhotoLabel[];
  photos: Photo[];
  title: string;
}

// github issue struct https://docs.github.com/cn/rest/issues/issues#list-repository-issues
export interface Issue {
  active_lock_reason: string;
  assignee: Assignee;
  assignees: Assignee[];
  author_association: string;
  body: string;
  closed_at: null;
  closed_by: Assignee;
  comments: number;
  comments_url: string;
  created_at: Date;
  events_url: string;
  html_url: string;
  id: number;
  labels: Label[];
  labels_url: string;
  locked: boolean;
  milestone: Milestone;
  node_id: string;
  number: number;
  pull_request: PullRequest;
  repository_url: string;
  state: string;
  state_reason: string;
  title: string;
  updated_at: Date;
  url: string;
  user: Assignee;
}

export interface Assignee {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
}

export interface Label {
  color: string;
  default: boolean;
  description: string;
  id: number;
  name: string;
  node_id: string;
  url: string;
}

export interface Milestone {
  closed_at: Date;
  closed_issues: number;
  created_at: Date;
  creator: Assignee;
  description: string;
  due_on: Date;
  html_url: string;
  id: number;
  labels_url: string;
  node_id: string;
  number: number;
  open_issues: number;
  state: string;
  title: string;
  updated_at: Date;
  url: string;
}

export interface PullRequest {
  diff_url: string;
  html_url: string;
  patch_url: string;
  url: string;
}
