'use client';

import { useReviews } from '@/hooks/useReviews';
import { Review } from '@/types';

export default function Reviews({ id }: { id: string }) {
	const { reviews, isLoading, isError } = useReviews(id);

	return (
		<ul>
			{reviews?.map((review: Review) => (
				<li key={review.id}>{review.content}</li>
			))}
		</ul>
	);
}
