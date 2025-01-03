import { transformComponent } from '../__builtins__'
import { connect, mapProps } from '@formily/vue'
import { ElSwitch, type SwitchProps as ElSwitchProps } from 'element-plus'

export type SwitchProps = ElSwitchProps

const TransformElSwitch = transformComponent<SwitchProps>(ElSwitch, {
  change: 'update:modelValue',
})

export const Switch = connect<typeof ElSwitch>(
  TransformElSwitch,
  mapProps({
    value: 'modelValue',
    readOnly: 'readonly',
  })
)

export default Switch
