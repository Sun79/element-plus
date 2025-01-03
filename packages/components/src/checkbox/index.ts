import { defineComponent, PropType, h, DefineComponent } from 'vue'
import { connect, mapProps, mapReadPretty } from '@formily/vue'
import {
  composeExport,
  transformComponent,
  resolveComponent,
  SlotTypes,
} from '../__builtins__/shared'

import {
  ElCheckbox,
  ElCheckboxGroup,
  ElCheckboxButton,
  type CheckboxProps as ElCheckboxProps,
  type CheckboxGroupProps as ElCheckboxGroupProps,
} from 'element-plus'
import { PreviewText } from '../preview-text'

interface CustomCheckboxProps {
  option:
    | (Partial<Omit<ElCheckboxProps, 'label'>> & {
        label: SlotTypes
        value: ElCheckboxProps['value']
      })
    | string
}

export type CheckboxProps = ElCheckboxProps & CustomCheckboxProps

const CheckboxOption = defineComponent({
  name: 'FCheckbox',
  inheritAttrs: false,
  props: {
    option: {
      type: Object,
      default: null,
    },
  },
  setup(curtomProps, { attrs, slots }) {
    return () => {
      const props = attrs as unknown as CheckboxProps
      const option = curtomProps?.option
      if (option) {
        const children = {
          default: () => [
            resolveComponent(slots.default ?? option.label, { option }),
          ],
        }
        const newProps = {} as Partial<ElCheckboxProps>
        Object.assign(newProps, option)
        newProps.label = option.value
        delete newProps.value

        return h(
          attrs.optionType === 'button' ? ElCheckboxButton : ElCheckbox,
          {
            ...newProps,
          },
          children
        )
      }

      return h(
        ElCheckbox,
        {
          ...props,
        },
        slots
      )
    }
  },
}) as unknown as typeof ElCheckbox & DefineComponent<CustomCheckboxProps>

interface CustomCheckboxGroupProps {
  value: any[]
  options?: Array<CheckboxProps | string>
  optionType: 'default' | 'button'
}

export type CheckboxGroupProps = ElCheckboxGroupProps & CustomCheckboxGroupProps

const TransformElCheckboxGroup = transformComponent(ElCheckboxGroup, {
  change: 'update:modelValue',
})

const CheckboxGroupOption = defineComponent({
  name: 'FCheckboxGroup',
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    optionType: {
      type: String as PropType<CheckboxGroupProps['optionType']>,
      default: 'default',
    },
  },
  setup(customProps, { attrs, slots }) {
    return (): any => {
      const options = customProps.options || []
      const children =
        options.length !== 0
          ? {
              default: () =>
                options.map((option) => {
                  if (typeof option === 'string') {
                    return h(
                      Checkbox,
                      {
                        option: {
                          label: option,
                          value: option,
                        },
                        optionType: customProps.optionType,
                      },
                      slots?.option
                        ? { default: () => slots.option({ option }) }
                        : {}
                    )
                  } else {
                    return h(
                      Checkbox as any,
                      {
                        option,
                        optionType: customProps.optionType,
                      },
                      slots?.option
                        ? { default: () => slots.option({ option }) }
                        : {}
                    )
                  }
                }),
            }
          : slots
      return h(
        TransformElCheckboxGroup,
        {
          ...attrs,
        },
        children
      )
    }
  },
}) as unknown as typeof ElCheckboxGroup &
  DefineComponent<CustomCheckboxGroupProps>

const CheckboxGroup = connect(
  CheckboxGroupOption,
  mapProps({ dataSource: 'options', value: 'modelValue' }),
  mapReadPretty(PreviewText.Select, {
    multiple: true,
  })
)

const InnerCheckbox = connect(
  CheckboxOption,
  mapProps({
    value: 'modelValue',
  })
)

export const Checkbox = composeExport(InnerCheckbox, {
  Group: CheckboxGroup,
})

export default Checkbox
