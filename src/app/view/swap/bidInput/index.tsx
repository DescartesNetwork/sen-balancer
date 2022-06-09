import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useUI } from '@senhub/providers'

import MintInput from 'app/components/mintInput'
import { MintSelection } from 'shared/antd/mint'

import { AppDispatch, AppState } from 'app/model'
import { setSwapState } from 'app/model/swap.controller'
import { useMintsCanSwap } from 'app/hooks/swap/useMintsCanSwap'
import { useAppRouter } from 'app/hooks/useAppRouter'

const BidInput = () => {
  const { bidAmount, bidMint, askMint } = useSelector(
    (state: AppState) => state.swap,
  )
  const dispatch = useDispatch<AppDispatch>()
  const {
    ui: { theme },
  } = useUI()
  const mintsSwap = useMintsCanSwap()
  const { getAllQuery } = useAppRouter()
  const { bid_mint } = getAllQuery<{ bid_mint: string }>()

  useEffect(() => {
    if (bidMint) return
    if (!bid_mint) {
      dispatch(setSwapState({ bidMint: mintsSwap?.[0] || '' }))
      return
    }
    dispatch(setSwapState({ bidMint: bid_mint }))
  }, [bid_mint, bidMint, dispatch, mintsSwap])

  const onChange = (val: string) => {
    dispatch(setSwapState({ bidAmount: val, isReverse: false }))
  }
  // Ignore askMint in mints
  const filteredMints = useMemo(
    () => mintsSwap.filter((value) => value !== askMint),
    [askMint, mintsSwap],
  )

  return (
    <MintInput
      amount={bidAmount}
      selectedMint={bidMint}
      onChangeAmount={onChange}
      mints={filteredMints}
      mintSelection={
        <MintSelection
          value={bidMint}
          onChange={(mint) => {
            dispatch(setSwapState({ bidMint: mint }))
          }}
          style={{ background: theme === 'dark' ? '#394360' : '#F2F4FA' }}
        />
      }
    />
  )
}

export default BidInput
