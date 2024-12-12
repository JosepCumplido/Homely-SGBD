import { Star, StarHalf } from 'lucide-react'

interface RatingStarsProps {
    score: number
}

export function RatingStars({ score }: RatingStarsProps) {
    // Convert 0-10 score to 0-5 stars
    const starScore = (score / 2)

    const fullStars = Math.floor(starScore)
    const hasHalfStar = starScore % 1 >= 0.5

    return (
        <div className="flex items-center" aria-label={`Rating: ${score} out of 10`}>
            {[...Array(5)].map((_, index) => {
                if (index < fullStars) {
                    return <Star key={index} className="w-5 h-5 text-yellow-400 fill-current" />
                } else if (index === fullStars && hasHalfStar) {
                    return <StarHalf key={index} className="w-5 h-5 text-yellow-400 fill-current" />
                } else {
                    return <Star key={index} className="w-5 h-5 text-gray-300" />
                }
            })}
            <span className="ml-2 text-sm font-medium">{score.toFixed(1)}/10</span>
        </div>
    )
}
