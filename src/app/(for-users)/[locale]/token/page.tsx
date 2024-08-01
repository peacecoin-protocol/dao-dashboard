'use client'
import { Input } from '~/components/ui/input'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '~/components/ui/dialog'

import { Button } from '~/components/ui/button'
import { pceAddress, POLY_SCAN_TX } from '~/app/constants/constants'
import { PCE_ABI } from '~/app/ABIs/PCEToken'
import { PagePropsWithLocale } from '~/i18n/types'
import { getDict } from '~/i18n/get-dict'

import { useEffect, useState } from 'react'
import { formatEther } from 'ethers'
import { createClient } from 'viem'
import { readContract } from '@wagmi/core'
import { http, createConfig } from '@wagmi/core'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
} from 'wagmi'
import { polygonAmoy } from '@wagmi/core/chains'
import Link from 'next/link'

const config = createConfig({
  chains: [polygonAmoy],
  client({ chain }) {
    return createClient({ chain, transport: http() })
  },
})

export default function ForTokenPage({
  params: { locale, ...params },
}: PagePropsWithLocale<{}>) {
  const [dict, setDict] = useState<any>(null)

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
  const { address, chainId } = useAccount()
  const { data: hash, error, writeContract } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  const [isOpened, setDialogStatus] = useState(false)
  const [tokenInfo, setTokenInfo] = useState<any>()
  const [exchangeRates, setExchangeRate] = useState<any[]>([])
  const [tokens, setTokens] = useState<any[]>([])

  const { data: balance, refetch: refetchBalance } = useReadContract({
    address: pceAddress,
    abi: PCE_ABI,
    functionName: 'balanceOf',
    args: [address],
    chainId: chainId,
  })

  const { data: _tokens, refetch: refetchTokens } = useReadContract({
    address: pceAddress,
    abi: PCE_ABI,
    functionName: 'getTokens',
    args: [],
    chainId: chainId,
  })

  const { data: lastModifiedFactor, refetch: refetchLastModifiedFactor } =
    useReadContract({
      address: pceAddress,
      abi: PCE_ABI,
      functionName: 'lastModifiedFactor',
      args: [],
      chainId: chainId,
    })

  const { data: factor } = useReadContract({
    address: pceAddress,
    abi: PCE_ABI,
    functionName: 'getCurrentFactor',
    args: [],
    chainId: chainId,
  })

  const { data: INITIAL_FACTOR, refetch: refetchINITIAL_FACTOR } =
    useReadContract({
      address: pceAddress,
      abi: PCE_ABI,
      functionName: 'INITIAL_FACTOR',
      args: [],
      chainId: chainId,
    })

  const fetchExchangeRate = async (_tokens: []) => {
    if (!_tokens || _tokens.length == 0) return
    let _exchangeRates = []
    for (let i = 0; i < _tokens.length; i++) {
      const exchangeRate = await readContract(config, {
        address: pceAddress,
        abi: PCE_ABI,
        functionName: 'getExchangeRate',
        args: [_tokens[i]],
      })

      _exchangeRates.push(exchangeRate)
    }
    setExchangeRate(_exchangeRates)
  }

  useEffect(() => {
    _tokens && setTokens(_tokens as [])
  }, [_tokens])

  useEffect(() => {
    if (tokens) {
      fetchExchangeRate(tokens as [])
    }
  }, [tokens])

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name
    const value = event.target.value

    let _tokenInfo = tokenInfo || {}

    switch (name) {
      case 'name':
        _tokenInfo.name = value
        break
      case 'symbol':
        _tokenInfo.symbol = value
        break
      case 'amountToExchange':
        _tokenInfo.amountToExchange = value
        break
      case 'dilutionFactor':
        _tokenInfo.dilutionFactor = value
        break
      case 'decreaseIntervalDays':
        _tokenInfo.decreaseIntervalDays = value
        break
      case 'afterDecreaseBp':
        _tokenInfo.afterDecreaseBp = value
        break
      case 'maxIncreaseOfTotalSupplyBp':
        _tokenInfo.maxIncreaseOfTotalSupplyBp = value
        break
      case 'maxIncreaseBp':
        _tokenInfo.maxIncreaseBp = value
        break
      case 'maxUsageBp':
        _tokenInfo.maxUsageBp = value
        break
      case 'changeBp':
        _tokenInfo.changeBp = value
        break
    }

    // Test Token Data
    _tokenInfo.name = 'test'
    _tokenInfo.symbol = 'TEST'
    _tokenInfo.amountToExchange = 10e18
    _tokenInfo.dilutionFactor = 2e18
    _tokenInfo.decreaseIntervalDays = 7
    _tokenInfo.afterDecreaseBp = 20
    _tokenInfo.maxIncreaseOfTotalSupplyBp = 20
    _tokenInfo.maxIncreaseBp = 2000
    _tokenInfo.maxUsageBp = 3000
    _tokenInfo.changeBp = 3000

    _tokenInfo.incomeExchangeAllowMethod = 3
    _tokenInfo.outgoExchangeAllowMethod = 3
    _tokenInfo.incomeTargetTokens = []
    _tokenInfo.outgoTargetTokens = []
    setTokenInfo(_tokenInfo)
  }

  useEffect(() => {
    if (isConfirmed) {
      toast.success(
        <Link href={`${POLY_SCAN_TX}${hash}`} target="_blank">
          Claim Success, View TX
        </Link>
      )
      refetchBalance()
    } else if (isConfirming) {
      toast.info(<div className="disabled">TX is Pending, Please Wait...</div>)
    } else if (error) {
      toast.error((error as BaseError).shortMessage)
    }
  }, [isConfirmed, isConfirming, error, hash, refetchBalance])

  const handleSwapFromLocalToken = async (token: any) => {
    if (!token || !INITIAL_FACTOR || !lastModifiedFactor) return

    const allowance = await readContract(config, {
      address: token,
      abi: PCE_ABI,
      functionName: 'allowance',
      args: [address, pceAddress],
    })

    const _exchangeRate = await readContract(config, {
      address: pceAddress,
      abi: PCE_ABI,
      functionName: 'getExchangeRate',
      args: [token],
    })

    if (!_exchangeRate) return
    const allowanceBigInt = BigInt(allowance as string)
    const INITIAL_FACTORBigInt = BigInt(INITIAL_FACTOR as string)
    const _exchangeRateBigInt = BigInt(_exchangeRate as string)
    const _lastModifiedFactorBigInt = BigInt(lastModifiedFactor as string)

    const factor = await readContract(config, {
      address: token,
      abi: PCE_ABI,
      functionName: 'getCurrentFactor',
      args: [],
    })
    const requiredAllowance = BigInt(100) * BigInt(factor as string)

    if (allowanceBigInt < requiredAllowance) {
      writeContract({
        abi: PCE_ABI,
        address: token,
        functionName: 'approve',
        args: [pceAddress, requiredAllowance],
      })
    } else {
      writeContract({
        abi: PCE_ABI,
        address: pceAddress,
        functionName: 'swapFromLocalToken',
        args: [token, BigInt(100)],
      })
    }
  }

  const handleCreateToken = async () => {
    setDialogStatus(!isOpened)

    writeContract({
      abi: PCE_ABI,
      address: pceAddress,
      functionName: 'createToken',
      args: [tokenInfo],
    })
  }

  return (
    <div className="w-full gap-4 flex flex-col">
      <div className="text-center text-2xl">{dict ? dict.token.title : ''}</div>

      <div>
        {dict ? dict.token.subtitle1 : ''}
        {': '}
        {balance ? formatEther(BigInt(balance as string)) : '0'}
      </div>

      <div>
        {dict ? dict.token.subtitle2 : ''}
        {': '} {factor ? formatEther(BigInt(factor as string)) : '0'}
      </div>
      <Button
        className="w-40"
        variant="outline"
        onClick={() => {
          setDialogStatus(true)
        }}
      >
        {dict ? dict.token.createToken : ''}
      </Button>
      <Dialog
        open={isOpened}
        onOpenChange={() => {
          setDialogStatus(!isOpened)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Input the token Info</DialogTitle>
            <DialogDescription>
              This is the information to create the community token.
            </DialogDescription>
            <div className="gap-4">
              <Input
                name="name"
                placeholder="Name"
                className="my-2"
                onChange={handleChange}
              ></Input>
              <Input
                name="symbol"
                placeholder="symbol"
                className="my-2"
                onChange={handleChange}
              ></Input>
              <Input
                name="amountToExchange"
                placeholder="amountToExchange"
                className="my-2"
                onChange={handleChange}
              ></Input>
              <Input
                name="dilutionFactor"
                placeholder="dilutionFactor"
                className="my-2"
                onChange={handleChange}
              ></Input>
              <Input
                name="decreaseIntervalDays"
                placeholder="decreaseIntervalDays"
                className="my-2"
                onChange={handleChange}
              ></Input>
              <Input
                name="afterDecreaseBp"
                placeholder="afterDecreaseBp"
                className="my-2"
                onChange={handleChange}
              ></Input>
              <Input
                name="maxIncreaseOfTotalSupplyBp"
                placeholder="maxIncreaseOfTotalSupplyBp"
                className="my-2"
                onChange={handleChange}
              ></Input>
              <Input
                name="maxIncreaseBp"
                placeholder="maxIncreaseBp"
                className="my-2"
                onChange={handleChange}
              ></Input>
              <Input
                name="maxUsageBp"
                placeholder="maxUsageBp"
                className="my-2"
                onChange={handleChange}
              ></Input>
              <Input
                name="changeBp"
                placeholder="changeBp"
                className="my-2"
                onChange={handleChange}
              ></Input>
            </div>
          </DialogHeader>
          <DialogFooter>
            <Button
              className="mt-5"
              variant="outline"
              onClick={handleCreateToken}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Table className="border">
        <TableCaption>{dict ? dict.token.list : ''}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>{dict ? dict.token.tokenAddress : ''}</TableHead>
            <TableHead>{dict ? dict.token.exchnageRate : ''}</TableHead>
            <TableHead>{dict ? dict.token.swapToLocal : ''}</TableHead>
            <TableHead>{dict ? dict.token.swapFromLocal : ''}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tokens &&
            tokens.map((token, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{token}</TableCell>
                <TableCell>
                  {exchangeRates &&
                    exchangeRates[index] &&
                    formatEther(exchangeRates[index])}
                </TableCell>
                <TableCell className="font-medium">
                  <Button
                    onClick={async () => {
                      writeContract({
                        abi: PCE_ABI,
                        address: pceAddress,
                        functionName: 'swapToLocalToken',
                        args: [tokens[2], 100],
                      })
                    }}
                  >
                    {dict ? dict.token.swapToLocal : ''}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      handleSwapFromLocalToken(token)
                    }}
                  >
                    {dict ? dict.token.swapFromLocal : ''}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>
              {dict ? dict.token.totalToken : ''}
            </TableCell>
            <TableCell>{tokens && tokens.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <ToastContainer
        position="bottom-right"
        closeOnClick
        draggable
      ></ToastContainer>
    </div>
  )
}
