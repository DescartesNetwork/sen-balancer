import { useState } from 'react'
import { useSelector } from 'react-redux'
import { MintActionState, MintActionStates, PoolState } from '@senswap/balancer'

import { Button, Row, Col, Typography, Badge, Space, Tabs } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import { MintAvatar, MintSymbol } from '@sen-use/components'

import { AppState } from 'model'
import { notifyError, notifySuccess } from 'helper'
import { PresetStatusColorType } from 'antd/lib/_util/colors'

const FreezeAndThaw = ({ poolAddress }: { poolAddress: string }) => {
  const poolData = useSelector((state: AppState) => state.pools[poolAddress])
  const state = poolData.state as PoolState

  return (
    <Tabs className="freeze-thaw" type="card">
      <Tabs.TabPane key="pool" tab="Pool">
        {state['initialized'] && <FreezePool poolAddress={poolAddress} />}
        {state['frozen'] && <ThawPool poolAddress={poolAddress} />}
      </Tabs.TabPane>
      <Tabs.TabPane
        key="individual_token"
        tab="Individual token"
        disabled={!!state['frozen']}
      >
        <FreezeToken poolAddress={poolAddress} />
      </Tabs.TabPane>
    </Tabs>
  )
}

export default FreezeAndThaw

const ThawPool = ({ poolAddress }: { poolAddress: string }) => {
  const [loading, setLoading] = useState(false)

  const onThawPool = async () => {
    setLoading(true)
    try {
      const { thawPool } = window.balansol
      const { txId } = await thawPool(poolAddress)
      return notifySuccess('Thaw', txId)
    } catch (err) {
      notifyError(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <CardDescription
          statusColor="error"
          statusContent="Frozen"
          description="Thaw a pool will active all actions"
        />
      </Col>
      <Col span={24}>
        <Button
          ghost
          onClick={onThawPool}
          icon={<IonIcon name="sunny-outline" />}
          block
          loading={loading}
          size="large"
        >
          Thaw Pool
        </Button>
      </Col>
    </Row>
  )
}

const CardDescription = ({
  description,
  statusColor = 'success',
  statusContent,
}: {
  description: string
  statusColor?: PresetStatusColorType
  statusContent: string
}) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Space size={12} align="start">
          <IonIcon name="information-circle-outline" />
          <Space direction="vertical" size={0}>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              {description}
            </Typography.Text>
          </Space>
        </Space>
      </Col>
      <Col span={24}>
        <Space size={0}>
          <Badge status={statusColor} />
          <Typography.Text>Current status: {statusContent}</Typography.Text>
        </Space>
      </Col>
    </Row>
  )
}

export const FreezeToken = ({ poolAddress }: { poolAddress: string }) => {
  const { mints, actions } = useSelector(
    (state: AppState) => state.pools[poolAddress],
  )
  const [mintActions, setMintActions] = useState<MintActionState[]>(
    actions as any,
  )
  const [loading, setLoading] = useState(false)

  const onFreezeToken = async () => {
    setLoading(true)
    try {
      const { updateActions } = window.balansol
      const { txId } = await updateActions(poolAddress, mintActions)
      return notifySuccess('Freeze', txId)
    } catch (err) {
      notifyError(err)
    } finally {
      setLoading(false)
    }
  }

  const onClickToken = (index: number) => {
    const newMintActions = [...mintActions]

    switch (Object.keys(newMintActions[index])[0]) {
      case 'paused':
        newMintActions[index] = MintActionStates['Active']
        break
      case 'active':
        newMintActions[index] = MintActionStates['Paused']
        break
      default:
        break
    }
    setMintActions(newMintActions)
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Space size={12} align="start">
          <IonIcon name="alert-circle-outline" />
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            Freezing tokens will prevent all actions until the tokens has been
            thawed.
          </Typography.Text>
        </Space>
      </Col>
      <Col span={24}>
        <Row gutter={[12, 12]}>
          {mints.map((mint, idx) => (
            <Col span={8}>
              <Button block onClick={() => onClickToken(idx)} size="large">
                <Space size={8}>
                  <MintAvatar mintAddress={mint.toBase58()} />
                  <MintSymbol mintAddress={mint.toBase58()} />
                </Space>
                {!!(mintActions as any)[idx]['paused'] && (
                  <Space className="freezed-token" align="center">
                    <IonIcon name="snow-outline" style={{ color: '#F3F3F5' }} />
                  </Space>
                )}
              </Button>
            </Col>
          ))}
        </Row>
      </Col>
      <Col span={24}>
        <Button
          block
          ghost
          onClick={onFreezeToken}
          size="large"
          disabled={JSON.stringify(actions) === JSON.stringify(mintActions)}
          loading={loading}
        >
          Confirm
        </Button>
      </Col>
    </Row>
  )
}

const FreezePool = ({ poolAddress }: { poolAddress: string }) => {
  const [loading, setLoading] = useState(false)

  const onFreezePool = async () => {
    setLoading(true)
    try {
      const { freezePool } = window.balansol
      const { txId } = await freezePool(poolAddress)
      return notifySuccess('Freeze', txId)
    } catch (err) {
      notifyError(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <CardDescription
          statusColor="success"
          statusContent="Active"
          description="Freezing a pool will prevent all actions until the pool has been thawed."
        />
      </Col>
      <Col span={24}>
        <Button
          onClick={onFreezePool}
          icon={<IonIcon name="snow-outline" />}
          block
          loading={loading}
          ghost
          size="large"
        >
          Freeze Pool
        </Button>
      </Col>
    </Row>
  )
}
