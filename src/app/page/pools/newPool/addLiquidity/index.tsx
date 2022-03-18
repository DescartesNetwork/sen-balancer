import React, { Dispatch, Fragment, useState } from 'react'

import { Col, Row, Space, Switch, Tooltip, Typography } from 'antd'
import { TokenInfo } from '../index'
import IonIcon from 'shared/antd/ionicon'
import LiquidityInfo from '../liquidityInfo'
import MintInput from 'app/components/mintInput'

const AddLiquidty = ({
  tokenList,
  onSetTokenList,
  setCurrentStep,
  poolAddress,
  depositedAmounts,
  setDepositedAmounts,
  restoredDepositedAmounts,
}: {
  tokenList: TokenInfo[]
  onSetTokenList: Dispatch<React.SetStateAction<TokenInfo[]>>
  setCurrentStep: Dispatch<React.SetStateAction<number>>
  poolAddress: string
  depositedAmounts: string[]
  setDepositedAmounts: Dispatch<React.SetStateAction<string[]>>
  restoredDepositedAmounts: string[]
}) => {
  const [isOptimizeLiquidity, setIsOptimizeLiquidity] = useState(false)

  const onSwitchOptimize = (checked: boolean) => {
    setIsOptimizeLiquidity(checked)
  }
  return (
    <Fragment>
      <Col>
        <Space direction="vertical" size={8}>
          {tokenList.map((value, idx) => (
            <MintInput
              amount={depositedAmounts[idx]}
              selectedMint={value.addressToken}
              onChangeAmount={(value: string) => {
                const newState = [...depositedAmounts]
                newState[idx] = value
                setDepositedAmounts(newState)
              }}
              restoredAmount={restoredDepositedAmounts[idx]}
            />
          ))}
          <Row justify="end" gutter={[8, 0]}>
            <Col>
              <Tooltip title="prompt text">
                <IonIcon name="information-circle-outline" />
              </Tooltip>
            </Col>
            <Col>
              <Typography.Text>Auto optimize liquidity</Typography.Text>
            </Col>
            <Col>
              <Switch onChange={onSwitchOptimize} />
            </Col>
          </Row>
        </Space>
      </Col>
      <Col span={24}>
        <LiquidityInfo
          tokenList={tokenList}
          depositAmounts={depositedAmounts}
          poolAddress={poolAddress}
          setCurrentStep={setCurrentStep}
        />
      </Col>
    </Fragment>
  )
}

export default AddLiquidty
