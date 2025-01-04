import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { DefineComponent, defineComponent, h } from 'vue'
import { PreviewText } from '../preview-text'

import { ElSelect, ElOption } from 'element-plus'
import { transformComponent } from '../__builtins__'

type ElSelectProps = InstanceType<typeof ElSelect>['$props']
type ElOptionProps = InstanceType<typeof ElOption>['$props']

interface CustomSelectProps {
  options?: ElOptionProps[]
}

export type SelectProps = ElSelectProps & CustomSelectProps

const TransformElSelect = transformComponent<SelectProps>(ElSelect, {
  change: 'update:modelValue',
})

const InnerSelect = connect(
  TransformElSelect,
  mapProps({ value: 'modelValue', readOnly: 'readonly' }),
  mapReadPretty(PreviewText.Select)
)

type SelectComponentType = typeof ElSelect & DefineComponent<CustomSelectProps>

const SelectOption = defineComponent({
  name: 'FSelect',
  props: ['options'],
  setup(customProps, { attrs, slots }) {
    return () => {
      const options = customProps.options || []
      const children =
        options.length !== 0
          ? {
              default: () =>
                options.map((option: any) => {
                  if (typeof option === 'string') {
                    return h(
                      ElOption,
                      { key: option, value: option, label: option },
                      {
                        default: () =>
                          slots?.option?.({
                            option: { label: option, value: option },
                          }) ?? option,
                      }
                    )
                  } else {
                    return h(
                      ElOption,
                      {
                        key: option.value,
                        ...option,
                      },
                      {
                        default: () =>
                          slots?.option?.({ option }) ??
                          option.label ??
                          option.value,
                      }
                    )
                  }
                }),
            }
          : slots
      return h(
        InnerSelect,
        {
          ...attrs,
        },
        children
      )
    }
  },
}) as SelectComponentType

export const Select = connect(
  SelectOption,
  mapProps({ dataSource: 'options', loading: true }),
  mapReadPretty(PreviewText.Select)
)

export default Select
