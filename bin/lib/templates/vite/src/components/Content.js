export default class Content {
  name = 'app-content'

  static get observedAttributes() {
    return ['title']
  }

  render() {
    return (
      <div class="content">
        <h2>{this.title}</h2>
        <slot></slot>
      </div>
    )
  }
}
