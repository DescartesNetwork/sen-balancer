import { CSSProperties, Fragment, useCallback, useState } from 'react'

import { Button, Modal, Space } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'
import SearchMints from './searchMints'

export type MintSelectionProps = {
  value?: string
  onChange?: (value: string) => void
  style?: CSSProperties
  disabled?: boolean
  nativeSol?: boolean
  hoverable?: boolean
  cardItemClassname?: string
}

const MintSelection = ({
  value = '',
  onChange = () => {},
  style = {},
  disabled = false,
  nativeSol = false,
  hoverable = true,
  cardItemClassname,
}: MintSelectionProps) => {
  const [visible, setVisible] = useState(false)

  const onSelect = useCallback(
    (mintAddress: string) => {
      onChange(mintAddress)
      setVisible(false)
    },
    [onChange],
  )

  return (
    <Fragment>
      <Button
        type="text"
        onClick={() => setVisible(true)}
        style={{ padding: 4, ...style }}
        disabled={disabled}
      >
        <Space>
          <MintAvatar mintAddress={value} />
          <MintSymbol mintAddress={value} />
          <IonIcon name="chevron-down-outline" />
        </Space>
      </Button>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        closable={false}
        centered
        className="mint-select-modal"
        destroyOnClose
      >
        <SearchMints
          onChange={onSelect}
          nativeSol={nativeSol}
          value={value}
          hoverable={hoverable}
          cardItemClassName={cardItemClassname}
        />
      </Modal>
    </Fragment>
  )
}

export default MintSelection
