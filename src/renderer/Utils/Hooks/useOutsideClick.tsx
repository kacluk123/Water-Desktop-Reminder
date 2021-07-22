import * as React from 'react'

const useOutsideClick = (callback: () => void, ref: any) => {
  React.useEffect(() => {
    const addGlobalClick = (event: MouseEvent) => {
      if (!ref.current.contains(event.target)) {
        callback()
      }
    }
    document.addEventListener('mousedown', addGlobalClick)
    return () => {
      document.removeEventListener('mousedown', addGlobalClick)
    }
  }, [])
}

export default useOutsideClick