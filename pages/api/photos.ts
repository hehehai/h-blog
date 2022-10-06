// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { atlasParser } from '../../utils/photo'
import { Atlas, Issue } from '../interface/photo'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Atlas[] | { message: string }>
) {
  const { page = 1 } = req.query
  const url = `https://api.github.com/repos/hehehai/h-blog/issues?assignee=hehehai&labels=photos&sort=created&direction=desc&per_page=100&page=${page}`
  
  try {
    const resData = await fetch(url)
    if (resData.status === 200) {
      const issues: Issue[] = await resData.json()
      res.json(issues.map(issue => {
        const { meta, photos } = atlasParser(issue.body)        
        return {
          issuesId: issue.id,
          title: issue.title,
          ...meta,
          photos,
          labels: issue.labels.map(label => ({id: label.id, name: label.name, color: label.color}))
        }
      }))
    } else {
      res.status(500).send({ message: 'Failed to fetch' })
    }
  } catch (err) {
    res.status(500).send({ message: 'Failed to fetch' })
  }
}
