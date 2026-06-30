import { NextResponse } from 'next/server'
import { Octokit } from 'octokit'
import { ServerEnv } from '~/env.server'

type PipFile = {
  blob_url?: string
  html_url?: string
  sha?: string
}

const parseContent = (content: string, start: string) => {
  const match = content.match(new RegExp(`^${start}:\\s*(.*)$`, 'm'))
  return match?.[1]?.trim() ?? ''
}

const buildOctokit = () =>
  new Octokit(
    ServerEnv.GITHUB_ACCESS_TOKEN
      ? { auth: ServerEnv.GITHUB_ACCESS_TOKEN }
      : undefined
  )

export async function GET() {
  try {
    const octokit = buildOctokit()
    const { data: pullRequests } = await octokit.rest.pulls.list({
      owner: 'peacecoin-protocol',
      repo: 'PIPs',
      state: 'open',
      per_page: 100,
    })

    let pullRequestFiles: PipFile[] = []
    for (const pullRequest of pullRequests) {
      const { data: files } = await octokit.rest.pulls.listFiles({
        owner: 'peacecoin-protocol',
        repo: 'PIPs',
        pull_number: pullRequest.number,
      })
      pullRequestFiles = [...pullRequestFiles, ...(files as PipFile[])]
    }

    const { data: repositoryFiles } = await octokit.rest.repos.getContent({
      owner: 'peacecoin-protocol',
      repo: 'PIPs',
      path: 'PIPs',
      ref: 'main',
    })

    const allFiles = [
      ...pullRequestFiles,
      ...((repositoryFiles as PipFile[]) ?? []),
    ]

    const pipContents = await Promise.all(
      allFiles.map(async (file, index) => {
        const fileSha = file.sha ?? ''
        const { data: blobData } = await octokit.rest.git.getBlob({
          owner: 'peacecoin-protocol',
          repo: 'PIPs',
          file_sha: fileSha,
        })

        const fileContent = Buffer.from(
          blobData.content.replace(/\n/g, ''),
          'base64'
        ).toString('utf-8')

        const path =
          index < pullRequestFiles.length
            ? (file.blob_url ?? '')
            : (file.html_url ?? '')

        return {
          category: parseContent(fileContent, 'category'),
          content: fileContent,
          created: parseContent(fileContent, 'created'),
          number: parseContent(fileContent, 'pip'),
          path,
          proposer: parseContent(fileContent, 'proposer'),
          status: parseContent(fileContent, 'status'),
          title: parseContent(fileContent, 'title'),
          type: parseContent(fileContent, 'type'),
        }
      })
    )

    pipContents.sort((a, b) => Number(a.number) - Number(b.number))
    return NextResponse.json(pipContents)
  } catch (error) {
    console.error('Failed to fetch PIPs from GitHub:', error)
    return NextResponse.json(
      { error: 'Failed to fetch PIPs from GitHub' },
      { status: 500 }
    )
  }
}
