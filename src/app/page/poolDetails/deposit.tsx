import { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import { BN } from '@project-serum/anchor'
import { utils } from '@senswap/sen-js'

import { Button, Col, Modal, Row, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import CardToken from './cardToken'

import { notifyError, notifySuccess } from 'app/helper'
import { AppState } from 'app/model'
import { useMint } from '@senhub/providers'


const Deposit = ({ poolAddress }: { poolAddress: string }) => {
  const [visible, setVisible] = useState(false)
  const [mintsAmount, setMintAmount] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const {
    pools: { [poolAddress]: poolData },
  } = useSelector((state: AppState) => state)
  const { getDecimals } = useMint()

  const onChange = (mint: string, value: string) => {
    const newMintsAmount = { ...mintsAmount }
    newMintsAmount[mint] = value
    setMintAmount(newMintsAmount)
  }

  const onSubmit = async () => {
    setLoading(true)
    try {
      const amountsIn = await Promise.all(poolData.mints.map(async (mint) => {
        let mintAddress = mint.toBase58()
        let decimals = await getDecimals(mintAddress)
        let mintAmmount = utils.decimalize(mintsAmount[mintAddress], decimals)
        return new BN(String(mintAmmount))
      }))
      const { txId } = await window.sen_balancer.addLiquidity(poolAddress, amountsIn)
      notifySuccess('Deposit', txId)
    } catch (error) {
      notifyError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Fragment>
      <Button onClick={() => setVisible(true)}>Deposit</Button>
      {/* Modal deposit */}
      <Modal
        title={<Typography.Title level={4}>Deposit</Typography.Title>}
        visible={visible}
        onCancel={() => setVisible(false)}
        className="modal-balansol"
        footer={null}
        destroyOnClose={true}
        centered={true}
        closeIcon={<IonIcon name="close-outline" />}
      >
        <Row gutter={[0, 16]}>
          <Col span={24}>
            <Row gutter={[24, 8]}>
              {poolData.mints.map((mint, index) => {
                let mintAddress: string = mint.toBase58()
                return (
                  <Col span={24} key={index}>
                    <CardToken
                      mintAddress={mintAddress}
                      onChangeAmount={onChange}
                      amountValue={mintsAmount[mintAddress]}
                    ></CardToken>
                  </Col>
                )
              })}
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={[0, 13]}>
              <Col span={24}>
                <Row align="middle">
                  <Col flex="auto">
                    <Typography.Text type="secondary">
                      Price impact
                    </Typography.Text>
                  </Col>
                  <Col>
                    <span style={{ color: '#03A326' }}>0 %</span>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Row align="middle">
                  <Col flex="auto">
                    <Typography.Text type="secondary">
                      You will reveice
                    </Typography.Text>
                  </Col>
                  <Col>
                    <Typography.Title level={4}>22.332 LP</Typography.Title>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Button
              className="balansol-btn"
              type="primary"
              block
              onClick={onSubmit}
              loading={loading}
            >
              Deposit
            </Button>
          </Col>
        </Row>
      </Modal>
    </Fragment>
  )
}

export default Deposit
