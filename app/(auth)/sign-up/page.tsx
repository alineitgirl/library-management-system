'use client'
import AuthForm from '@/components/AuthForm'
import { signUpSchema } from '@/lib/validations'
import {signInWithCredentials} from '@/lib/actions/auth'

const Page = () => {
  return (
    <AuthForm
    type="SIGN_UP"
    schema={signUpSchema}
    defaultValues={{
      email: '',
      password: '',
      fullName: '',
      universityId: 0,
      universityCard: "",
    }}
    onSubmit={signInWithCredentials}
    />
  )
}

export default Page;