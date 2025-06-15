interface Props {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string
}

const StylizedHeading = ({
  text,
  as: Component = 'h1',
  className = '',
}: Props) => {
  const [firstWord, ...restWords] = text.split(' ')
  const restText = restWords.join(' ')

  return (
    <Component className={`headline ${className}`} aria-label={text}>
      <span className="cursive" aria-hidden="true">
        {firstWord}
      </span>
      <span className="block" aria-hidden="true">
        {restText.split('').map((char, index) => (
          <span key={index} data-heading={char} aria-hidden="true">
            {char}
          </span>
        ))}
      </span>
    </Component>
  )
}

export default StylizedHeading
