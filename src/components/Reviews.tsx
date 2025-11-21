'use client';

import ReadMore from '@/components/ui/ReadMore/ReadMore';
import { useReviews } from '@/hooks/useReviews';
import { Review } from '@/types';

export default function Reviews({ id }: { id: string }) {
    const { reviews, isLoading, isError } = useReviews(id);

    if (!reviews || reviews.length === 0)
        return <div className="">No Reviews yet</div>;
    return (
        <ul>
            <h2>Reviews</h2>
            <p>
                Generated at: <strong>{new Date().toDateString()}</strong>
            </p>
            {reviews?.map((review: Review, index: number) => (
                <li key={review.id}>
                    <h3 className="text-lg font-bold">
                        Review {index + 1} by{' '}
                        <span className="italic">{review?.author}</span>
                    </h3>
                    <ReadMore text={review.content} />
                    <div className="border-t-2 border-black w-full my-2" />
                </li>
            ))}
        </ul>
    );
}
