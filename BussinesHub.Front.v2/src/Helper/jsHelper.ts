export const AppendToClassNameById = (id: string, toAppend: string) => {
	const elem = document.getElementById(id)
	if (elem) elem.className = elem.className + toAppend
}

export const RemoveClassNameById = (id: string, toRemove: string) => {
	const elem = document.getElementById(id)
	if (elem) elem.className = elem.className.replace(toRemove, '')
}
