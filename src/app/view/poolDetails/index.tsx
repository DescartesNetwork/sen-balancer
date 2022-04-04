import { Fragment } from 'react'
import { useSelector } from 'react-redux'

import { Card, Col, Row, Space, Typography } from 'antd'
import Deposit from './deposit'
import Withdraw from './withdraw'
import { PoolAvatar } from 'app/components/pools/poolAvatar'
import CardPoolDetail from './cardPoolDetail'
import DoughnutChart from './charts/doughnutChart'
import BarChart from './charts/barChart'
import IonIcon from 'shared/antd/ionicon'

import { useAppRouter } from 'app/hooks/useAppRouter'
import { AppState } from 'app/model'
import { useTVL } from 'app/hooks/useTVL'
import { useAccountBalanceByMintAddress } from 'shared/hooks/useAccountBalance'

import tvlBg from 'app/static/images/tvl.svg'
import apyBg from 'app/static/images/apy.svg'
import myContributeBg from 'app/static/images/my-contribution.svg'
import { numeric } from 'shared/util'

const PoolDetails = () => {
  const { getQuery } = useAppRouter()
  const poolAddress = getQuery('pool') || ''
  const {
    pools: { [poolAddress]: poolData },
  } = useSelector((state: AppState) => state)
  const TVL = useTVL(poolAddress)
  const { balance } = useAccountBalanceByMintAddress(
    poolData.mintLpt.toBase58(),
  )

  if (!poolAddress) return null

  return (
    <Row justify="center">
      <Col lg={20} md={24} style={{ maxWidth: 930 }}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Space size={10}>
              <IonIcon name="arrow-back-outline" />
              <Typography.Text strong={true}>Back</Typography.Text>
            </Space>
          </Col>
          <Col span={24}>
            <Row gutter={[24, 24]} justify="center">
              <Col lg={18} md={18} xs={24}>
                <Space align="start">
                  <PoolAvatar poolAddress={poolAddress} />
                  <Typography.Title level={4}>Balansol LP</Typography.Title>
                </Space>
              </Col>
              <Col lg={6} md={6} xs={24}>
                <Row gutter={[12, 12]} justify="end">
                  <Col span={12}>
                    <Withdraw poolAddress={poolAddress} />
                  </Col>
                  <Col span={12}>
                    <Deposit poolAddress={poolAddress} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={[24, 24]}>
              <Col lg={8} md={8} xs={24}>
                <CardPoolDetail
                  title="TVL"
                  content={
                    <Typography.Title level={3}>
                      $ {numeric(TVL).format('0,0.[00]a')}
                    </Typography.Title>
                  }
                  styles={{
                    background: `url(${tvlBg})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                  }}
                />
              </Col>
              <Col lg={8} md={8} xs={24}>
                <CardPoolDetail
                  title="APY"
                  content={<Typography.Title level={3}>9%</Typography.Title>}
                  styles={{
                    background: `url(${apyBg})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                  }}
                />
              </Col>
              <Col lg={8} md={8} xs={24}>
                <CardPoolDetail
                  title="My Contribution"
                  content={
                    <Fragment>
                      <Typography.Title level={3}>
                        {numeric(balance).format('0,0.[00]')}
                      </Typography.Title>
                      <Typography.Text type="secondary"> LP</Typography.Text>
                    </Fragment>
                  }
                  styles={{
                    background: `url(${myContributeBg})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                  }}
                />
              </Col>
            </Row>
          </Col>
          {/* Chart */}
          <Col span={24}>
            <Row gutter={[24, 24]} style={{ display: 'flex' }}>
              <Col lg={12} md={12} xs={24}>
                {/* Bar Chart */}
                <Card className="chart-card">
                  <Row gutter={[24, 24]}>
                    <Col span={24}>
                      <Row
                        justify="center"
                        align="middle"
                        className="chart-title"
                      >
                        <Col flex={'auto'}>
                          <Typography.Title level={4}>
                            24h Volume
                          </Typography.Title>
                        </Col>
                        <Col>
                          <Typography.Title level={2}>$3m</Typography.Title>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={24} flex="auto">
                      <BarChart />
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col lg={12} md={12} xs={24}>
                {/* Doughnut Chart */}
                <Card className="chart-card">
                  <Row gutter={[24, 24]}>
                    <Col span={24}>
                      <Row
                        justify="center"
                        align="middle"
                        className="chart-title"
                      >
                        <Col flex={'auto'}>
                          <Typography.Title level={4}>
                            Pool balance
                          </Typography.Title>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={24}>
                      <DoughnutChart />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
export default PoolDetails