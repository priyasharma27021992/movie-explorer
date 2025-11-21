import { cn } from '@/utils/common'
import React, { useEffect, useRef, useState } from 'react'

const ReadMore = ({
    text,
    amountOfWords = 50,
}: {
    text: string
    amountOfWords?: number
}) => {
    const [showMore, setShowMore] = useState(false)
    const [height, setHeight] = useState('0px')
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setHeight(showMore ? `${containerRef.current?.scrollHeight}px` : '0px')
    }, [showMore])

    if (!text) return null

    const words = text.split(' ')
    const isLong = words.length > amountOfWords
    const beginText = words.slice(0, amountOfWords - 1).join(' ')
    const endText = words.slice(amountOfWords, text.length - 1).join(' ')

    return (
        <div>
            {beginText}
            {isLong && !showMore && '...'}
            <div
                ref={containerRef}
                style={{
                    height,
                }}
                className="overflow-hidden transition-all duration-1000 ease-in-out"
            >
                {endText}
            </div>
            {isLong && (
                <button
                    onClick={() => setShowMore((prev) => !prev)}
                    className="font-semibold mx-2 underline text-black/80 cursor-pointer hover:text-black/50"
                >
                    {showMore ? 'Show Less' : 'Show More'}
                </button>
            )}
        </div>
    )
}

export default ReadMore
