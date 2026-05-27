export interface ClassNameProps {
  className?: string
}

export type PolymorphicProps<T extends React.ElementType> = {
  as?: T
  className?: string
} & React.ComponentPropsWithoutRef<T>

export interface IconProps extends ClassNameProps {
  size?: number | string
  color?: string
  strokeWidth?: number
}
