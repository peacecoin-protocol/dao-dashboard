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
  const [labels, setLabels] = useState<LABEL[]>([])
  const [filteredPIP, setFilteredPIP] = useState<string | null>(null)
  const [filteredStatus, setFilteredStatus] = useState<string | null>(null)

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
      setLabels(parsedLabels)
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
        state: 'all',
      })

      for (const issue of issues) {
        const issueData: ISSUE = {
          number: issue.number,
          title: issue.title,
          body: issue.body || '',
          created_at: issue.created_at,
          updated_at: issue.updated_at,
          state: issue.state,
          labels: issue.labels.map((label: any) => ({
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
        <h2 className="text-4xl font-bold tracking-tight mt-6">{'ALL'}</h2>
        <p className="text-muted-foreground">{'Living PIPs'}</p>

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
                {filteredStatus
                  ? STATUS.find((status) => status === filteredStatus)
                  : 'Select status'}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search status..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No status found.</CommandEmpty>
                  <CommandGroup>
                    {STATUS.map((status) => (
                      <CommandItem
                        value={status}
                        key={status}
                        onSelect={() => {
                          if (status === filteredStatus) {
                            setFilteredStatus(null)
                          } else {
                            setFilteredStatus(status)
                          }
                          setIsStatusFilterOpen(false)
                        }}
                      >
                        {status}
                        <Check
                          className={cn(
                            'ml-auto',
                            status === filteredStatus
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
                  filteredPIP && 'text-muted-foreground'
                )}
              >
                {filteredPIP
                  ? labels.find((label) => label.name === filteredPIP)?.name
                  : 'Select label'}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search label..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No label found.</CommandEmpty>
                  <CommandGroup>
                    {labels.map((label) => (
                      <CommandItem
                        value={label.name}
                        key={label.id}
                        onSelect={() => {
                          if (label.name === filteredPIP) {
                            setFilteredPIP(null)
                          } else {
                            setFilteredPIP(label.name)
                          }
                          setIsStatusFilterOpen(false)
                        }}
                      >
                        {label.name}
                        <Check
                          className={cn(
                            'ml-auto',
                            label.name === filteredPIP
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
                Labels
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
                if (filteredStatus) {
                  return issue.state === filteredStatus
                }
                return true
              })
              .filter((issue) => {
                if (filteredPIP) {
                  return issue.labels.some(
                    (label) => label.name === filteredPIP
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
                    {issue.state}
                  </TableCell>
                  <TableCell className="border-2 border-gray87 border-solid	">
                    {issue.labels.map((label) => label.name).join(', ')}
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
          size="lg"
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
