
export default function Header(props) {
  return (
      <header id="header">
        <ul>
          {props.links.map(link => {
            return (
              <li onclick={() => props.vm.$go(link.path)}>
                {link.text}
              </li>
            )
          })
        }
        </ul>
      </header>
    )
}
