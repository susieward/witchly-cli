
const About = () => {
  const name = 'about-view'
  const render = () => {
    return (
      <app-content title="About">
        <p>
          Enim sit amet venenatis urna cursus eget nunc scelerisque.
          Sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum.
          Vitae ultricies leo integer malesuada nunc vel. Et odio pellentesque
          diam volutpat commodo sed. Risus feugiat in ante metus dictum at.
          Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras.
          Sit amet risus nullam eget felis eget nunc lobortis mattis.
        </p>
      </app-content>
    )
  }
  return { name, render }
}

export default About
