import { IFieldResetOptions } from '@formily/core'
import { h, useParentForm } from '@formily/vue'
import { observer } from '@formily/reactive-vue'
import { DefineComponent, defineComponent } from 'vue'

import type { ButtonProps } from 'element-plus'
import { ElButton } from 'element-plus'

export type ResetProps = IFieldResetOptions & ButtonProps

export const Reset = observer(
  defineComponent({
    name: 'FReset',
    props: {
      forceClear: {
        type: Boolean,
        default: false,
      },
      validate: {
        type: Boolean,
        default: false,
      },
    },
    setup(props, { attrs, slots }: any) {
      const formRef = useParentForm()
      return () => {
        const form = formRef?.value
        return h(
          ElButton,
          {
            ...attrs,
            onClick: (e: MouseEvent) => {
              if (attrs?.onClick) {
                if (attrs.onClick(e) === false) return
              }
              form
                ?.reset('*', {
                  forceClear: props.forceClear,
                  validate: props.validate,
                })
                .then(attrs.onResetValidateSuccess as (e: any) => void)
                .catch(attrs.onResetValidateFailed as (e: any) => void)
            },
          },
          slots
        )
      }
    },
  }) as unknown as typeof ElButton & DefineComponent<IFieldResetOptions>
)

export default Reset
