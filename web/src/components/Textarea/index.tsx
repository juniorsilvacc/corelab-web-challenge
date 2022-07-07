import React, { TextareaHTMLAttributes } from 'react'
import styles from './styles.module.scss';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{ }

export default function Textarea({...rest}: TextAreaProps) {
  return (
    <textarea className={styles.texarea} {...rest}>
    </textarea>
  )
}
