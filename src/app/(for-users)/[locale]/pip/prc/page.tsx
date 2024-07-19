'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'

import PIPBar from '~/components/common/pip-bar'

export default function ForPage() {
  return (
    <div className="w-full gap-4 flex flex-col">
      <div className="gap-4 flex flex-col">
        <PIPBar url="."></PIPBar>

        <h1 className="text-4xl">PRC</h1>
        <h2 className="text-3xl">Living</h2>
        <Table className="border-2 border-gray87 border-solid	">
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
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-2 border-gray87 border-solid">
              <TableCell className="font-medium border-2 border-gray87 border-solid	">
                ...
              </TableCell>
              <TableCell className="border-2 border-gray87 border-solid	">
                ...
              </TableCell>
              <TableCell className="border-2 border-gray87 border-solid	">
                ...
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
