import { connect, mapProps } from '@formily/vue'
import { Input } from '../input'

export type { InputProps as PasswordProps } from 'element-plus'

export const Password = connect(
  Input,
  mapProps((props) => ({
    ...props,
    showPassword: true,
  }))
)

export default Password
