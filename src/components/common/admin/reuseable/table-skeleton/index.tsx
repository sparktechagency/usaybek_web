import { Skeleton, TableCell, TableRow } from "@/components/ui";
import { cn } from "@/lib";

interface SkeletonProps {
  colSpan: number;
  length?: number;
  className?: string;
}

export function TableSkeleton({
  colSpan,
  length = 10,
  className,
}: SkeletonProps) {
  return (
    <TableRow>
      <TableCell className="p-2" colSpan={colSpan}>
        <div className="space-y-3">
          {[...Array(length)].map((_, index) => (
            <Skeleton
              key={index}
              className={cn(
                "h-[50px] w-full rounded-sm bg-blacks/20",
                className
              )}
            />
          ))}
        </div>
      </TableCell>
    </TableRow>
  );
}
