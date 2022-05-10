import { useCallback } from 'react'
import { useHistory } from 'react-router'

import { Button, Col, Row, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import AppCard from '../appCard'
import { SwiperOs } from 'os/components/swiperOS'
import { SwiperSlide } from 'swiper/react'

import { RootDispatch, useRootDispatch } from 'os/store'
import { CategoryOptions, useAppCategory } from './hooks'
import { setValue } from 'os/store/search.reducer'

export type AppCategorySliceProps = {
  seeAll?: boolean
} & CategoryOptions

const AppCategorySlice = ({
  seeAll = true,
  ...options
}: AppCategorySliceProps) => {
  const dispatch = useRootDispatch<RootDispatch>()
  const history = useHistory()
  const { title, appIds } = useAppCategory(options)

  const onSeeAll = useCallback(async () => {
    const { category } = options
    await dispatch(setValue(''))
    return history.push({
      pathname: '/store',
      search: `?category=${category}`,
    })
  }, [dispatch, history, options])

  // Do not display category if no application exists
  if (!appIds.length) return null

  return (
    <Row gutter={[20, 20]} align="bottom">
      {/* Title */}
      <Col flex="auto">
        <Typography.Title level={2} style={{ textTransform: 'capitalize' }}>
          {title}
        </Typography.Title>
      </Col>
      {/* See all button */}
      {seeAll && (
        <Col>
          <Typography.Text type="danger">
            <Button
              size="small"
              type="text"
              onClick={onSeeAll}
              className="btn-see-all"
            >
              See all
              <IonIcon name="chevron-forward-outline" />
            </Button>
          </Typography.Text>
        </Col>
      )}
      {/* Apps in the category */}
      <Col span={24}>
        <SwiperOs>
          {appIds.map((appId) => (
            <SwiperSlide key={appId} style={{ maxWidth: 334, width: '75vw' }}>
              <AppCard appId={appId} />
            </SwiperSlide>
          ))}
        </SwiperOs>
      </Col>
    </Row>
  )
}

export default AppCategorySlice
