'use client';

import { useReviews } from '@/hooks/useReviews';
import { Review } from '@/types';

export default function Reviews({ id }: { id: string }) {
	const { reviews, isLoading, isError } = useReviews(id);

	if (!reviews || reviews.length === 0)
		return <div className=''>No Reviews yet</div>;
	return (
		<ul>
			<h2>Reviews</h2>
			<p>Generated at: {new Date().toISOString()}</p>
			{reviews?.map((review: Review) => (
				<li key={review.id}>{review.content}</li>
			))}
		</ul>
	);
}
