import React, { ChangeEvent, useEffect, useState } from 'react';
import './Input.css';

export interface InputProps {
	text?: string;
	width?: number | string;
	height?: number | string;
	onChange?(value: string | number | boolean): void;
	autoComplete?: 'off';
	style?: React.CSSProperties;
	value?: string | number;
	className?: string;
}

export const Textarea: React.FC<InputProps> = ({ text, width, height, onChange, autoComplete, style, value, className }) => {
	const [innerValue, setInnerValue] = useState<string | number | undefined>(undefined);

	useEffect(() => {
		setInnerValue(value);
	}, [value]);

	return (
		<div style={style} className={className}>
			<span className="spanInput">{text && text}</span>
			<textarea
				defaultValue={innerValue}
				autoComplete={autoComplete}
				onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
					const target = event.target as HTMLTextAreaElement;
					onChange && onChange(target.value);
				}}
				style={{ width: width ? width : 400, height: height ? height : 34 }}
			></textarea>
		</div>
	);
};
