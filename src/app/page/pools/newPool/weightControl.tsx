import React from 'react'

import { Button, Col, Input, Row } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import { allowedKeyCode } from 'app/constant'
import { TokenInfo } from '.'

export default function WeightControl({
  tokenInfo,
  onChangeWeight,
  onChangeLock,
  onRemoveToken,
}: {
  tokenInfo: TokenInfo
  onChangeWeight: (value: string) => void
  onChangeLock: (value: boolean) => void
  onRemoveToken: () => void
}) {
  const { weight, isLocked } = tokenInfo

  return (
    <Row justify="end">
      <Col span={24}>
        <Input
          value={weight}
          size="small"
          bordered={false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (allowedKeyCode.includes((e.nativeEvent as any).data)) {
              onChangeWeight(e.target.value)
            }
          }}
          suffix={'%'}
          disabled={isLocked}
          style={{ width: '52px' }}
        />
        <Button
          onClick={() => {
            onChangeLock(!isLocked)
          }}
          shape="circle"
          icon={
            <IonIcon
              name={isLocked ? 'lock-closed-outline' : 'lock-open-outline'}
            />
          }
          style={{ background: 'unset' }}
        />
        <Button
          onClick={() => {
            onRemoveToken()
          }}
          shape="circle"
          icon={<IonIcon name="trash-outline" />}
        />
      </Col>
    </Row>
  )
}
