import { transformComponent } from '../__builtins__'
import { connect, mapProps, mapReadPretty } from '@formily/vue'
import {
  ElInputNumber,
  type InputNumberProps as ElInputNumberProps,
} from 'element-plus'
import { PreviewText } from '../preview-text'

export type InputNumberProps = ElInputNumberProps

const TransformElInputNumber = transformComponent<InputNumberProps>(
  ElInputNumber,
  {
    change: 'update:modelValue',
  }
)

export const InputNumber = connect<typeof ElInputNumber>(
  TransformElInputNumber,
  mapProps(
    {
      value: 'modelValue',
      readOnly: 'readonly',
    },
    (props) => {
      let controlsPosition = 'right'
      if (props.controlsPosition) {
        controlsPosition = props.controlsPosition
      }
      return {
        controlsPosition,
        modelValue: props.modelValue,
      }
    }
  ),
  mapReadPretty(PreviewText.Input)
)

export default InputNumber
