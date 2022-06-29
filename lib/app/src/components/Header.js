
export default class Header {
  el = 'app-header'

  static get observedAttributes() {
    return ['links']
  }

  get template() {
    return (
      <header id="header">
        <ul>
          {this.links.map(link => {
            return (
              <li onclick={() => this.$go(link.path)}>
                {link.text}
              </li>
            )
          })}
        </ul>
      </header>
    )
  }
}
