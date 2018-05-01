export function findValue (value, values) {
  // Convert nested levels to array
  let keys = value.toString().split('.')
  let val
  // If it has only one level we take the first key and find it in values
  if (keys.length === 1) {
    const first_key = keys[0]
    val = values[first_key]
    // Otherwise we should check in the next nested level
  } else if (keys.length > 1) {
    const first_key = JSON.parse(JSON.stringify(keys[0]))
    let object_property = values[first_key]
    keys = keys.slice(1)
    if (typeof object_property === 'undefined') {
      val = null
    } else {
      // Remove the first item of keys because we have already accessed
      keys.forEach((key, index) => {
        if ((index + 1) === keys.length) {
          if (typeof object_property === 'undefined') {
            val = null
          } else {
            val = object_property[key]
          }
        } else {
          if (typeof object_property === 'undefined') {
            val = null
          } else {
            object_property = object_property[key]
          }
        }
      })
    }
  }

  return val
}
