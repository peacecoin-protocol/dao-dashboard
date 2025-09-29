'use client'

import { useEffect, useState } from 'react'
import { Octokit } from 'octokit'
import { Env } from '~/env'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { Button } from '~/components/custom/button'
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

  const octokit = new Octokit({
    auth: Env.GITHUB_TOKEN,
  })

  console.log(Env.GITHUB_TOKEN, 'Env.GITHUB_TOKEN')

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

  const fetchOpendPip = async (): Promise<any> => {
    try {
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
    }
  }

  useEffect(() => {
    const fetchAllPip = async () => {
      try {
        let pullRequestFiles: any[] = []

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
          setPipContents((prevPipContents) => [...prevPipContents, pipContent])
        }
      } catch (error) {
        console.error('Error fetching all files in branch:', error)
      }
    }
    fetchAllPip()
  }, [])

  const fetchClosedPip = async (): Promise<any> => {
    // Get files from the repository
    const { data: files } = await octokit.rest.repos.getContent({
      owner: 'peacecoin-protocol',
      repo: 'PIPs',
      path: 'PIPs',
      ref: 'main',
    })

    return files as any
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

  return (
    <div className="w-full gap-4 flex flex-col">
      <div className="gap-4 flex flex-col m-8">
        <h2 className="text-4xl font-bold tracking-tight mt-6">
          {dict?.pipAll?.title || 'ALL Proposals'}
        </h2>
        <p className="text-muted-foreground">
          {dict?.pipAll?.description || 'ALL Peacecoin Improvement Proposals'}
        </p>

        <div className="flex flex-row gap-4 justify-end">
          <Popover
            open={isStatusFilterOpen}
            onOpenChange={setIsStatusFilterOpen}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  'w-[200px] justify-between',
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
                        key={index}
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
        <Table>
          <TableHeader>
            <TableRow className="bg-gray94 border-2 border-gray87 border-solid">
              <TableHead className="w-[100px] border-2 border-gray87 border-solid	">
                {dict?.pipAll?.number || 'Number'}
              </TableHead>
              <TableHead className="border-2 border-gray87 border-solid	">
                {dict?.pipAll?.tableTitle || 'Title'}
              </TableHead>
              <TableHead className="border-2 border-gray87 border-solid	">
                {dict?.pipAll?.author || 'Author'}
              </TableHead>
              <TableHead className="border-2 border-gray87 border-solid	">
                {dict?.pipAll?.state || 'State'}
              </TableHead>
              <TableHead className="border-2 border-gray87 border-solid	">
                {dict?.pipAll?.types || 'Types'}
              </TableHead>
              <TableHead className="border-2 border-gray87 border-solid	">
                {dict?.pipAll?.createdAt || 'Created At'}
              </TableHead>
              <TableHead className="border-2 border-gray87 border-solid	">
                {dict?.pipAll?.github || 'GitHub'}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pipContents
              .filter((pip) => {
                return (
                  filteredStatus.length === 0 ||
                  filteredStatus.includes(pip.status)
                )
              })
              .filter((pip) => {
                return (
                  filteredCategory.length === 0 ||
                  filteredCategory.includes(pip.category)
                )
              })
              .map((pip) => (
                <TableRow
                  key={pip.number}
                  className="border-2 border-gray87 border-solid cursor-pointer"
                  onClick={() => {
                    setPip(pip)
                    setOpen(true)
                  }}
                >
                  <TableCell className="font-medium border-2 border-gray87 border-solid	">
                    {pip.number}
                  </TableCell>
                  <TableCell className="border-2 border-gray87 border-solid	">
                    {pip.title}
                  </TableCell>
                  <TableCell className="border-2 border-gray87 border-solid	">
                    {pip.proposer}
                  </TableCell>
                  <TableCell className="border-2 border-gray87 border-solid	">
                    {pip.status}
                  </TableCell>
                  <TableCell className="border-2 border-gray87 border-solid	">
                    {pip.type}
                  </TableCell>
                  <TableCell className="border-2 border-gray87 border-solid	">
                    {new Date(pip.created).toLocaleString()}
                  </TableCell>
                  <TableCell
                    className="border-2 border-gray87 border-solid text-blue-800"
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
