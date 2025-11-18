import React, { useState } from 'react'

const ReadMore = ({
    text,
    amountOfWords = 500,
}: {
    text: string
    amountOfWords?: number
}) => {
    const [showMore, setShowMore] = useState(false)

    if (!text) return null

    const beginText = text
        .slice(0, amountOfWords - 1)
        .split(' ')
        .join(' ')
    const endText = text
        .slice(amountOfWords, text.length - 1)
        .split(' ')
        .join(' ')

    return (
        <div>
            {beginText}
            {
                <>
                    {showMore && <span>{endText}</span>}
                    <button
                        onClick={() => setShowMore((prev) => !prev)}
                        className="font-semibold mx-2 underline text-black/80 cursor-pointer hover:text-black/50"
                    >
                        {showMore ? 'Show Less' : 'Show More'}
                    </button>
                </>
            }
        </div>
    )
}

export default ReadMore
