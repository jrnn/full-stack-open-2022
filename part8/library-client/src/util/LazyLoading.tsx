import { ComponentType, FC, Suspense } from "react"

type AnyProps = Record<string, unknown>

export const lazyLoading = <Props extends AnyProps = AnyProps>(
  WrappedComponent: ComponentType<Props>
) => {
  const LazyLoadingComponent: FC<Props> = (props) => {
    return (
      <Suspense fallback={<div>... LAZÜ LEWDING ...</div>}>
        <WrappedComponent { ...props } />
      </Suspense>
    )
  }
  LazyLoadingComponent.displayName = `lazyLoading(${WrappedComponent.displayName})`
  return LazyLoadingComponent
}
