import React, { useState } from 'react';

const ReadMore = ({
	text,
	amountOfWords = 36,
}: {
	text: string;
	amountOfWords?: number;
}) => {
	const [showMore, setShowMore] = useState(false);

	if (!text) return null;

	const isTextOverflowing = text.length > amountOfWords;
	const beginText = text
		.slice(0, amountOfWords - 1)
		.split(' ')
		.join('');
	const endText = text
		.slice(amountOfWords, text.length - 1)
		.split(' ')
		.join('');

	console.log('baby beginText', beginText);

	return (
		<div>
			{isTextOverflowing ? (
				<>
					{`${beginText} ` && (
						<span>
							{showMore ? (
								<>
									{' '}
									{endText}
									<button onClick={() => setShowMore((prev) => !prev)}>
										Show Less
									</button>
								</>
							) : (
								<button onClick={() => setShowMore((prev) => !prev)}>
									...
								</button>
							)}
						</span>
					)}
				</>
			) : (
				<>{text}</>
			)}
		</div>
	);
};

export default ReadMore;
