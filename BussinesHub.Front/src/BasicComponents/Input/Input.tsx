import React, { ChangeEvent, useEffect, useState } from 'react';
import './Input.css';

export interface InputProps {
	text?: string;
	width?: number | string;
	height?: number | string;
	onChange?(value: string | number | boolean): void;
	type: 'text' | 'number' | 'checkbox';
	autoComplete?: 'off';
	style?: React.CSSProperties;
	value?: string | number;
	checked?: boolean;
	className?: string;
}

export const Input: React.FC<InputProps> = ({ text, width, height, onChange, type, autoComplete, style, value, className, checked }) => {
	const [innerValue, setInnerValue] = useState<string | number | undefined>(undefined);

	useEffect(() => {
		setInnerValue(value);
	}, [value]);

	return (
		<div style={style} className={className}>
			<span className="spanInput">{text && text}</span>
			<input
				type={type}
				defaultValue={innerValue}
				autoComplete={autoComplete}
				checked={checked}
				onChange={(event: ChangeEvent<HTMLInputElement>) => {
					const target = event.target as HTMLInputElement;
					if (type === 'number') onChange && onChange(Number(target.value));
					else if (type === 'checkbox') onChange && onChange(Boolean(target.checked));
					else onChange && onChange(target.value);
				}}
				style={{ width: width ? width : 400, height: height ? height : 34 }}
			></input>
		</div>
	);
};
