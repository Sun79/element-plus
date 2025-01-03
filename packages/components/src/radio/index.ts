import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { defineComponent, PropType, h, DefineComponent } from 'vue'
import {
  composeExport,
  resolveComponent,
  SlotTypes,
} from '../__builtins__/shared'
import { PreviewText } from '../preview-text'

import {
  ElRadio,
  ElRadioGroup,
  ElRadioButton,
  type RadioProps as ElRadioProps,
  type RadioGroupProps as ElRadioGroupProps,
} from 'element-plus'

interface CustomRadioGroupProps {
  value: any
  options?: (
    | (Partial<Omit<ElRadioProps, 'label'>> & {
        label: SlotTypes
        value: ElRadioProps['value']
      })
    | string
  )[]
  optionType: 'default' | 'button'
}

export type RadioGroupProps = ElRadioGroupProps & CustomRadioGroupProps

const RadioGroupOption = defineComponent({
  name: 'FRadioGroup',
  props: {
    options: {
      type: Array as PropType<RadioGroupProps['options']>,
      default: () => [],
    },
    optionType: {
      type: String as PropType<RadioGroupProps['optionType']>,
      default: 'default',
    },
  },
  setup(customProps, { attrs, slots }) {
    return () => {
      const options = customProps.options || []
      const OptionType =
        customProps.optionType === 'button' ? ElRadioButton : ElRadio
      const children =
        options.length !== 0
          ? {
              default: () =>
                options.map((option) => {
                  if (typeof option === 'string') {
                    return h(
                      OptionType,
                      { label: option },
                      {
                        default: () => [
                          resolveComponent(slots?.option ?? option, { option }),
                        ],
                      }
                    )
                  } else {
                    return h(
                      OptionType,
                      {
                        ...option,
                        value: undefined,
                        label: option.value,
                      },
                      {
                        default: () => [
                          resolveComponent(slots?.option ?? option.label, {
                            option,
                          }),
                        ],
                      }
                    )
                  }
                }),
            }
          : slots
      return h(
        ElRadioGroup,
        {
          ...attrs,
        },
        children
      )
    }
  },
}) as unknown as typeof ElRadioGroup & DefineComponent<CustomRadioGroupProps>

const RadioGroup = connect(
  RadioGroupOption,
  mapProps({ dataSource: 'options', value: 'modelValue' }),
  mapReadPretty(PreviewText.Select)
)
export const Radio = composeExport(ElRadio, {
  Group: RadioGroup,
})

export default Radio
