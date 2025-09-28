'use client';

import { useEffect, useState } from 'react';

export default function Reviews({ id }: { id: string }) {
	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		async function loadReviews() {
			const res = await fetch(`/api/reviews?id=${id}`);
			const data = await res.json();
			setReviews(data.results || []);
		}
		loadReviews();
	}, [id]);

	console.log('reviews', reviews);

	return (
		<ul>
			{reviews?.map((review: { id: string; content: string }) => (
				<li key={review.id}>{review.content}</li>
			))}
		</ul>
	);
}
