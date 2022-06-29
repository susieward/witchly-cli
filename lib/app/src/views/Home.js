
const Home = () => {
  const el = 'app-home'
  const template = () => {
    return (
      <div class="home">
        <h1>Welcome to your new Witchly.js app!</h1>
      </div>
    )
  }
  return { el, template }
}

export default Home
