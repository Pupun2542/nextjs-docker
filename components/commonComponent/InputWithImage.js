import { Input, Textarea } from '@chakra-ui/react'
import React from 'react'

const InputWithImage = ({onChange, onPaste, value, onKeyDown}) => {
    const handleImagePaste = (e) => {
        if (e.clipboardData.files[0]) {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
                onPaste(reader.result);
            }
          };
          reader.readAsDataURL(e.clipboardData.files[0]);
        }
      };
  return (
    <Textarea onPaste={handleImagePaste} onChange={onChange} value={value} onKeyDown={onKeyDown} resize="false"  />
  )
}

export default InputWithImage