import React from 'react'
import { Button } from './ui/button'
import { CircleDashed } from 'lucide-react'

const FormButton = ({state} : {state:boolean}) => {
  return (
    
    <Button className="" type='submit' disabled={state}>{state ? <CircleDashed className="w-[20px] animate-spin" /> : ''} &nbsp;Submit</Button>
  )
}

export default FormButton