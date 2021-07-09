

// onKeyDown
export const saveContentPressEnter = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    e.target.blur()
  }
}

// Select all input value
export const selectAllInlineText = (e) => {
  e.target.focus()
  e.target.select()
  document.execCommand('selectAll', false, null)
}

