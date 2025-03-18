import * as React from 'react'
import { twMerge } from 'tailwind-merge'

const FormFieldError = ({message, className}: {message: string, className?: string}) => {
  return (
    <div data-formfielderrorvisible={!!message} className={twMerge('text-red-600 text-xs tracking-wider data-[formfielderrorvisible=false]:hidden data-[formfielderrorvisible=true]:block', className)}>{message}</div>
  )
}

export default React.memo(FormFieldError)