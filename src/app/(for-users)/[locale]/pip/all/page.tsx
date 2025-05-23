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
import { LABEL } from '~/i18n/types'
import { DialogGithub } from '~/components/custom/dialog-github'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { cn } from '~/lib/utils'
import { PagePropsWithLocale, Dictionary, ISSUE } from '~/i18n/types'
import { getDict } from '~/i18n/get-dict'

export default function ForPage({
  params: { locale, ...params },
}: PagePropsWithLocale<{}>) {
  const [dict, setDict] = useState<Dictionary | null>(null)
  const [issues, setIssues] = useState<ISSUE[]>([])
  const [open, setOpen] = useState(false)
  const [issue, setIssue] = useState<ISSUE | null>(null)
  const [isLabelFilterOpen, setIsLabelFilterOpen] = useState(false)
  const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false)
  const [typeLabels, setTypeLabels] = useState<LABEL[]>([])
  const [statusLabels, setStatusLabels] = useState<LABEL[]>([])
  const [filteredType, setFilteredType] = useState<string[]>([])
  const [filteredStatus, setFilteredStatus] = useState<string[]>([])

  const STATUS = ['open', 'closed']
  const octokit = new Octokit({
    auth: Env.GITHUB_TOKEN,
  })

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

  useEffect(() => {
    const fetchLabels = async () => {
      const labels = await octokit.rest.issues.listLabelsForRepo({
        owner: 'peacecoin-protocol',
        repo: 'dao',
      })
      const parsedLabels = labels.data.map((label: any) => ({
        id: label.id,
        name: label.name,
        color: label.color,
      }))

      const filteredLabels = parsedLabels.filter(
        (label: any) => label.name !== 'PIP'
      )

      const _typeLabels = filteredLabels
        .filter((label: any) => label.name.includes('type_'))
        .map((label: any) => ({
          ...label,
          name: label.name.replace('type_', ''),
        }))

      const _statusLabels = filteredLabels
        .filter((label: any) => label.name.includes('status_'))
        .map((label: any) => ({
          ...label,
          name: label.name.replace('status_', ''),
        }))

      setTypeLabels([..._typeLabels])
      setStatusLabels([..._statusLabels])

      console.log(_statusLabels)
    }
    fetchLabels()
  }, [])

  useEffect(() => {
    const fetchPip = async () => {
      toast.success('Fetching PIPs...')

      const { data: issues } = await octokit.rest.issues.listForRepo({
        owner: 'peacecoin-protocol',
        repo: 'dao',
        per_page: 100,
        state: 'open',
        labels: 'PIP',
      })

      for (const issue of issues) {
        const issueData: ISSUE = {
          number: issue.number,
          title: issue.title,
          body: issue.body || '',
          created_at: issue.created_at,
          updated_at: issue.updated_at,
          status: issue.labels
            .filter(
              (label: any) =>
                label.name !== 'PIP' && label.name.includes('status_')
            )
            .map((label: any) => ({
              name: label.name || '',
              color: label.color || '',
              id: label.id || 0,
            })),
          types: issue.labels
            .filter(
              (label: any) =>
                label.name !== 'PIP' && label.name.includes('type_')
            )
            .map((label: any) => ({
              name: label.name || '',
              color: label.color || '',
              id: label.id || 0,
            })),
          closed_at: issue.closed_at || '',
          url: issue.url,
          html_url: issue.html_url,
          author: issue.user?.login || '',
          avatar_url: issue.user?.avatar_url || '',
          isPullRequest: issue.pull_request != null,
        }
        setIssues((prevIssues) => [...prevIssues, issueData])
      }
    }
    fetchPip()
  }, [locale])

  function handleOpen() {
    setOpen(!open)
  }

  return (
    <div className="w-full gap-4 flex flex-col">
      <div className="gap-4 flex flex-col m-8">
        <h2 className="text-4xl font-bold tracking-tight mt-6">
          {'ALL Proposals'}
        </h2>
        <p className="text-muted-foreground">
          {'ALL Peacecoin Improvement Proposals'}
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
                  : 'Select status'}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search type..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No status found.</CommandEmpty>
                  <CommandGroup>
                    {statusLabels.map((label) => (
                      <CommandItem
                        value={label.name}
                        key={label.id}
                        onSelect={() => {
                          if (filteredStatus.includes(label.name)) {
                            setFilteredStatus(
                              filteredStatus.filter(
                                (status) => status !== label.name
                              )
                            )
                          } else {
                            setFilteredStatus([...filteredStatus, label.name])
                          }
                          setIsStatusFilterOpen(false)
                        }}
                      >
                        {label.name}
                        <Check
                          className={cn(
                            'ml-auto',
                            filteredStatus.includes(label.name)
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

          <Popover open={isLabelFilterOpen} onOpenChange={setIsLabelFilterOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  'w-[200px] justify-between',
                  filteredType && 'text-muted-foreground'
                )}
              >
                {filteredType.length > 0
                  ? filteredType[0] +
                    (filteredType.length > 1
                      ? ` + ${filteredType.length - 1} more`
                      : '')
                  : 'Select type'}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search type..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No type found.</CommandEmpty>
                  <CommandGroup>
                    {typeLabels.map((label) => (
                      <CommandItem
                        value={label.name}
                        key={label.id}
                        onSelect={() => {
                          if (filteredType.includes(label.name)) {
                            setFilteredType(
                              filteredType.filter((type) => type !== label.name)
                            )
                          } else {
                            setFilteredType([...filteredType, label.name])
                          }
                          setIsLabelFilterOpen(false)
                        }}
                      >
                        {label.name}
                        <Check
                          className={cn(
                            'ml-auto',
                            filteredType.includes(label.name)
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
                Number
              </TableHead>
              <TableHead className="border-2 border-gray87 border-solid	">
                Title
              </TableHead>
              <TableHead className="border-2 border-gray87 border-solid	">
                Author
              </TableHead>
              <TableHead className="border-2 border-gray87 border-solid	">
                State
              </TableHead>
              <TableHead className="border-2 border-gray87 border-solid	">
                Types
              </TableHead>
              <TableHead className="border-2 border-gray87 border-solid	">
                Created At
              </TableHead>
              <TableHead className="border-2 border-gray87 border-solid	">
                GitHub
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {issues
              .filter((issue) => !issue.isPullRequest)
              .filter((issue) => {
                if (filteredStatus && filteredStatus.length > 0) {
                  return issue.status.some((status) =>
                    filteredStatus.includes(status.name.replace('status_', ''))
                  )
                }
                return true
              })
              .filter((issue) => {
                if (filteredType && filteredType.length > 0) {
                  return issue.types.some((type) =>
                    filteredType.includes(type.name.replace('type_', ''))
                  )
                }
                return true
              })
              .map((issue) => (
                <TableRow
                  key={issue.number}
                  className="border-2 border-gray87 border-solid cursor-pointer"
                  onClick={() => {
                    setIssue(issue)
                    setOpen(true)
                  }}
                >
                  <TableCell className="font-medium border-2 border-gray87 border-solid	">
                    {issue.number}
                  </TableCell>
                  <TableCell className="border-2 border-gray87 border-solid	">
                    {issue.title}
                  </TableCell>
                  <TableCell className="border-2 border-gray87 border-solid	">
                    {issue.author}
                  </TableCell>
                  <TableCell className="border-2 border-gray87 border-solid	">
                    {issue.status
                      .map((status) => status.name.replace('status_', ''))
                      .join(', ')}
                  </TableCell>
                  <TableCell className="border-2 border-gray87 border-solid	">
                    {issue.types
                      .map((type) => type.name.replace('type_', ''))
                      .join(', ')}
                  </TableCell>
                  <TableCell className="border-2 border-gray87 border-solid	">
                    {new Date(issue.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell
                    className="border-2 border-gray87 border-solid text-blue-800"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(issue.html_url, '_blank')
                    }}
                  >
                    View on GitHub
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <DialogGithub
          open={open}
          issue={issue}
          setOpen={handleOpen}
          localDict={dict}
        />
      </div>
      <ToastContainer position="bottom-right" draggable></ToastContainer>
    </div>
  )
}
