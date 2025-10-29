'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PagePropsWithLocale, Dictionary } from '~/i18n/types'

import { getDict } from '~/i18n/get-dict'
import { formatEther } from 'viem'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '~/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { useAccount } from 'wagmi'

type TokenBalance = {
  contractAddress: string
  tokenBalance: number
  name: string
  symbol: string
  decimals: number
  logo: string
}

export default function ForPCEDetailPage({
  params: { locale },
}: PagePropsWithLocale<{}>) {
  const router = useRouter()
  const { proposal } = { proposal: undefined } // TODO: Handle state properly with Next.js
  const [dict, setDict] = useState<Dictionary | null>(null)
  const [tabContent, setTabContent] = useState('details')
  const [treasuryBalances, setTreasuryBalances] = useState<TokenBalance[]>([])
  const [isDepositDialogOpened, setIsDepositDialogOpened] = useState(false)
  const [tokenAddress, setTokenAddress] = useState('')
  const [transferAmount, setTransferAmount] = useState('')

  const { address, chainId } = useAccount()
  const localDict = dict?.pceDetail ?? {}

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

  return (
    <div className="flex flex-col w-full gap-8 p-8">
      <Tabs defaultValue="details" className="w-full" value={tabContent}>
        <TabsList>
          <TabsTrigger value="details" onClick={() => setTabContent('details')}>
            {localDict.details ?? 'Details'}
          </TabsTrigger>
          <TabsTrigger value="balance" onClick={() => setTabContent('balance')}>
            {localDict.balance ?? 'Balance'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          {!proposal ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <h1 className="text-3xl font-bold">404</h1>
              <p className="text-gray-600 ">
                {localDict.proposalNotFound ?? 'Proposal not found'}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-4">
                <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full">
                  {localDict.transferTokens ?? 'Transfer tokens'}
                </span>
              </div>

              <div className="flex flex-col gap-2 bg-gray-50 p-6 rounded-xl">
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <span className="text-gray-600">
                      {localDict.voteFor ?? 'Vote For'}
                    </span>
                    <span className="text-sm text-gray-500">
                      {localDict.forDescription ??
                        'Votes in favor of the proposal'}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-medium">
                      {Number(formatEther(proposal[5] || 0)).toLocaleString()}{' '}
                      {localDict.votes ?? 'votes'}
                    </span>
                    <span className="text-sm text-gray-500">
                      (
                      {proposal[5] && proposal[6] !== undefined
                        ? proposal[6] === 0 && proposal[5] > 0
                          ? '100'
                          : (
                              (Number(formatEther(proposal[5])) /
                                (Number(formatEther(proposal[5])) +
                                  Number(formatEther(proposal[6])))) *
                              100
                            ).toFixed(2)
                        : '0'}
                      % {localDict.ofTotalVotes ?? '% of total votes'}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <span className="text-gray-600">
                      {localDict.voteAgainst ?? 'Vote Against'}
                    </span>
                    <span className="text-sm text-gray-500">
                      {localDict.againstDescription ??
                        'Votes against the proposal'}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-medium">
                      {Number(formatEther(proposal[6] || 0)).toLocaleString()}{' '}
                      {localDict.votes ?? 'votes'}
                    </span>
                    <span className="text-sm text-gray-500">
                      (
                      {proposal[5] && proposal[6] !== undefined
                        ? proposal[5] === 0 && proposal[6] > 0
                          ? '100'
                          : (
                              (Number(formatEther(proposal[6])) /
                                (Number(formatEther(proposal[5])) +
                                  Number(formatEther(proposal[6])))) *
                              100
                            ).toFixed(2)
                        : '0'}
                      % {localDict.ofTotalVotes ?? '% of total votes'})
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-4">
                  {localDict.description ?? 'Description'}
                </h2>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {proposal[9]}
                </p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="balance">
          <div className="flex flex-col md:flex-row mt-4 gap-4">
            <div className="flex flex-col w-full">
              <h1 className="text-2xl font-bold">
                {localDict.treasury ?? 'Treasury'}
              </h1>
              <div className="rounded-xl flex border mt-4 flex-col w-full gap-4 p-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold">
                        {localDict.token ?? 'Token'}
                      </TableHead>
                      <TableHead className="font-bold">
                        {localDict.amount ?? 'Amount'}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {treasuryBalances.length > 0 ? (
                      treasuryBalances.map((token, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-bold">
                            {token.name === '' ? 'PCE TEST' : token.name}
                          </TableCell>
                          <TableCell className="font-bold">
                            {token.tokenBalance.toFixed(4)}{' '}
                            {token.symbol === '' ? 'PCE TEST' : token.symbol}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={2} className="text-center">
                          {localDict.noTokensFound ?? 'No tokens found'}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
            <div className="flex flex-col w-full md:w-[40%]">
              <h1 className="text-2xl font-bold">
                {localDict.daoBalance ?? 'DAO Balance'}
              </h1>

              <div className="flex flex-col justify-between border rounded-xl p-4 mt-4 gap-4 bg-gray-100">
                <h1 className="font-bold rounded-xl flex">
                  {localDict.daoTreasury ?? 'DAO Treasury'}
                </h1>
                <div className="flex flex-row justify-between">
                  <h1 className="font-bold rounded-xl flex">
                    {localDict.totalValue ?? 'Total Value'}
                  </h1>
                  <h1 className="font-bold rounded-xl flex">$0</h1>
                </div>

                <div className="flex flex-row justify-between">
                  <h1 className="font-bold rounded-xl flex">
                    {localDict.numberOfTokens ?? 'Number of Tokens'}
                  </h1>
                  <h1 className="font-bold rounded-xl flex">
                    {treasuryBalances.length}
                  </h1>
                </div>

                <div className="flex flex-row justify-between">
                  <h1 className="font-bold rounded-xl flex">
                    {localDict.numberOfNfts ?? 'Number of NFTs'}
                  </h1>
                  <h1 className="font-bold rounded-xl flex">$0</h1>
                </div>

                <Dialog
                  open={isDepositDialogOpened}
                  onOpenChange={() => {
                    setIsDepositDialogOpened(!isDepositDialogOpened)
                  }}
                >
                  <DialogTrigger asChild>
                    <Button className="w-full bg-dark_blue">
                      {localDict.depositToDaoTreasury ??
                        'Deposit to DAO Treasury'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader className="flex flex-col gap-2">
                      <DialogTitle>Address</DialogTitle>
                      <DialogDescription>
                        {localDict.tokenAddressToDeposit ??
                          'Token address to deposit'}
                      </DialogDescription>
                      <Input
                        onChange={(e) => setTokenAddress(e.target.value)}
                        placeholder={localDict.address ?? 'Address'}
                      />
                      <DialogTitle>{localDict.amount ?? 'Amount'}</DialogTitle>
                      <DialogDescription>
                        {localDict.amountToDeposit ?? 'Amount to deposit'}
                      </DialogDescription>
                      <Input
                        onChange={(e) => setTransferAmount(e.target.value)}
                        placeholder={localDict.amount ?? 'Amount'}
                      />
                      <Button
                        className="w-full bg-dark_blue"
                        onClick={async () => {
                          // Handle deposit logic here
                          setTokenAddress('')
                          setTransferAmount('')
                          setIsDepositDialogOpened(!isDepositDialogOpened)
                        }}
                      >
                        {localDict.deposit ?? 'Deposit'}
                      </Button>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
