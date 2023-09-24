
export default class Header {
  name = 'app-header'
  links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' }
  ]

  static get observedAttributes() {
    return ['message']
  }

  render() {
    return (
      <header id="header">
      <h1>{this.message}</h1>
        <div class="links">
          {this.links.map(link => {
            return (
              <div class="link" onclick={() => this.$go(link.path)}>
                {link.name}
              </div>
            )
          })}
        </div>
      </header>
    )
  }

  get styles() {
    return (`
      #header {
        display: grid;
        align-content: center;
        justify-content: center;
        margin-top: 20px;
        padding: 20px 28px;
      }

      .links {
        display: grid;
        grid-auto-flow: column;
        justify-content: center;
        grid-auto-columns: auto;
        grid-column-gap: 30px;
      }

      .link {
        color: #8899aa;
        cursor: pointer;
      }
    `)
  }
}
