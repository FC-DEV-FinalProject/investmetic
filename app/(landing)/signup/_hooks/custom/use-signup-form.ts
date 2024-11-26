import { ChangeEvent, useState } from 'react'

import { useRouter } from 'next/navigation'

import { PATH } from '@/shared/constants/path'

import {
  SignupFormDataModel,
  SignupFormErrorsModel,
  SignupFormStateModel,
} from './../../information/types'
import { validateSignupForm } from './../../information/utils'

const initialForm: SignupFormDataModel = {
  name: '',
  nickname: '',
  email: '',
  emailDomain: '',
  verificationCode: '',
  password: '',
  passwordConfirm: '',
  phone: '',
  birthYear: '',
  birthMonth: '',
  birthDay: '',
  isMarketingAgreed: false,
}

const initialFormState: SignupFormStateModel = {
  isEmailVerified: false,
  isNicknameVerified: false,
  isEmailSent: false,
}

const useSignupForm = () => {
  const router = useRouter()
  const [form, setForm] = useState<SignupFormDataModel>(initialForm)
  const [errors, setErrors] = useState<SignupFormErrorsModel>({})
  const [formState, setFormState] = useState<SignupFormStateModel>(initialFormState)
  const [isValidated, setIsValidated] = useState(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev: SignupFormDataModel) => ({ ...prev, [name]: value }))

    if (isValidated) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }))
    }

    if (name === 'nickname') {
      setFormState((prev) => ({
        ...prev,
        isNicknameVerified: false,
      }))
    }
  }

  const handleMarketingAgree = (checked: boolean) => {
    setForm((prev: SignupFormDataModel) => ({ ...prev, isMarketingAgreed: checked }))
  }

  const handleNicknameCheck = async () => {
    try {
      // TODO: 닉네임 중복 확인 API 호출
      setFormState((prev) => ({ ...prev, isNicknameVerified: true }))

      if (errors.nickname) {
        setErrors((prev) => ({ ...prev, nickname: null }))
      }
    } catch (error) {
      console.error('닉네임 중복 확인 실패:', error)
    }
  }

  const handleFormSubmit = () => {
    const formErrors = validateSignupForm(
      form,
      formState.isEmailVerified,
      formState.isNicknameVerified
    )
    setIsValidated(true)

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    // TODO: 회원가입 API 호출
    console.log('폼 제출', form)
    router.push(PATH.SIGN_UP_COMPLETE)
  }

  return {
    form,
    setForm,
    errors,
    setErrors,
    formState,
    setFormState,
    isValidated,
    handleInputChange,
    handleMarketingAgree,
    handleFormSubmit,
    handleNicknameCheck,
  }
}

export default useSignupForm
