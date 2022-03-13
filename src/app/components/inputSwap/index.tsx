import React, { useState } from 'react'

import { Col, Radio, Row, Space, Typography } from 'antd'
import NumericInput from 'shared/antd/numericInput'
import { MintSymbol } from 'shared/antd/mint'
import Selection from '../selection'

import { numeric } from 'shared/util'

import './index.less'

const enum Proportion {
  Half = 'half',
  Full = 'full',
}

export default function InputSwap() {
  const [amount, setAmount] = useState(0)
  const [proportion, setPropotion] = useState(Proportion.Half)
  return (
    <Row
      gutter={[0, 10]}
      align="middle"
      style={{ background: '#142042', borderRadius: 20, padding: 16 }}
    >
      <Col span={24}>
        <Row style={{ width: '100%' }}>
          <Col flex="auto" style={{ justifyContent: 'left' }}>
            <Selection value={{ poolAddresses: [] }} onChange={() => {}} />
          </Col>
          <Col style={{ maxWidth: '50%' }}>
            <NumericInput
              bordered={false}
              style={{
                textAlign: 'right',
                fontSize: 24,
                maxWidth: 150,
                padding: 0,
                color: '#9CA1AF',
              }}
              placeholder="0"
              value={amount}
              onValue={(value) => setAmount(Number(value))}
            />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row align="middle" style={{ width: '100%' }}>
          <Col flex="auto" style={{ justifyContent: 'left' }}>
            <Space className="caption">
              <Typography.Text type="secondary">Available:</Typography.Text>
              <Typography.Text
                type="secondary"
                style={{ cursor: 'pointer' }}
                onClick={() => {}}
              >
                {numeric(0).format('0,0.[00]')}
              </Typography.Text>
              <Typography.Text type="secondary">
                <MintSymbol mintAddress={''} />
              </Typography.Text>
            </Space>
          </Col>
          <Col>
            <Radio.Group
              value={1}
              buttonStyle="solid"
              className="proportion-wrap"
            >
              <Space>
                <Space size={4} direction="vertical">
                  <Radio.Button
                    className="proportion-btn"
                    onClick={() => {}}
                    value={1}
                    style={{ background: proportion && '#f148fb' }}
                  />
                  <Typography.Text type="secondary" className="caption">
                    50%
                  </Typography.Text>
                </Space>
                <Space size={4} direction="vertical">
                  <Radio.Button
                    className="proportion-btn"
                    onClick={() => {}}
                    value={2}
                  />
                  <Typography.Text type="secondary" className="caption">
                    100%
                  </Typography.Text>
                </Space>
              </Space>
            </Radio.Group>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
