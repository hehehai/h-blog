import Link from 'next/link'

export default function CustomLink({ as, href, ...otherProps }: any) {
  return (
    <>
      <Link as={as} href={href}>
        <a {...otherProps} />
      </Link>
    </>
  )
}
