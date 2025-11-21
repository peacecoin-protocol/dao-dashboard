'use client'

import { useEffect, useMemo, useState } from 'react'
import { Octokit } from 'octokit'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { Button } from '~/components/ui/button'
import { Check, ChevronsUpDown } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '~/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
import { DialogGithub } from '~/components/custom/dialog-github'
import { cn } from '~/lib/utils'
import { PagePropsWithLocale, Dictionary } from '~/i18n/types'
import { getDict } from '~/i18n/get-dict'
import { STATUS } from '~/app/constants/constants'
import { PIP } from '~/i18n/types'

export default function ForPage({
  params: { locale, ...params },
}: PagePropsWithLocale<{}>) {
  const [dict, setDict] = useState<Dictionary | null>(null)
  const [open, setOpen] = useState(false)

  const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false)

  const [filteredStatus, setFilteredStatus] = useState<string[]>([])
  const [filteredCategory, setFilteredCategory] = useState<string[]>([])

  const [statusLabels, setStatusLabels] = useState<string[]>(STATUS)

  const [pipContents, setPipContents] = useState<PIP[]>([])
  const [pip, setPip] = useState<PIP | null>(null)

  let octokit: Octokit | null = null

  const githubAccessToken = process.env.NEXT_PUBLIC_GITHUB_ACCESS

  useEffect(() => {
    octokit = new Octokit({
      auth: githubAccessToken,
    })
  }, [githubAccessToken])

  useEffect(() => {
    const fetchDict = async () => {
      try {
        const fetchedDict = await getDict(locale)
        setDict(fetchedDict)
      } catch (error) {
        console.error('Error fetching dictionary:', error)
      }
    }
    fetchDict()
  }, [locale])

  const fetchOpendPip = async (): Promise<any[]> => {
    try {
      if (!octokit) return []
      const { data: pullRequests } = await octokit.rest.pulls.list({
        owner: 'peacecoin-protocol',
        repo: 'PIPs',
        state: 'open', // or 'open', 'closed'
        per_page: 100, // adjust as needed
      })

      let pullRequestFiles: any[] = []
      for (const pullRequest of pullRequests) {
        // Get files changed in the pull request
        const { data: _files } = await octokit.rest.pulls.listFiles({
          owner: 'peacecoin-protocol',
          repo: 'PIPs',
          pull_number: pullRequest.number,
        })
        pullRequestFiles = [...pullRequestFiles, ..._files]
      }

      return pullRequestFiles
    } catch (error) {
      console.error('Error fetching all files in branch:', error)
      return []
    }
  }

  useEffect(() => {
    const fetchAllPip = async () => {
      try {
        if (!octokit) return []
        let pullRequestFiles: any[] = []
        let pipContents: PIP[] = []

        const openedFiles = await fetchOpendPip()
        pullRequestFiles = [...pullRequestFiles, ...openedFiles]

        const closedFiles = await fetchClosedPip()
        pullRequestFiles = [...pullRequestFiles, ...closedFiles]

        for (let i = 0; i < pullRequestFiles.length; i++) {
          const file = pullRequestFiles[i]
          const fileSha = file?.sha || ''
          const { data: blobData } = await octokit.rest.git.getBlob({
            owner: 'peacecoin-protocol',
            repo: 'PIPs',
            file_sha: fileSha,
          })

          // The content is base64 encoded
          const fileContent = atob(blobData.content.replace(/\n/g, ''))

          let _path = ''
          if (i < openedFiles.length) {
            _path = pullRequestFiles[i].blob_url
          } else {
            _path = pullRequestFiles[i].html_url
          }

          const pipContent = fetchFileContent(fileContent, _path)
          pipContents.push(pipContent)
        }
        pipContents.sort((a, b) => Number(a.number) - Number(b.number))
        setPipContents(pipContents)
      } catch (error) {
        console.error('Error fetching all files in branch:', error)
      }
    }
    fetchAllPip()
  }, [])

  const fetchClosedPip = async (): Promise<any[]> => {
    // Get files from the repository
    if (!octokit) return []
    const { data: files } = await octokit.rest.repos.getContent({
      owner: 'peacecoin-protocol',
      repo: 'PIPs',
      path: 'PIPs',
      ref: 'main',
    })

    return files as any[]
  }

  const fetchFileContent = (fileContent: string, path: string) => {
    const pipContent = {
      number: parseContent(fileContent, 'pip'),
      title: parseContent(fileContent, 'title'),
      proposer: parseContent(fileContent, 'proposer'),
      status: parseContent(fileContent, 'status'),
      type: parseContent(fileContent, 'type'),
      category: parseContent(fileContent, 'category'),
      content: fileContent,
      created: parseContent(fileContent, 'created'),
      path: path,
    }
    return pipContent
  }

  function parseContent(content: string, start: string) {
    const match = content.match(new RegExp(`^${start}:\\s*(.*)$`, 'm'))
    return match?.[1]?.trim() ?? ''
  }

  function handleOpen() {
    setOpen(!open)
  }

  const filteredPips = useMemo(() => {
    return pipContents
      .filter((pip) => {
        return (
          filteredStatus.length === 0 || filteredStatus.includes(pip.status)
        )
      })
      .filter((pip) => {
        return (
          filteredCategory.length === 0 ||
          filteredCategory.includes(pip.category)
        )
      })
  }, [pipContents, filteredStatus, filteredCategory])

  return (
    <div className="w-full min-h-screen bg-background p-4 sm:p-6 lg:p-8 gap-4 flex flex-col">
      <div className="w-[95%] mx-auto gap-6 flex flex-col">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-4 sm:mt-2">
          {dict?.pipAll?.title || 'ALL Proposals'}
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          {dict?.pipAll?.description || 'ALL Peacecoin Improvement Proposals'}
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <Popover
            open={isStatusFilterOpen}
            onOpenChange={setIsStatusFilterOpen}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  'w-full sm:w-[220px] justify-between',
                  filteredStatus && 'text-muted-foreground'
                )}
              >
                {filteredStatus.length > 0
                  ? filteredStatus[0] +
                    (filteredStatus.length > 1
                      ? ` + ${filteredStatus.length - 1} more`
                      : '')
                  : dict?.pipAll?.selectStatus || 'Select status'}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder={dict?.pipAll?.searchStatus || 'Search status...'}
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>
                    {dict?.pipAll?.noStatusFound || 'No status found.'}
                  </CommandEmpty>
                  <CommandGroup>
                    {statusLabels.map((label, index) => (
                      <CommandItem
                        value={label}
                        key={`status-${label}-${index}`}
                        onSelect={() => {
                          if (filteredStatus.includes(label)) {
                            setFilteredStatus(
                              filteredStatus.filter(
                                (status) => status !== label
                              )
                            )
                          } else {
                            setFilteredStatus([...filteredStatus, label])
                          }
                          setIsStatusFilterOpen(false)
                        }}
                      >
                        {label}
                        <Check
                          className={cn(
                            'ml-auto',
                            filteredStatus.includes(label)
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="w-full overflow-x-auto hidden sm:block">
          <Table className="min-w-[720px]">
            <TableHeader>
              <TableRow className="bg-gray94 border-2 border-gray87 border-solid">
                <TableHead className="w-[100px] border-2 border-gray87 border-solid text-xs sm:text-sm">
                  {dict?.pipAll?.number || 'Number'}
                </TableHead>
                <TableHead className="border-2 border-gray87 border-solid text-xs sm:text-sm">
                  {dict?.pipAll?.tableTitle || 'Title'}
                </TableHead>
                <TableHead className="border-2 border-gray87 border-solid text-xs sm:text-sm">
                  {dict?.pipAll?.author || 'Author'}
                </TableHead>
                <TableHead className="border-2 border-gray87 border-solid text-xs sm:text-sm">
                  {dict?.pipAll?.state || 'State'}
                </TableHead>
                <TableHead className="border-2 border-gray87 border-solid text-xs sm:text-sm">
                  {dict?.pipAll?.types || 'Types'}
                </TableHead>
                <TableHead className="border-2 border-gray87 border-solid text-xs sm:text-sm">
                  {dict?.pipAll?.createdAt || 'Created At'}
                </TableHead>
                <TableHead className="border-2 border-gray87 border-solid text-xs sm:text-sm">
                  {dict?.pipAll?.github || 'GitHub'}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPips.map((pip, index) => (
                <TableRow
                  key={`${pip.number}-${pip.title}-${index}`}
                  className="border-2 border-gray87 border-solid cursor-pointer"
                  onClick={() => {
                    setPip(pip)
                    setOpen(true)
                  }}
                >
                  <TableCell className="font-medium border-2 border-gray87 border-solid text-xs sm:text-sm break-words">
                    {pip.number}
                  </TableCell>
                  <TableCell className="border-2 border-gray87 border-solid text-xs sm:text-sm break-words">
                    {pip.title}
                  </TableCell>
                  <TableCell className="border-2 border-gray87 border-solid text-xs sm:text-sm break-words">
                    {pip.proposer}
                  </TableCell>
                  <TableCell className="border-2 border-gray87 border-solid text-xs sm:text-sm">
                    {pip.status}
                  </TableCell>
                  <TableCell className="border-2 border-gray87 border-solid text-xs sm:text-sm">
                    {pip.type}
                  </TableCell>
                  <TableCell className="border-2 border-gray87 border-solid text-xs sm:text-sm break-words">
                    {new Date(pip.created).toLocaleString()}
                  </TableCell>
                  <TableCell
                    className="border-2 border-gray87 border-solid text-blue-800 text-xs sm:text-sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(pip.path, '_blank')
                    }}
                  >
                    {dict?.pipAll?.viewOnGitHub || 'View on GitHub'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col gap-4 sm:hidden">
          {filteredPips.map((pip, index) => (
            <button
              key={`${pip.number}-${pip.title}-${index}-card`}
              className="text-left rounded-xl border border-gray87 bg-white shadow-sm p-4 space-y-2"
              onClick={() => {
                setPip(pip)
                setOpen(true)
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="text-sm font-semibold">
                  #{pip.number || '-'}
                </div>
                <span className="inline-flex items-center rounded-full bg-gray100 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-gray-700">
                  {pip.status || dict?.pipAll?.state}
                </span>
              </div>
              <div className="text-base font-semibold text-gray-900">
                {pip.title || dict?.pipAll?.tableTitle}
              </div>
              <div className="text-xs text-muted-foreground">
                {dict?.pipAll?.author || 'Author'}: {pip.proposer || '-'}
              </div>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span>
                  {dict?.pipAll?.types || 'Types'}: {pip.type || '-'}
                </span>
                <span>
                  {dict?.pipAll?.createdAt || 'Created'}:{' '}
                  {pip.created
                    ? new Date(pip.created).toLocaleDateString()
                    : '-'}
                </span>
              </div>
              <div
                className="text-xs font-medium text-blue-700 underline"
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(pip.path, '_blank')
                }}
              >
                {dict?.pipAll?.viewOnGitHub || 'View on GitHub'}
              </div>
            </button>
          ))}
        </div>
        <DialogGithub
          open={open}
          pip={pip}
          setOpen={handleOpen}
          localDict={dict}
        />
      </div>
    </div>
  )
}
