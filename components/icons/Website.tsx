export default function WebsiteIcon(props: { size: number }) {
  const { size } = props;
  return (
    <svg
      width={size}
      height={size}
      className="inline-block"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.6875 9L8.403 2.28375C8.733 1.9545 9.267 1.9545 9.59625 2.28375L16.3125 9M3.375 7.3125V14.9062C3.375 15.372 3.753 15.75 4.21875 15.75H7.3125V12.0937C7.3125 11.628 7.6905 11.25 8.15625 11.25H9.84375C10.3095 11.25 10.6875 11.628 10.6875 12.0937V15.75H13.7812C14.247 15.75 14.625 15.372 14.625 14.9062V7.3125M6.1875 15.75H12.375"
        stroke="CurrentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
