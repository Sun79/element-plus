import { composeExport, transformComponent } from '../__builtins__'
import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { PreviewText } from '../preview-text'
import { ElInput, type InputProps as ElInputProps } from 'element-plus'

export type InputProps = ElInputProps

const TransformElInput = transformComponent<InputProps>(ElInput, {
  change: 'update:modelValue',
})

const InnerInput = connect<typeof ElInput>(
  TransformElInput,
  mapProps({
    value: 'modelValue',
    readOnly: 'readonly',
  }),
  mapReadPretty(PreviewText.Input)
)

const TextArea = connect(
  InnerInput,
  mapProps((props) => {
    return {
      ...props,
      type: 'textarea',
    }
  }),
  mapReadPretty(PreviewText.Input)
)

export const Input = composeExport(InnerInput, {
  TextArea,
})

export default Input
