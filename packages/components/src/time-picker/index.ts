import { transformComponent } from '../__builtins__/shared'
import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { PreviewText } from '../preview-text'
import { ElTimePicker } from 'element-plus'

export type TimePickerProps = InstanceType<typeof ElTimePicker>['$props']

const TransformElTimePicker = transformComponent(ElTimePicker, {
  change: 'update:modelValue',
})

export const TimePicker = connect<typeof ElTimePicker>(
  TransformElTimePicker,
  mapProps({ readOnly: 'readonly', value: 'modelValue' }),
  mapReadPretty(PreviewText.TimePicker)
)

export default TimePicker
