type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={`rounded-md bg-[var(--skeleton-bg)] animate-pulse ${className}`}
    />
  );
}
