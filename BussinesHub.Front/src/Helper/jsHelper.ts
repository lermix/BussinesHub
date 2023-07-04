export const AppendToClassNameById = (id: string, toAppend: string) => {
	const elem = document.getElementById(id)
	if (elem) elem.className = elem.className + toAppend
}

export const RemoveClassNameById = (id: string, toRemove: string) => {
	const elem = document.getElementById(id)
	if (elem) elem.className = elem.className.replace(toRemove, '')
}

export const SetClassNameById = (id: string, className: string) => {
	const elem = document.getElementById(id)
	if (elem) elem.className = className
}
export const SetClassNameToClasses = (targetClass: string, className: string) => {
	const elem = document.getElementsByClassName(targetClass)
	while (elem.length > 0) {
		const element = elem[0]
		element.className = className
	}
}

export const AppendClassNameToClasses = (targetClass: string, toAppend: string) => {
	const elem = document.getElementsByClassName(targetClass)
	for (let index = 0; index < elem.length; index++) {
		const element = elem[index]
		element.className = element.className + toAppend
	}
}

export const RemoveClassNameToClasses = (targetClass: string, toRemove: string) => {
	const elem = document.getElementsByClassName(targetClass)
	for (let index = 0; index < elem.length; index++) {
		const element = elem[index]
		element.className = element.className.replace(toRemove, '')
	}
}
