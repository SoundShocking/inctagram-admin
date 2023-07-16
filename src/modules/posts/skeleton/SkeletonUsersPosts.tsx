import { Skeleton } from '@/ui/skeletons/Skeleton'

export const SkeletonUsersPosts = () => {
  const className = 'w-[234px] h-[391px] object-contain'

  return (
    <div className="aspect-square">
      <Skeleton classes={className} />
    </div>
  )
}
