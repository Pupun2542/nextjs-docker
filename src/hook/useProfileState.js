import {useState} from 'react'

const useProfileState = (initial) => {
    const [edit, setEdit] = useState(initial)
    const isOpen = (section) => {
        return edit[section]
    }
    const onOpen = (section) => {
        setEdit({...edit, [section]: true})
    }
    const onClose = (section) => {
        setEdit({...edit, [section]: false})
    }

  return {isOpen, onOpen, onClose}
}

export default useProfileState