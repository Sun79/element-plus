import { connect, mapProps } from '@formily/vue'

import { ElTransfer } from 'element-plus'

export { TransferProps } from 'element-plus'

export const Transfer = connect(
  ElTransfer,
  mapProps({ dataSource: 'data', value: 'modelValue' })
)

export default Transfer
