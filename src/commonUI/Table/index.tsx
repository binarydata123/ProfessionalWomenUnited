'use client';
import React, { useEffect, useState } from 'react';
import './style.css';
import { Placeholder } from 'react-bootstrap';

interface Props {
	className?: string;
	children?: (rowData: any, index: number) => React.ReactNode;
	columns: any[];
	data?: any[];
	Tooltip?: string;
}

export default function Table({ className, children, columns, data }: Props) {
	const [isLoading, setisLoading] = useState(true);
	// Check if data is empty or has zero length
	const isDataEmpty = !data || data.length === 0;

	useEffect(() => {
		if (children) {
			setisLoading(false);
		}
	}, []);

	return (
		<table className={`table-wrapper rwd-table ${className}`}>
			<tbody>
				<tr>{columns && columns.map((item, index) => <th key={index}>{item}</th>)}</tr>
				{isLoading && columns.length > 0 ? (
					<>
						<tr className="w-100">
							<td colSpan={columns.length}>
								<Placeholder as="p" animation="glow">
									<Placeholder xs={12} style={{ height: '50px', backgroundColor: '#f9f2ef' }} />
								</Placeholder>
							</td>
						</tr>
						<tr className="w-100">
							<td colSpan={columns.length}>
								<Placeholder as="p" animation="glow">
									<Placeholder xs={12} style={{ height: '50px', backgroundColor: '#f9f2ef' }} />
								</Placeholder>
							</td>
						</tr>
						<tr className="w-100">
							<td colSpan={columns.length}>
								<Placeholder as="p" animation="glow">
									<Placeholder xs={12} style={{ height: '50px', backgroundColor: '#f9f2ef' }} />
								</Placeholder>
							</td>
						</tr>
					</>
				) : isDataEmpty ? (
					<tr>
						<td colSpan={columns.length}>No data found</td>
					</tr>
				) : (
					data.map((item, index) => (children ? children(item, index) : null))
				)}
			</tbody>
		</table>
	);
}
