import { useUI } from '@sentre/senhub'
import { Col, Row } from 'antd'

import ListPools from './listPools'
import New from './newPool'
import Search from './search'

const Pools = () => {
  const {
    ui: { width },
  } = useUI()

  const isMobile = width < 768

  return (
    <Row gutter={[12, 12]} justify="center" align="middle">
      <Col xs={24} md={20} lg={16} xl={12} xxl={8}>
        <Row gutter={[12, 12]} className="search-pools" justify="space-between">
          <Search />
          <Col span={isMobile ? 24 : undefined}>
            <New />
          </Col>
        </Row>
      </Col>
      <Col span={24} />
      <Col xs={24} md={20} lg={16} xl={12} xxl={8}>
        <ListPools />
      </Col>
    </Row>
  )
}
export default Pools
